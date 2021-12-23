/** @format */

const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck } = require('../middlewares/auth');

// Controller - cart & order
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  createOrder,
} = require('../controllers/user');

// Routes - Cart
router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);

// Routes - Order
router.post('/user/order', authCheck, createOrder);

module.exports = router;
