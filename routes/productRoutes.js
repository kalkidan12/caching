const express = require("express");
const router = express.Router();
const { productcontrollers } = require("../controllers/productcontroller");
const {
  storeResponseInCache,
  getResponsefromCache,
} = require("../redis/redisResponseCaching");

// Route to create a new product
router.post("/products", productcontrollers.createProduct);

// Route to get all products
router.get(
  "/products",
  getResponsefromCache,
  productcontrollers.getProducts,
  storeResponseInCache
);

// Route to get a product by ID
router.get(
  "/products/:productId",
  getResponsefromCache,
  productcontrollers.getProductById,
  storeResponseInCache
);

// Route to update a product by ID
router.put("/products/:productId", productcontrollers.updateProduct);

// Route to delete a product by ID
router.delete("/products/:productId", productcontrollers.deleteProductById);

module.exports = router;
