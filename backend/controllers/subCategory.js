/** @format */

const SubCategory = require('../models/subCategory');
const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subCategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name),
    }).save();
    res.json(subCategory);
  } catch (err) {
    res.status(400).send('Create subcategory failed');
  }
};

// Get All Sub-Categories
exports.list = async (req, res) => {
  const allSubCategories = await SubCategory.find({})
    .sort({ createdAt: -1 })
    .exec(); //desc
  res.json(allSubCategories);
};

// Get Single Category
exports.read = async (req, res) => {
  let subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
  //res.json(subCategory);

  const products = await Product.find({ subs: subCategory })
    .populate('category')
    .exec();

  res.json({ subCategory, products });
};

exports.update = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log('SUB-CATEGORY UPDATE ERROR', err);
    res.status(400).send('Update Subcategory failed');
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log('Delete subcategory fail ', err);
    res.status(400).send('Delete subcategory failed');
  }
};
