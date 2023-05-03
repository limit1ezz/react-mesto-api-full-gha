const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 25, // Limit each IP to 5 requests per windowMs
});

module.exports = limiter;
