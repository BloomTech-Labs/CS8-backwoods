const { createUser } = require('../controllers/createUser');
const { login } = require('../controllers/login');
const { payment } = require('../controllers/payment');
const authenticate = require('../middleware/authMiddleware');
const { changePassword } = require('../controllers/changePassword');
const { emailCheck } = require('../controllers/checkEmail');
const { createTrip } = require('../controllers/trips');
const { getTrip } = require('../controllers/trips');

module.exports = app => {
  app.route('/signup').post(createUser);
  app.route('/login').post(login);
  app.route('/charge').post(payment);
  app.route('/trips/settings').put(authenticate, changePassword);
  app.route(`/:user`).get(emailCheck, getTrip);
  app.route('/createTrips').post(authenticate, createTrip);
};
