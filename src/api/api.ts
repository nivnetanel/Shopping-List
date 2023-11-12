import axios from 'axios';

import { ICategory, IProduct } from '../types/types';

let schema = 'https://';
if (process.env.NODE_ENV !== 'production') {
  schema = 'http://';
}
const BASE_URL = schema + process.env.REACT_APP_API_URL + '/api';

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

export const addproduct = async (product: Partial<IProduct>): Promise<IProduct> => {
  console.log('DATA', product);
  const response = await axios.post(`${BASE_URL}/products`, product);
  return response.data;
};

export const deleteProduct = async (productId: IProduct['_id']): Promise<void> => {
  await axios.delete(`${BASE_URL}/products/${productId}`);
};
