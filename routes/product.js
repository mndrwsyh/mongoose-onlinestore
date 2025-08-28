const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const page = req.query.page;
    const products = await getProducts(category, page);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// GET products/:id - get a specific id
router.get("/:id", async (req, res) => {
  try {
    // retrieve id from params
    const id = req.params.id;
    const product = await getProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;

    // make sure all fields are not empty
    if (!name || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      // short hand
      .send(await addProduct(name, description, price, category, image));
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// PUT /products/(insertidhere) - update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;

    // make sure all fields are not empty
    if (!name || !price || !category) {
      return res.status(400).send({
        message: "All the fields are required",
      });
    }

    res
      .status(200)
      .send(await updateProduct(id, name, description, price, category, image));
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
    console.log(error);
  }
});

// DELETE /products/(insertidhere) - delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await deleteProduct(id);

    res.status(200).send({
      message: `Product with the id of ${id} has been deleted.`,
    });
  } catch (error) {
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

module.exports = router;
