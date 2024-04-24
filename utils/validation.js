const Joi = require("joi");

// Common validation rules for product fields
const productValidationRules = {
  id: Joi.number().integer().min(1).required(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().integer().min(0).required(),
  description: Joi.string().required(),
  ratings: Joi.number().min(0).max(5).required(),
  reviews: Joi.number().integer().min(0).required(),
};

// Validation schema for request body
const bodySchema = Joi.object({
  ...productValidationRules,
});

// Validation schema for request parameters
const paramsSchema = Joi.object({
  productId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

// Validation schema for query parameters
const querySchema = Joi.object({
  // Define validation rules for query parameters
});

module.exports = {
  bodySchema,
  paramsSchema,
  querySchema,
};
