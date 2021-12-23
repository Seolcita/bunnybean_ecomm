/** @format */

const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // 1. Find user
  const user = await User.findOne({ email: req.user.email }).exec();

  // 2. Get user cart total(with tax)
  const { totalWithTax } = await Cart.findOne({ orderedBy: user._id }).exec();
  const finalTotalFixed = totalWithTax.toFixed(2);
  const finalTotal = Number(finalTotalFixed);

  console.log('CART TOTAL WITH TAX', totalWithTax);
  console.log('finalTotal', finalTotal);

  // 3. Create Payment Intent with amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalTotal * 100,
    currency: 'cad',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
