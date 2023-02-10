const express = require('express')
const { registerProduct, searchProducts, allProducts, singleProductDetails } = require("../controllers/productController");
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const Product = require("../models/productModel");

router.route('/').post(protect, registerProduct);
router.route('/').get(searchProducts);
router.route('/fetchAll').get(allProducts);
router.route('/singleproduct/:productId').get(singleProductDetails);

module.exports = router;