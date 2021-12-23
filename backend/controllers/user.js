/** @format */

const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

// ************************* CART *************************

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

    let productFromDb = await Product.findById(cart[i]._id)
      .select('price')
      .exec();
    object.price = productFromDb.price;

    products.push(object);
  }
  console.log('CART - Products', products);

  // Cart Total - without Tax
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total = total + products[i].price * products[i].count;
  }

  const cartTotalFixed = total.toFixed(2);
  const cartTotal = Number(total);
  console.log('CART - totalFixed', cartTotalFixed);
  console.log('CART - cartTotal', cartTotal);

  // Cart Total - WITH Tax
  let taxRate = 0.05;
  const tax = cartTotal * taxRate;
  const withTax = (cartTotal * taxRate + cartTotal).toFixed(2);
  const totalWithTax = Number(withTax);

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

exports.saveAddress = async (req, res) => {
  console.log('address', req.body.address);

  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

// ************************* ORDER *************************

exports.createOrder = async (req, res) => {
  // console.log(req.body);
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  //  Decrement quantity, Increment sold
  let bulkOption = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log('PRODUCT QUANTITY-- AND SOLD++', updated);

  console.log('NEW ORDER SAVED', newOrder);
  res.json({ ok: true });
};
