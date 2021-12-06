/** @format */

import axios from 'axios';

// Get all subcategory list
export const getSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subcategories`);

// Get a single subcategory
export const getSubCategory = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);

// Remove a subcategory
export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
    headers: {
      authtoken,
    },
  });

// Update a subcategory
export const updateSubCategory = async (slug, subCategory, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/subcategory/${slug}`,
    subCategory,
    {
      headers: {
        authtoken,
      },
    }
  );

// Create a subcategory

export const createSubCategory = async (
  subCategory, // subCategory => { name, parent }
  authtoken
) =>
  await axios.post(`${process.env.REACT_APP_API}/subcategory`, subCategory, {
    headers: {
      authtoken,
    },
  });
