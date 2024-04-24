const redis = require("redis");
const { promisify } = require("util");
const logger = require("../utils/logger");

// Create Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

// Promisify Redis client methods
const asyncGet = promisify(redisClient.get).bind(redisClient);
const asyncSet = promisify(redisClient.set).bind(redisClient);
const asyncDel = promisify(redisClient.del).bind(redisClient);

// Error handling
redisClient.on("error", (err) => {
  logger.error("Redis Error: ", err);
});

module.exports = { redisClient, asyncGet, asyncSet, asyncDel };
