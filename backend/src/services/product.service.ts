import { getProducts } from "../repositories/fake-api-product.repository";

export const getAllProducts = async () => {
  try {
    const products = await getProducts();
    return products;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

// Get product by ID
export const getProductById = async (id: number) => {
  throw new Error("Not implemented");
};

// Create new product
export const createProduct = async (product: any) => {
  throw new Error("Not implemented"); 
};

// Update existing product
export const updateProduct = async (id: number, product: any) => {
  throw new Error("Not implemented");
};

// Delete product
export const deleteProduct = async (id: number) => {
  throw new Error("Not implemented");
};
