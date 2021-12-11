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

// Get products by sort, order and limit
// The reason why I use 'post' not 'get' is using 'post' is easy to add header in req.body
export const getProductsBySortOrderLimit = async (sort, order, limit) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    limit,
  });

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

export const updateProduct = async (slug, product, authtoken) =>
  //console.log('CONNECTION - UPDATE Product!!!!', slug, product, authtoken);
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });
