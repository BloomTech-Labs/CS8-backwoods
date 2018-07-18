const jwt = require('jsonwebtoken');
const models = require('../models');
const secret = require('../config');

const login = (req, res) => {
  models.User.findOne(
    {
      email: req.body.email,
      password: req.body.password
    },
    (err, user) => {
      if (err) {
        res.status(403).json({ error: 'Invalid Email/Password' });
        return;
      }
      if (user === null) {
        res.status(422).json({ error: 'This User Does Not Exist' });
        return;
      }
      user.comparePasswords(password, (noMatch, hashMatch) => {
        if (noMatch !== null) {
          res.status(422).json({ error: "Passwords Don't Match" });
          return;
        }
        if (hashMatch) {
          const payload = { email: user.email };
          const token = jwt.sign(payload, secret);
          res.json({ token });
        }
      });
    }
  );
};

module.exports = { login };
