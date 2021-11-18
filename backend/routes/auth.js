/** @format */

const express = require('express');
const router = express.Router();

router.get('/create', (req, res) => {
  res.json({ data: 'It is from backend ' });
});

module.exports = router;
