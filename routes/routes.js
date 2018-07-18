const { createUser } = require('../controllers/createUser');
const { login } = require('../controllers/login');
const authenticate = require('../middleware/authMiddleware');

module.exports = app => {
  app.route('/signup').post(createUser);
  app.route('/login').post(login);
};
