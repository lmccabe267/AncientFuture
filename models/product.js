const { default: mongoose } = require('mongoose');
const shirtSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
		enum: ['shortSleeve', 'longSleeve', 'crop', 'tank', 'other'],
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

const Shirt = mongoose.model('Shirt', shirtSchema);
module.exports = Shirt;
