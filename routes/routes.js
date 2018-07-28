const { createUser } = require('../controllers/createUser');
const { login } = require('../controllers/login');
const { payment } = require('../controllers/payment');
const authenticate = require('../middleware/authMiddleware');
const { changePassword } = require('../controllers/changePassword');
const { emailCheckAndTrips } = require('../controllers/emailCheckAndTrips');
const { createTrip } = require('../controllers/trips');
const { getTrip } = require('../controllers/trips');
const { createMarker } = require('../controllers/markers');

module.exports = app => {
  app.route('/signup').post(createUser);
  app.route('/login').post(login);
  app.route('/charge').post(payment);
  app.route('/trips/settings').put(authenticate, changePassword);
  app.route('/:user').get(emailCheckAndTrips, getTrip);
  app.route('/createTrips').post(authenticate, createTrip);
  app.route('/createMarker').post(authenticate, createMarker);
};
