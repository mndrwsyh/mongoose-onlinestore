const { Schema, model } = require("mongoose");

// declare schema for products
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
});

// create a Modal from the schema
const Product = model("Product", productSchema);

// setup root route
module.exports = Product;
