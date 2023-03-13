const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const app = express();
const path = require('path');
const port = 3000;
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const CatchAsync = require('./utils/CatchAsync');

mongoose
	.connect('mongodb://localhost:27017/ancientFuture', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('mongo connection open');
	})
	.catch((err) => {
		console.log('error');
		console.log(err);
	});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/images')));
app.use(express.static(path.join(__dirname, '/styles')));

app.get('/admin', (req, res) => {
	res.redirect('/admin/overview');
});

app.get('/admin/overview', (req, res) => {
	res.render('admin');
});

app.get('/admin/products', (req, res) => {
	res.render('adminProducts');
});

app.get('/admin/finances', (req, res) => {
	res.send('finances');
});

app.get('/admin/customers', (req, res) => {
	res.send('customers');
});

app.get(
	'/products',
	CatchAsync(async (req, res) => {
		const products = await Product.find();
		res.render('products/index', { products });
	}),
);

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.get('/home', (req, res) => {
	res.render('home');
});

app.get('/', (req, res) => {
	res.redirect('/home');
});

app.get('*', (req, res, next) => {
	next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Oh No, Something Went Wrong!';
	res.status(statusCode).render('error', { err });
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
