const models = require('../models');

const emailCheck = (req, res, next) => {
    console.log(req.params.user);
    models.User.findOne(
        {
            where: {
                email: req.params.user
            }
        }
    ).then((user) => {
        if (!user) {
            res.status(422).json({ "error": "User does not exist" })
            return
        }
        res.json({ email: user.email, firstName: user.firstName, lastName: user.lastName })
        console.log(user);
    }).catch((err) => {
        console.log(err)
    });
}

module.exports = { emailCheck }