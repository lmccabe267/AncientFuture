const { default: mongoose } = require('mongoose');
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		min: 0,
		required: true,
	},
	stock: {
		type: [{ size: { type: String, required: true }, quantity: { type: Number, required: true } }],
		required: true,
	},
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
