import axios from "axios";

const productAPI = axios.create({
  baseURL: "http://localhost:3000",
});

export const getProducts = async () => {
  const res = await productAPI.get("/products");
  return res.data;
};

export const createProducts = async (product) => {
  productAPI.post("/products", product);
};

export const deleteProduct = async (id) => {
  productAPI.delete(`/products/${id}`);
};
