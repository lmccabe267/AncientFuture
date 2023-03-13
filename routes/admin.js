const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/admin/overview');
});

router.get('/overview', (req, res) => {
	res.render('admin');
});

router.get('/products', (req, res) => {
	res.render('adminProducts');
});

router.get('/finances', (req, res) => {
	res.send('finances');
});

router.get('/customers', (req, res) => {
	res.send('customers');
});

module.exports = router;
