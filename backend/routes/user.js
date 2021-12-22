/** @format */

const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck } = require('../middlewares/auth');

// Controller
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
} = require('../controllers/user');

// Routes
router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);

module.exports = router;
