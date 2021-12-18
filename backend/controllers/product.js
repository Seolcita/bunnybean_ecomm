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
  //console.log('BACKEND - UPDATE : ', slug);
  const oneProduct = await Product.findOne({ slug })
    .populate('category')
    .populate('subs')
    .exec();
  //console.log('BACKEND - UPDATE : ', oneProduct);
  return res.json(oneProduct);
};

exports.update = async (req, res) => {
  const slug = req.params.slug;
  console.log('Backend - Update Product - req.body', req.body);

  try {
    // When product name(title) changes, change the slug
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await Product.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });

    console.log('BACKEND - UPDATED PRODUCT INFO >>>', updated);

    res.json(updated);
  } catch (err) {
    console.log('Product Update Failed', err);
  }
};

//WITHOUT PAGENATION
exports.listBySortOrderLimit = async (req, res) => {
  // sort: createdAt/updatedAt
  // order: desc/asc
  // limit: ex) 3
  try {
    const { sort, order, limit } = req.body;
    const products = await Product.find({})
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

// WITH PAGENATION
// exports.listBySortOrderLimit = async (req, res) => {
//   console.table(req.body);
//   sort: createdAt/updatedAt
//   order: desc/asc
//   limit: ex) 3
//   try {
//     const { sort, order, page } = req.body;
//     const currentPage = page || 1;
//     const perPage = 3;

//     const products = await Product.find({})
//       .skip((currentPage - 1) * perPage)
//       .populate('category')
//       .populate('subs')
//       .sort([[sort, order]])
//       .limit(perPage)
//       .exec();

//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

// ------------------------------- Search & Filter --------------------------------

// *** Start - HELPER FUNCTIONS  ***
// Search By >> Keyword
const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .exec();

  res.json(products);
};

// Search By >> Price
const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

// Search By >> Category
const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

// *** End - HELPER FUNCTIONS ***

exports.searchFilters = async (req, res) => {
  const { query, price, category } = req.body;

  // Keyword
  if (query) {
    console.log('QUERY =====> ', query);
    await handleQuery(req, res, query);
  }

  // Price
  // price [20, 200] << Price range $20 ~ $200 >> [20, 200]
  if (price !== undefined) {
    console.log('PRICE =====> ', price);
    await handlePrice(req, res, price);
  }

  // Category
  if (category) {
    console.log('Category =====> ', category);
    await handleCategory(req, res, category);
  }
};
