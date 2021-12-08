/** @format */

const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { upload, remove } = require('../controllers/cloudinary');

// routes
router.post('/images', authCheck, adminCheck, upload);
router.post('/image', authCheck, adminCheck, remove);

module.exports = router;
