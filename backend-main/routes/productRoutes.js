const express = require("express");
const {
  addProductController,
  getProductController,
} = require("../controllers/productController");

const router = express.Router();

router.post("/add", addProductController);
router.get("/get", getProductController);

module.exports = router;
