const corsOptions = {
  origin: [
    'http://practicum-cyrillgalkin.nomoredomains.monster',
    'https://practicum-cyrillgalkin.nomoredomains.monster',
    'http://www.practicum-cyrillgalkin.nomoredomains.monster',
    'https://www.practicum-cyrillgalkin.nomoredomains.monster',
  ],
  methods: 'GET,POST,PUT,PATCH,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

module.exports = corsOptions;
