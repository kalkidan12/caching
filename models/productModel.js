const mongoose = require("mongoose");

// Define the schema for the product data
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
});

// Create the Mongoose model based on the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
