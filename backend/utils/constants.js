module.exports.statusCodes = {
  CREATED: 201,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  NO_CONTENT: 204,
};

module.exports.messages = {
  NOT_VALID_URL:
    'Hе является допустимым URL. Пример: http(s)://(www.)domain.com',
  NOT_VALID_EMAIL: 'Hе является допустимым EMAIL. Пример: example@domain.com',
};

module.exports.regexp = {
  URL: '^(https?:\\/\\/)(www\\.)?[^\\s$.?#].[^\\s]*$',
  ID: '^[0-9a-fA-F]{24}$',
};
