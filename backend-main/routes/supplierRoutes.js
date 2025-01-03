const express = require('express');
const supplierController = require('../controllers/supplierController');

const router = express.Router();

// Route to get all suppliers
router.get('/get', supplierController.getSuppliers);

module.exports = router;
