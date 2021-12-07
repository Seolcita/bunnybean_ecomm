/** @format */

const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// Controller
const {
  create,
  read,
  update,
  remove,
  list,
  getSubsBelongToParent,
} = require('../controllers/category');

// Routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);
router.get('/category/subs/:_id', getSubsBelongToParent);

module.exports = router;
