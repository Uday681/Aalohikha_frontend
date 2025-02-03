import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { getProducts } from "../Apis";

const ProductList = ({ onSelectProduct }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = async () => {
    if (query) {
      const data = await getProducts(query);
      console.log(`product list : ${data}`);
      setProducts(data);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  useEffect(() => {
    // Filter products based on the search query
    if (query) {
      setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);
  return(
    <div className="p-4">
      <input
        type="text"
        placeholder="Search products..." 
        className="w-full border p-2 rounded" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* // Display similar products */}
      {filteredProducts.length > 0 && (
        <ul className=" mt-2 border border-gray-300 rounded"> 
           {filteredProducts.map((product) => ( 
            <li key={product._id} className="p-2 border-b flex justify-between px-4">
              {product.name} - ${product.price}
              <button onClick={() => onSelectProduct(product)} className="bg-green-500 text-white px-2 py-1 rounded ml-2">
                Select
              </button>
            </li>
          ))}
        </ul>
      )} 
    </div>
  );
};

ProductList.propTypes = {
  onSelectProduct: PropTypes.func.isRequired,
};

export default ProductList;