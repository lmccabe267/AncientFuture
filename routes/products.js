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

router.get(
	'/:id',
	CatchAsync(async (req, res) => {
		const product = await Product.findById(req.params.id);
		res.render('products/show', { product });
	}),
);

module.exports = router;
