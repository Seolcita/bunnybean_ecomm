/** @format */

const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  create,
  listAll,
  remove,
  getOneProduct,
  update,
  listBySortOrderLimit,
  productsCount,
  searchFilters,
} = require('../controllers/product');

// routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', productsCount);
router.get('/products/:count', listAll);
// router.delete('/product/:slug', authCheck, adminCheck, remove);
router.delete('/product/:slug', remove);
router.get('/product/:slug', getOneProduct);
router.put('/product/:slug', authCheck, adminCheck, update);
router.post('/products', listBySortOrderLimit);

// Search
router.post('/search/filters', searchFilters);

module.exports = router;
