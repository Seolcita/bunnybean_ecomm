/** @format */

const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log('Removed old cart');
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    let { price } = await Product.findById(cart[i]._id).select('price').exec();
    object.price = price;

    products.push(object);
  }
  console.log('CART - Products', products);

  // Cart Total - without Tax
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  console.log('CART - cartTotal', cartTotal);

  // Cart Total - WITH Tax
  let taxRate = 0.05;
  const tax = (cartTotal * taxRate).toFixed(2);
  const totalWithTax = (cartTotal * taxRate + cartTotal).toFixed(2);

  // Create a Cart
  let newCart = await new Cart({
    products,
    cartTotal,
    tax,
    totalWithTax,
    orderedBy: user._id,
  }).save();

  console.log('NEW CART', newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product')
    .exec();

  const { products, cartTotal, tax, totalWithTax } = cart;
  res.json({ products, cartTotal, tax, totalWithTax });
};

exports.emptyCart = async (req, res) => {
  console.log('empty cart');
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  res.json(cart);
};
