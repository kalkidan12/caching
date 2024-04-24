const express = require("express");
const router = express.Router();
const { productcontrollers } = require("../controllers/productcontroller");

// Route to create a new product
router.post("/products", productcontrollers.createProduct);

// Route to get all products
router.get("/products", productcontrollers.getProducts);

// Route to get a product by ID
router.get("/products/:productId", productcontrollers.getProductById);

// Route to update a product by ID
router.put("/products/:productId", productcontrollers.updateProduct);

// Route to delete a product by ID
router.delete("/products/:productId", productcontrollers.deleteProductById);

module.exports = router;
