const Product = require("../models/productModel");

module.exports.ProductServices = {
  createProduct: async (productData) => {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },

  getProducts: async (reqQuery) => {
    try {
      const {
        category,
        brand,
        minPrice,
        maxPrice,
        sortBy,
        sortOrder,
        page,
        limit,
      } = reqQuery;

      // construct filter: Product.find({category, brand, price:{$gte:minPrice, lte:maxPrice}})
      const filter = {};
      if (category) filter.category = category;
      if (brand) filter.brand = brand;
      if (minPrice !== undefined) filter.price = { $gte: minPrice };
      if (maxPrice !== undefined)
        filter.price = { ...filter.price, $lte: maxPrice };

      // sort: Product.find(filter).sort({sortBy: sortOrder})
      const sort = {};
      if (sortBy) {
        sort.sortBy = sortOrder === "desc" ? -1 : 1;
      }

      // Pagination: Product.find(filter).sort(sort).skip(skip).limit(pageSize)
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;
      const skip = (pageNumber - 1) * pageSize;

      const products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(pageSize);
      return products;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  getProductByName: async (productName) => {
    try {
      const product = await Product.findOne({ name: productName });
      return product;
    } catch (error) {
      throw new Error(`Failed to find product by name: ${error.message}`);
    }
  },

  getProductById: async (productId) => {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw new Error(`Failed to find product by ID: ${error.message}`);
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true }
      );
      return updatedProduct;
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  },

  deleteProductById: async (productId) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  },
};
// module.exports.ProductServices = ProductServices;
