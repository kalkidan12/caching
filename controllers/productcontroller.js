const { ProductServices } = require("../services/productService");

const {
  bodySchema,
  paramsSchema,
  querySchema,
} = require("../utils/validation");

module.exports.productcontrollers = {
  createProduct: async (req, res) => {
    try {
      // Validate request body
      const bodyValidationResult = bodySchema.validate(req.body, {
        abortEarly: false,
      });
      if (bodyValidationResult.error) {
        return res.status(400).json({
          message: bodyValidationResult.error.details.map(
            (detail) => detail.message
          ),
        });
      }

      // Proceed with business logic if body validation passes
      const productData = bodyValidationResult.value;

      const existingProduct = await ProductServices.getProductByName(
        productData.name
      );
      if (existingProduct) {
        return res.status(400).json({ message: "Product already exists" });
      }
      const newProduct = await ProductServices.createProduct(productData);
      return res
        .status(201)
        .json({ message: "Product added", product: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);

      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      // Validate request parameters
      const paramsValidationResult = paramsSchema.validate(req.params, {
        abortEarly: false,
      });
      if (paramsValidationResult.error) {
        return res.status(400).json({
          message: paramsValidationResult.error.details.map(
            (detail) => detail.message
          ),
        });
      }

      // Proceed with business logic if params validation passes
      const productId = req.params.productId;
      const product = await ProductServices.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ product });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  },

  getProducts: async (req, res) => {
    try {
      // Proceed with business logic if query validation passes
      const products = await ProductServices.getProducts(req.query);
      return res.status(200).json({ products });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      // Validate request parameters
      const paramsValidationResult = paramsSchema.validate(req.params, {
        abortEarly: false,
      });
      if (paramsValidationResult.error) {
        return res.status(400).json({
          message: paramsValidationResult.error.details.map(
            (detail) => detail.message
          ),
        });
      }

      // Validate request body
      const bodyValidationResult = bodySchema.validate(req.body, {
        abortEarly: false,
      });
      if (bodyValidationResult.error) {
        return res.status(400).json({
          message: bodyValidationResult.error.details.map(
            (detail) => detail.message
          ),
        });
      }

      // Proceed with business logic if validation passes
      const productId = req.params.productId;
      const productData = bodyValidationResult.value;
      const productExist = await ProductServices.getProductById(productId);
      if (!productExist) {
        return res.status(404).json({ message: "Product not found" });
      }
      const updatedProduct = await ProductServices.updateProduct(
        productId,
        productData
      );
      if (!updatedProduct) {
        return res.status(400).json({ message: "Product update failed" });
      }
      return res
        .status(200)
        .json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  },

  deleteProductById: async (req, res) => {
    try {
      // Validate request parameters
      const paramsValidationResult = paramsSchema.validate(req.params, {
        abortEarly: false,
      });
      if (paramsValidationResult.error) {
        return res.status(400).json({
          message: paramsValidationResult.error.details.map(
            (detail) => detail.message
          ),
        });
      }

      // Proceed with business logic if validation passes
      const productId = req.params.productId;
      const productExist = await ProductServices.getProductById(productId);
      if (!productExist) {
        return res.status(404).json({ message: "Product not found" });
      }
      const deletedProduct = await ProductServices.deleteProductById(productId);
      if (!deletedProduct) {
        return res.status(400).json({ message: "Product delete failed" });
      }
      return res
        .status(200)
        .json({ message: "Product deleted", product: deletedProduct });
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  },
};
