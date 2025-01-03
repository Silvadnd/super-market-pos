const { poolPromise } = require('../db/dbConfig');
const queries = require('../queries/supplierQueries');

async function getAllSuppliers() {
  const pool = await poolPromise;

  try {
    const result = await pool.request().query(queries.getAllSuppliers);
    return result.recordset; // Return all supplier details
  } catch (err) {
    throw new Error('Error fetching suppliers: ' + err.message);
  }
}

module.exports = { getAllSuppliers };
