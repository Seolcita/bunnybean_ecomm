/** @format */

import axios from 'axios';

// Get all category list
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

// Get a single category
export const getCategory = async slug =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

// Remove a category
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

// Update a category
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

// Create a category
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
  });

// Get all sub-categories belong to parent category
export const getSubsBelongToParent = async parentId =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${parentId}`);
