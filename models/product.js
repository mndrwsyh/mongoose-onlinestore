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
    required: true,
  },
  // linkage between the products n category (similar to sql foreign key)
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: String,
});

// create a Modal from the schema
const Product = model("Product", productSchema);

// setup root route
module.exports = Product;
