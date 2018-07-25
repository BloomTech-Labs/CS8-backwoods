const models = require('../models');

const createTrip = (req, res) => {
    models.Trips.create({
        tripName: req.body.tripName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        email: req.body.email
    }).then(response => {
        res.json(response);
    }).catch(err => {
        res.json(err);
    })
}

const getTrip = (req, res) => {
    console.log("req backend",req)
    models.Trips.find(
        {
            where: {
                email: req.params.user
            }
        }
    ).then(trips => {
        console.log("trips backend", trips)
        res.json(trips)
    }).catch(err => {
        res.status(500).json(({ error: 'Error fetching trips' }))
    })
};

module.exports = { createTrip, getTrip }