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

// Delete a product
export const removeProduct = async (slug, authtoken) => {
  console.log('remove slug & token', slug, authtoken);
  await axios.delete(
    `${process.env.REACT_APP_API}/product/${slug}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getSingleProduct = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
