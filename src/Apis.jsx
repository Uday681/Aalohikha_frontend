import axios from "axios";

const API_URL = "http://localhost:8000";

export const getProducts = async (query) => {
  const response = await axios.get(`${API_URL}/product/search?query=${query}`);
  return response.data;
};

export const createQuotation = async (quotation) => {
  const response = await axios.post(`${API_URL}/quotations`, quotation);
  return response.data;
};

export const getQuotations = async (customerId) => {
  const response = await axios.get(`${API_URL}/quotations/${customerId}/quotations`);
  return response.data;
};

export const deleteQuotation = async (id) => {
  await axios.delete(`${API_URL}/quotations/${id}`);
};

