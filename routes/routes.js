const { createUser } = require('../controllers/createUser');

module.exports = app => {
  app.route('/signup').post(createUser);
};
