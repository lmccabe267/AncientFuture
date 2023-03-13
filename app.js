const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;

const admin = require('./routes/admin');
const products = require('./routes/products');

const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/images')));
app.use(express.static(path.join(__dirname, '/styles')));

app.use('/admin', admin);
app.use('/products', products);

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

app.get('/', (req, res) => {
	res.redirect('/home');
});

app.get('/home', (req, res) => {
	res.render('home');
});

app.get('/contact', (req, res) => {
	res.render('contact');
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
