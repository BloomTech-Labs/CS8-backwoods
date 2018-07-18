const jwt = require('jsonwebtoken');
const models = require('../models');
const secret = require('../config');

const login = (req, res, next) => {
  models.User.findOne(
    {
      where: {
        email: req.body.email
      }
    }
    // (err, user) => {
    //   if (err) {
    //     console.log('first function after findOne', err);
    //     res.status(403).json({ error: 'Invalid Email/Password' });
    //     return;
    //   }
    //   if (user === null) {
    //     console.log('user is null', user);
    //     res.status(422).json({ error: 'This User Does Not Exist' });
    //     return;
    //   }
    //   user.validpassword(password, (noMatch, hashMatch) => {
    //     console.log('made it to the validation!');
    //     if (noMatch !== null) {
    //       res.status(422).json({ error: "Passwords Don't Match" });
    //       return;
    //     }
    //     if (hashMatch) {
    //       const payload = { email: user.email };
    //       const token = jwt.sign(payload, secret);
    //       res.json({ token });
    //     }
    //   });
    // }
  )
    .then(user => {
      console.log(user);
      if (user && User.validPassword(req.body.password)) {
        req.dbUser = user;
        next();
      } else {
        res.status(401).json({ error: 'wrong username or password' });
      }
    })
    .catch(err => {
      res.json(err);
    });
};

module.exports = { login };
