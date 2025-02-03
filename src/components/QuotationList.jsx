import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { deleteQuotation, getQuotations } from "../Apis";
import jsPDF from "jspdf";

const QuotationList = ({ customerId }) => {
  const [quotations, setQuotations] = useState([]);
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [selectedQuotation, setSelectedQuotation] = useState(null);?
  // const [updatedQuotation, setUpdatedQuotation] = useState({});

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
    </div>
  );
};

QuotationList.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default QuotationList;