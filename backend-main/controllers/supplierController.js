const supplierService = require('../services/supplierService');

async function getSuppliers(req, res) {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.status(200).json({
      success: true,
      data: suppliers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = { getSuppliers };
