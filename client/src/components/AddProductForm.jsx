import { X } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const INITIAL_FORM_STATE = {
    pName: "",
    unitPrice: "",
    inStockCount: "",
    lowStockCount: "",
    categoryID: "",
    supplierID: "",
};


const INPUT_FIELDS = [
    {
        id: "pName",
        label: "Product Name",
        type: "text",
        validate: (value) =>
            !value.trim()
                ? "Product name is required"
                : value.length > 100
                    ? "Product name cannot exceed 100 characters"
                    : "",
    },
    {
        id: "unitPrice",
        label: "Unit Price",
        type: "number",
        min: "0",
        step: "0.01",
        validate: (value) => {
            const price = parseFloat(value);
            return !value
                ? "Unit price is required"
                : isNaN(price) || price < 0
                    ? "Please enter a valid positive price"
                    : price > 999999.99
                        ? "Price is too high"
                        : "";
        },
    },
    {
        id: "inStockCount",
        label: "Current Stock Count",
        type: "number",
        min: "0",
        validate: (value) => {
            const count = parseInt(value);
            return !value
                ? "Stock count is required"
                : isNaN(count) || count < 0
                    ? "Please enter a valid positive number"
                    : count > 2147483647
                        ? "Stock count is too high"
                        : "";
        },
    },
    {
        id: "lowStockCount",
        label: "Low Stock Alert Threshold",
        type: "number",
        min: "0",
        validate: (value, formData) => {
            const count = parseInt(value);
            return !value
                ? "Low stock threshold is required"
                : isNaN(count) || count < 0
                    ? "Please enter a valid positive number"
                    : count > parseInt(formData.inStockCount)
                        ? "Low stock alert cannot be higher than current stock"
                        : "";
        },
    },
];

export const AddProductForm = ({ onClose, onProductAdded }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [suppliersRes, categoriesRes] = await Promise.all([
                    axios.get("http://localhost:3000/api/supplier/get"),
                    axios.get("http://localhost:3000/api/category/get"),
                ]);

                setSuppliers(suppliersRes.data.data);
                setCategories(categoriesRes.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load data");
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (INPUT_FIELDS.find((f) => f.id === name)) {
            const field = INPUT_FIELDS.find((f) => f.id === name);
            const error = field.validate(value, formData);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validate regular fields
        INPUT_FIELDS.forEach((field) => {
            const error = field.validate(formData[field.id], formData);
            if (error) {
                newErrors[field.id] = error;
                isValid = false;
            }
        });

        // Validate dropdowns
        if (!formData.supplierID) {
            newErrors.supplierID = "Please select a supplier";
            isValid = false;
        }
        if (!formData.categoryID) {
            newErrors.categoryID = "Please select a category";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the form errors before submitting");
            return;
        }

        setIsSubmitting(true);
        toast.loading("Adding product...", { id: "addProduct" });

        try {
            const processedData = {
                ...formData,
                unitPrice: parseFloat(formData.unitPrice),
                inStockCount: parseInt(formData.inStockCount),
                lowStockCount: parseInt(formData.lowStockCount),
            };

            await axios.post(
                "http://localhost:3000/api/products/add",
                processedData
            );

            toast.success("Successfully added the product!", {
                id: "addProduct",
                duration: 3000,
            });

            onProductAdded();
            setFormData(INITIAL_FORM_STATE);
            onClose();
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Failed to add product";
            toast.error(errorMessage, {
                id: "addProduct",
                duration: 3000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Add New Product</h3>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    disabled={isSubmitting}
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Regular input fields */}
                    {INPUT_FIELDS.map((field) => (
                        <div key={field.id}>
                            <label
                                htmlFor={field.id}
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                {field.label}
                            </label>
                            <input
                                id={field.id}
                                name={field.id}
                                type={field.type}
                                value={formData[field.id]}
                                onChange={handleChange}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                disabled={isSubmitting}
                                className={`mt-1 block w-full rounded-md p-3 border ${errors[field.id] ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}  focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                            />
                            {errors[field.id] && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors[field.id]}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Supplier Dropdown */}
                    <div>
                        <label
                            htmlFor="supplierID"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Supplier
                        </label>
                        <select
                            id="supplierID"
                            name="supplierID"
                            value={formData.supplierID}
                            onChange={handleChange}
                            disabled={isSubmitting}
                           className={`mt-1 block w-full rounded-md p-3 border ${errors.supplierID ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}  focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map((supplier) => (
                                <option
                                    key={supplier.supplierID}
                                    value={supplier.supplierID}
                                >
                                    {supplier.fName}
                                </option>
                            ))}
                        </select>
                        {errors.supplierID && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.supplierID}
                            </p>
                        )}
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label
                            htmlFor="categoryID"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Category
                        </label>
                        <select
                            id="categoryID"
                            name="categoryID"
                            value={formData.categoryID}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`mt-1 block w-full rounded-md p-3 border ${errors.categoryID ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}  focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option
                                    key={category.categoryID}
                                    value={category.categoryID}
                                >
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        {errors.categoryID && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.categoryID}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                       className="px-5 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <span>Adding...</span>
                            </div>
                        ) : (
                            "Add Product"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;