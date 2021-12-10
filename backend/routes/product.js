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
} = require('../controllers/product');

// routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
// router.delete('/product/:slug', authCheck, adminCheck, remove);
router.delete('/product/:slug', remove);
router.get('/product/:slug', getOneProduct);

module.exports = router;
