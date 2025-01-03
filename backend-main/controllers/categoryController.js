const categoryService = require('../services/categoryService');

async function getCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = { getCategories };
