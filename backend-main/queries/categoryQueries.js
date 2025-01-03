const queries = {
    getAllCategories: `
      SELECT categoryID, categoryName
      FROM Category;
    `,
  };
  
  module.exports = queries;
  