const { sql, poolPromise } = require("../db/dbConfig");
const queries = require("../queries/productQueries");

async function addProduct(data) {
  const pool = await poolPromise;
  const transaction = new sql.Transaction(pool);

  try {
    // Begin transaction
    await transaction.begin();

    // Add product
    const productResult = await new sql.Request(transaction)
      .input("pName", sql.NVarChar, data.pName)
      .input("unitPrice", sql.Money, data.unitPrice)
      .input("inStockCount", sql.Int, data.inStockCount)
      .input("lowStockCount", sql.Int, data.lowStockCount)
      .input("categoryID", sql.UniqueIdentifier, data.categoryID)
      .query(queries.addProduct);

    const newProductID = productResult.recordset[0].productID;

    // Add stock if inStockCount > 0
    if (data.inStockCount > 0) {
      await new sql.Request(transaction)
        .input("quantityChanged", sql.Int, data.inStockCount)
        .input("productID", sql.UniqueIdentifier, newProductID)
        .query(queries.addStock);
    }

    // Add a row to the Supplies table
    await new sql.Request(transaction)
      .input("supplierID", sql.UniqueIdentifier, data.supplierID)
      .input("productID", sql.UniqueIdentifier, newProductID)
      .query(queries.addSupplies);

    // Commit transaction
    await transaction.commit();
    return { success: true, productID: newProductID };
  } catch (err) {
    // Rollback transaction on error
    if (transaction._aborted) {
      console.log("Transaction aborted");
    } else {
      try {
        await transaction.rollback();
      } catch (rollbackErr) {
        console.error("Rollback error:", rollbackErr);
      }
    }
    throw new Error(err.message);
  }
}

module.exports = { addProduct };
