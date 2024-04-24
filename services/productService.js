const Product = require("../models/productModel");
const redis = require("../redis/redis");
module.exports.ProductServices = {
  createProduct: async (productData) => {
    try {
      const cacheKey = "Products";

      const newProduct = await Product.create(productData);
      await redis.appendCache(cacheKey, productData);
      return newProduct;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },

  getProducts: async (reqQuery) => {
    try {
      const cacheKey = JSON.stringify(req.reqQuery); // or we can use 'Products'
      const cacheddata = await redis.getFromCache(cacheKey);
      if (cacheddata) {
        return cacheddata;
      }
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
      await redis.setInCache(cacheKey, products); //Each unique combination of query parameters in reqQuery could potentially result in a different set of cached data.
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
      const cacheKey = JSON.stringify(`Product:${productId}`);
      const cacheddata = await redis.getFromCache(cacheKey);
      if (cacheddata) {
        return cacheddata;
      }

      const product = await Product.findById(productId);
      await redis.setInCache(`Product:${productId}`, product);

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

      const cacheKey = JSON.stringify(`Product:${productId}`);
      await redis.removeFromCache(cacheKey);

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
