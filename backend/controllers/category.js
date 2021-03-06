/** @format */

const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    //console.log('Create category failed', err);
    res.status(400).send('Create category failed');
  }
};

exports.list = async (req, res) => {
  const allCategories = await Category.find({}).sort({ createdAt: -1 }).exec(); //desc
  res.json(allCategories);
};

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  //res.json(category);

  const products = await Product.find({ category }).populate('category').exec();
  res.json({ category, products });
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log('UPDATE ERROR', err);
    res.status(400).send('Update failed');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log('Delete fail ', err);
    res.status(400).send('Delete failed');
  }
};

exports.getSubsBelongToParent = async (req, res) => {
  try {
    const parentId = req.params._id;
    const allSubCategories = await SubCategory.find({
      parent: parentId,
    }).exec();
    res.json(allSubCategories);
  } catch (err) {
    console.log('Get Sub-Categories >>>>', err);
    res.status(400).send('Getting Subs Failed');
  }
};
