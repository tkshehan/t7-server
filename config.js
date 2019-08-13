exports.PORT = process.env.PORT || 8080;
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/t7-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/test-t7-app';
exports.SECRET = 'TESTKEY';