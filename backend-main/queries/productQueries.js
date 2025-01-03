const queries = {
  addProduct: `
    INSERT INTO Product (pName, unitPrice, inStockCount, lowStockCount, categoryID)
    OUTPUT INSERTED.productID
    VALUES (@pName, @unitPrice, @inStockCount, @lowStockCount, @categoryID);
  `,
  addStock: `
    INSERT INTO Stock (quantityChanged, transactionDate, productID)
    VALUES (@quantityChanged, GETDATE(), @productID);
  `,
  addSupplies: `
    INSERT INTO Supplies (supplierID, productID, date)
    VALUES (@supplierID, @productID, GETDATE());
  `,
  getAllProducts: `
    SELECT productID, pName, unitPrice, inStockCount, lowStockCount, categoryID
    FROM Product;
  `,
};

module.exports = queries;
