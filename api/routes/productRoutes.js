const { verifyToken } = require('../middleware/verify');
const express = require('express');
const router = express.Router();
const products = require('../controllers/productController');

// Product route to get all products
router.get('/get', async (req, res) => {

  // Call controller method for products data fetch
  let data = await products.getProducts();
  return res.status(200).json(data);
});

module.exports = router;