const winston = require('winston');
const expressWinston = require('express-winston');

// Create a Winston logger instances
const requestLoggerInstance = winston.createLogger({
  level: 'info', // set the logging level
  format: winston.format.json(), // set the logging format
  transports: [
    /* new winston.transports.Console(), */
    new winston.transports.File({ filename: 'logs/request.log' }), // log to a file
  ],
});

const errorLoggerInstance = winston.createLogger({
  level: 'info', // set the logging level
  format: winston.format.json(), // set the logging format
  transports: [
    /* new winston.transports.Console(), */
    new winston.transports.File({ filename: 'logs/error.log' }), // log to a file
  ],
});

// Use the Express-Winston middleware to log HTTP requests and responses
const requestLogger = expressWinston.logger({
  winstonInstance: requestLoggerInstance, // pass in the Winston logger instance
  meta: false, // don't log metadata about the request (e.g. headers)
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms', // set the log message format
  colorize: true, // colorize the console output
});

// Use the Express-Winston errorLogger middleware to log HTTP errors
const errorLogger = expressWinston.errorLogger({
  winstonInstance: errorLoggerInstance, // pass in the Winston logger instance
  meta: true, // log metadata about the error
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{err.message}}', // set the log message format
  colorize: true, // colorize the console output
});

module.exports = {
  requestLogger,
  errorLogger,
};
