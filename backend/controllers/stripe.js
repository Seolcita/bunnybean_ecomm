/** @format */

const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  //
  //

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'cad',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
