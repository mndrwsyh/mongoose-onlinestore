// import product model
const Product = require("../models/product");

async function getProducts(category, page = 1, itemsPerPage = 6) {
  // create an empty container for filter
  let filter = {};
  if (category) {
    filter.category = category;
  }

  // load the product data from Mongodb
  const products = await Product.find(filter)
    .limit(itemsPerPage) // limit the number items
    //.skip(page * itemsPerPage - itemsPerPage)
    .skip((page - 1) * itemsPerPage)
    .sort({ _id: -1 });
  return products;
}

async function getProduct(id) {
  // load the product data based on id
  const product = await Product.findById(id);
  return product;
}

async function addProduct(name, description, price, category) {
  // create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });

  // save the new product into mongodb
  await newProduct.save();

  return newProduct;
}

async function updateProduct(id, name, description, price, category) {
  return await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      category,
    },
    {
      new: true, // return the updated data
    }
  );
}

async function deleteProduct(id) {
  // delete the product
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
