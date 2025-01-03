const express = require("express");
const cors = require("cors"); // Add this line
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

const app = express();
const PORT = 3000;

// CORS middleware - add this before other middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Other middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/supplier", supplierRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
