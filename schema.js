const Joi = require('joi');

module.exports.shirtSchema = Joi.object({
	shirt: Joi.object({
		name: Joi.string().required(),
		price: Joi.number().min(0).required(),
		category: Joi.string().required(),
		stock: [
			{
				size: Joi.string().required(),
				quantity: Joi.string().min(0).required(),
			},
		],
	}).required(),
});
