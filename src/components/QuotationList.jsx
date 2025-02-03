import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getQuotations, deleteQuotation } from "../Apis";
import jsPDF from "jspdf";

const QuotationList = ({ customerId }) => {
  const [quotations, setQuotations] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  useEffect(() => {
    async function fetchQuotations() {
      const data = await getQuotations(customerId);
      console.log(`quotation data : ${data}`);
      setQuotations(data);
    }
    fetchQuotations();
  }, [customerId]);

  const handleDelete = async (id) => {
    await deleteQuotation(id);
    setQuotations(quotations.filter((q) => q._id !== id));
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedQuotation(null);
  };

  const handleUpdateQuotation = () => {
    console.log("Updating quotation:", selectedQuotation);
    closePopup();
  };

  const handleGenerateDocument = (quotation) => {
    const doc = new jsPDF();
    doc.text(`Quotation ID: ${quotation._id}`, 10, 10);
    doc.text(`Total Price: $${quotation.totalPrice}`, 10, 20);
    doc.save(`Quotation_${quotation._id}.pdf`);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Quotations</h2>
      {quotations.map((quotation) => (
        <div key={quotation._id} className="flex justify-between p-2">
          <p>Total: ${quotation.totalPrice}</p>
          <div className="">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => handleGenerateDocument(quotation)}
            >
              Generate
            </button>
            <button
              onClick={() => handleDelete(quotation._id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            {" "}
            {/* Adjust width for a smaller box */}
            <h3 className="text-lg font-bold">Update Quotation</h3>
            {selectedQuotation && (
              <div>
                <label>ID:</label>
                <p>{selectedQuotation._id}</p>
                <label>Total Price:</label>
                <input
                  type="number"
                  value={selectedQuotation.totalPrice}
                  onChange={(e) =>
                    setSelectedQuotation({
                      ...selectedQuotation,
                      totalPrice: e.target.value,
                    })
                  }
                  className="border p-1 rounded mb-2 w-full"
                />
                {/* Add more fields as necessary */}
              </div>
            )}
            <button
              onClick={handleUpdateQuotation}
              className="mt-4 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Update
            </button>
            <button
              onClick={closePopup}
              className="mt-4 bg-gray-300 px-2 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

QuotationList.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default QuotationList;
