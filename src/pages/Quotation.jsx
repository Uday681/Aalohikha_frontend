import { useState } from "react";
import ProductList from "../components/ProductList"
import QuotationForm from "../components/QuotationForm"
import QuotationList from "../components/QuotationList"

const Quotation = () => {
          const [selectedProducts, setSelectedProducts] = useState([]);
const handleSelectProduct = (product) => {
  setSelectedProducts((prev) => [...prev, product]);
}
  return (
    <div className="container mx-auto p-4 b-4">
  <h1 className="text-2xl font-bold text-center">Quotation System</h1>
  <ProductList onSelectProduct={handleSelectProduct} />
  <QuotationForm customerId="6791c30db256a5be1b274f57" selectedProducts={selectedProducts} />
  <QuotationList customerId="6791c30db256a5be1b274f57" />
</div>
  )
}

export default Quotation;
