const allowedOrigins = [
  'http://practicum-cyrillgalkin.nomoredomains.monster',
  'https://practicum-cyrillgalkin.nomoredomains.monster',
  'http://www.practicum-cyrillgalkin.nomoredomains.monster',
  'https://www.practicum-cyrillgalkin.nomoredomains.monster',
];

const corsOptions = {
  origin(origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = corsOptions;
