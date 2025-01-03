import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { AddProductForm } from "./AddProductForm";
import axios from "axios";

export const ProductTable = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes, suppliersRes] = await Promise.all([
          // Update the API endpoint to include ordering
          axios.get(
            "http://localhost:3000/api/products/get?orderBy=createdAt&order=desc"
          ),
          axios.get("http://localhost:3000/api/category/get"),
          axios.get("http://localhost:3000/api/supplier/get"),
        ]);

        // No need for client-side sorting since data is already sorted by the API
        setProducts(productsRes.data.data);
        setCategories(categoriesRes.data.data);
        setSuppliers(suppliersRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProductAdded = async () => {
    try {
      setLoading(true);
      const productsRes = await axios.get(
        "http://localhost:3000/api/products/get?orderBy=createdAt&order=desc"
      );
      // No need for client-side sorting
      setProducts(productsRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
    setShowAddForm(false);
  };

  // Rest of the component remains the same
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-xl">
            <AddProductForm
              onClose={() => setShowAddForm(false)}
              onProductAdded={handleProductAdded}
            />
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Low Stock Alert
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {products.map((product) => {
                  const category = categories.find(
                    (c) => c.categoryID === product.categoryID
                  );

                  return (
                    <tr key={product.productID}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.pName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ${product.unitPrice.toFixed(2)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.inStockCount}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {category?.categoryName || "Unknown"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.lowStockCount}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                            <Pencil className="w-4 h-4 inline" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 focus:outline-none">
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
