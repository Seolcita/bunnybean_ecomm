/** @format */

const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    // check what we got from frontend
    //console.log('CREATE PRODUCT - req.body >>>> ', req.body);
    // Since we didn't send slug from frontend, we create it here and attache that to req.body
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    //console.log('CREATING PRODUCT ERROR >>>>>', err);
    res.status(400).json({ err: err.message });
  }
};

exports.listAll = async (req, res) => {
  const count = parseInt(req.params.count);

  let products = await Product.find({})
    .limit(count)
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  const slug = req.params.slug;
  //console.log('BACKEND - DELETE : ', slug);
  try {
    const deleted = await Product.findOneAndRemove({ slug }).exec();
    console.log('deleted Info', deleted);
    res.json(deleted);
  } catch (err) {
    console.log('Deleting a product error', err);
    return res.status(400).send('Product delete failed');
  }
};

exports.getOneProduct = async (req, res) => {
  const slug = req.params.slug;
  console.log('BACKEND - UPDATE : ', slug);
  const oneProduct = await Product.findOne({ slug })
    .populate('category')
    .populate('subs')
    .exec();
  console.log('BACKEND - UPDATE : ', oneProduct);
  return res.json(oneProduct);
};
