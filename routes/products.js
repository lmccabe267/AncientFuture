const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const CatchAsync = require('../utils/CatchAsync');

router.get(
	'/',
	CatchAsync(async (req, res) => {
		const products = await Product.find();
		res.render('products/index', { products });
	}),
);

module.exports = router;
