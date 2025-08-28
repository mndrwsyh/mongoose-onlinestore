const express = require("express");
// set up category router
const router = express.Router();

/*
GET /categorys
GET /category/:id
POST /categorys
PUT /categorys/:id
DELETE /categorys/:id
*/

const {
  getCategories,
  getCategory,
  addNewCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

// get categorys
router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// get category
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await getCategory(id);
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// create category
router.post("/", async (req, res) => {
  try {
    const label = req.body.label;

    const newCategory = await addNewCategory(label);
    res.status(200).send(newCategory);
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// update category
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const label = req.body.label;
    const updatedCategory = await updateCategory(id, label);

    res.status(200).send(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

// delete category
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCategory(id);
    res.status(200).send({
      message: `Category #${id} has been deleted.`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Unknown error",
    });
  }
});

module.exports = router;
