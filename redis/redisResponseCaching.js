const { redisClient } = require("../configs/redis");

module.exports = {
  async getResponseFromCache(req, res, next) {
    try {
      const cachedData = await asyncGet(req.routeUrl);
      if (cachedData !== null) {
        res.send(JSON.parse(cachedData));
      } else {
        next();
      }
    } catch (error) {
      console.error("Error retrieving cached data:", error);
      next(); // Proceed without caching
    }
  },

  async storeResponseInCache(req, res, next) {
    try {
      await asyncSet(req.routeUrl, JSON.stringify(res.locals.data));
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Error storing response in cache:", error);
      next(); // Proceed without caching
    }
  },
};
