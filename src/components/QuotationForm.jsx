import PropTypes from 'prop-types';
import { useState } from "react";
import { createQuotation } from "../Apis";

const QuotationForm = ({ customerId, selectedProducts }) => {
  // const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (productId, value) => {
    setQuantity({ ...quantity, [productId]: value });
  };

  const handleSubmit = async () => {
    const quotation = {
      customerId,
      products: selectedProducts.map((p) => ({
        productId: p._id,
        quantity: quantity[p._id] || 1,
      })),
  
    };
    await createQuotation(quotation);
    alert("Quotation created!");
    console.log(quantity)
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Selected Products</h2>
      <ul>
        {selectedProducts.map((product) => (
          <li key={product._id} className="flex justify-between p-2 border">
            {product.name} - ${product.price}
            <input
              type="number"
              value={quantity[product._id] || 1}
              onChange={(e) => handleQuantityChange(product._id, e.target.value)}
              className="border p-1 w-16"
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
        Create Quotation
      </button>
    </div>
  );
};

// Add prop type validation
QuotationForm.propTypes = {
  customerId: PropTypes.string.isRequired,
  selectedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default QuotationForm;
