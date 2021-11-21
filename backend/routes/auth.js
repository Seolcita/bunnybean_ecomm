/** @format */

const express = require('express');
const router = express.Router();

// Middlewares
const { authCheck } = require('../middlewares/auth');

// Controller
const { createOrUpdateUser } = require('../controllers/auth');

// Routes
router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;