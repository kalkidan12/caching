const { cache } = require("joi");
const {
  redisClient,
  asyncDel,
  asyncGet,
  asyncSet,
} = require("../configs/redis");
const logger = require("../utils/logger");

module.exports = {
  async getFromCache(key) {
    try {
      const cachedData = await asyncGet(key);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      logger.error("Error gettig data from cache: ", error);
      throw new Error("Failed to get data from cache");
    }
  },

  async setInCache(key, data) {
    try {
      const serializedData = JSON.stringify(data);
      await asyncSet(
        key,
        serializedData,
        "EX",
        process.env.CACHE_EXPIRATION_TIME
      );
    } catch (error) {
      logger.error("Error setting data in cache: ", error);
      throw new Error("Failed to set data in cache");
    }
  },

  async appendCache(key, data) {
    try {
      const serializedData = JSON.stringify(data);

      // Append the JSON string to the list with the specified key
      await client.rpushAsync(key, serializedData);
    } catch (error) {
      console.error("Error appending to cache:", error);
      throw new Error("Failed to append to cache");
    }
  },

  // Cache invalidated for key:
  async removeFromCache(key) {
    try {
      await asyncDel(key);
    } catch (error) {
      logger.error("Error removing data from cache: ", error);
      throw new Error("Failed to remove data from cache");
    }
  },

  async clearcache() {
    try {
      await redisClient.flushAll();
      logger.info("Cache cleared successfully.");
    } catch (error) {
      logger.error("Error clearing cache: ", error);
      throw new Error("Failed to clear cache");
    }
  },
};
