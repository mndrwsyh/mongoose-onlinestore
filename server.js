// load the environment variable
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// setup an express app
const app = express();

// setup middleware to handle json request
app.use(express.json());

// setup cors policy
app.use(cors());

// connect to MongoDB using Mongoose

async function connectToMongoDB() {
  try {
    // wait for the mongodb to connect
    await mongoose.connect("mongodb://localhost:27017/onlinestore");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
}

// triggers the connect with MongoDB
connectToMongoDB();

// setup root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

const productRouter = require("./routes/product");
app.use("/products", productRouter);
app.use("/orders", require("./routes/order"));
app.use("/payment", require("./routes/payment"));

// start the express
app.listen(5123, () => {
  console.log("Server is running at http://localhost:5123");
});
