const mongoose = require("mongoose");
const logger = require("../utils/logger");

// Export the connectDb function using module.exports
module.exports.connectDb = (url) => {
  mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      logger.info("DB Connected!");
    })
    .catch((err) => {
      logger.error("Failed to connect to DB!");
      process.exit(1);
    });
};
