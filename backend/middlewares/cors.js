const corsOptions = {
  origin: [
    'http://practicum-cyrillgalkin.nomoredomains.monster',
    'https://practicum-cyrillgalkin.nomoredomains.monster',
    'http://www.practicum-cyrillgalkin.nomoredomains.monster',
    'https://www.practicum-cyrillgalkin.nomoredomains.monster',
    'http://api.practicum-cyrilgalkin.nomoredomains.monster',
    'https://api.practicum-cyrilgalkin.nomoredomains.monster',
    'http://www.api.practicum-cyrilgalkin.nomoredomains.monster',
    'https://www.api.practicum-cyrilgalkin.nomoredomains.monster',
  ],
  methods: 'GET,POST,PUT,PATCH,DELETE,HEAD',
  allowedHeaders: 'Content-Type, Authorization',
};

module.exports = corsOptions;
