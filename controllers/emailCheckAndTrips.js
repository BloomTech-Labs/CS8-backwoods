const models = require('../models');

const emailCheckAndTrips = (req, res, next) => {
    console.log('FRROMM THE TOP ROPE!!!',models.User);
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
        } else {
            return user
        }
        // res.json({ email: user.email, firstName: user.firstName, lastName: user.lastName })
        // console.log(user)
    }).then((user) => {
        console.log('MOOOOOOODDDDDELLL.TRIP', models.Trips)
        models.Trips.findAll({
            include: [{
                model: models.trips,
                where: { email: user.email}
            }]
        })
        console.log('HAY LOOK AT ME!!!!!!',user.email)
    }).then((trips) => {
        console.log(trips)
        if(!trips) {
            res.status(422).json({ "error": "User doesn't have no trips" })
            return
        } else {
            return res.json(trips)
        }
    })
   
    
    
    .catch((err) => {
        console.log('Hello from catch',err)
    });
}

module.exports = { emailCheckAndTrips }