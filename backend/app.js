const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { errors } = require('celebrate');
const config = require('config');
const helmet = require('helmet');
const cors = require('cors');
const helmetConfig = require('./middlewares/helmet');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const corsOptions = require('./middlewares/cors');

require('dotenv').config();

// Get environment variables
const { NODE_ENV, DB_URL, PORT } = process.env;

const app = express();

// Connect to database
mongoose.connect(NODE_ENV === 'production' ? DB_URL : config.get('dbURL'));

// Connect request logger
app.use(requestLogger);

// Configure middleware
app.use(limiter);
app.use(helmet(helmetConfig));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use all routes
app.use(routes);

// Connect errorlogger
app.use(errorLogger);

// Handle errors
app.use(errors());
app.use(errorHandler);

// Connect DB and start server
const port = NODE_ENV === 'production' ? PORT : config.get('port');

mongoose.connection.once('open', () => {
  console.log(chalk.blue('Mongoose connected'));
  app.listen(port, () => console.log(chalk.bgBlue(`Server started on port ${port}`)));
});

mongoose.connection.on('error', (err) => {
  console.error(chalk.red('Mongoose connection error:'), err);
});
