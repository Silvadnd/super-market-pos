const { poolPromise } = require('../db/dbConfig');
const queries = require('../queries/categoryQueries');

async function getAllCategories() {
  const pool = await poolPromise;

  try {
    const result = await pool.request().query(queries.getAllCategories);
    return result.recordset; // Return all category details
  } catch (err) {
    throw new Error('Error fetching categories: ' + err.message);
  }
}

module.exports = { getAllCategories };
