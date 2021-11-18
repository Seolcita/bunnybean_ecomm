/** @format */

const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
  res.json({ data: 'It is from backend - USER' });
});

module.exports = router;
