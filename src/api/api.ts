import axios from 'axios';

import { ICategory, IProduct } from '../types/types';

const BASE_URL = 'http://localhost:5000/api';

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchCategories = async (): Promise<ICategory[]> => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const addproduct = async (product: IProduct): Promise<IProduct> => {
  const response = await axios.post(`${BASE_URL}/products`, product);
  return response.data;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/products/${productId}`);
};
