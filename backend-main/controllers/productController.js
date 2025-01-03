const { getAllProducts } = require("../queries/productQueries");
const { addProduct } = require("../services/productService");
const { sql, poolPromise } = require("../db/dbConfig");

async function addProductController(req, res) {
  try {
    const data = req.body;
    const result = await addProduct(data);
    res.status(201).json({
      message: "Product added successfully",
      productID: result.productID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getProduct = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(getAllProducts);
    return result.recordset;
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

const getProductController = async (req, res) => {
  try {
    const result = await getProduct();
    res.status(200).send({
      message: "Products fetched successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error while fetching product:", error);
    res.status(500).send({
      message: "Error while fetching product",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { addProductController, getProductController };
