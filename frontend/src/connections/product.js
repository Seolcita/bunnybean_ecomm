/** @format */

import axios from 'axios';

// Create a category
export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });

// Get products by count
export const getProductsByCount = async count =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
