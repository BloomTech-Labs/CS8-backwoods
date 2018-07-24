const { createUser } = require('../controllers/createUser');
const { login } = require('../controllers/login');
const authenticate = require('../middleware/authMiddleware');
const { changePassword } = require('../controllers/changePassword');

module.exports = app => {
  app.route('/signup').post(createUser);
  app.route('/login').post(login);
  app.route('/trips/settings').put(authenticate, changePassword)
};
