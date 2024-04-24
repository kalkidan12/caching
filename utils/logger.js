const winston = require("winston");

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info", // Set the default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to log messages
    winston.format.json() // Output logs in JSON format
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
  ],
});

module.exports = logger;
