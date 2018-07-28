const models = require('../models');

const createMarker = (req, res) => {
    models.Markers.create({
        markerName: req.body.markerName,
        eta: req.body.eta,
        long: req.body.long,
        lat: req.body.lat,
    }).then(response => {
        res.json(response);
    }).catch(err => {
        res.json(err);
    })
}

const getMarkers = (req, res) => {
    models.Trips.findAll({
        where: { email: req.params.user }
    })
        .then((trips) => {
            if (trips.length === 0) {
                res.status(422).json({ "error": "User doesn't have trips" })
                return
            }
            res.json({ trips })
        })
        .catch(err => {
            res.json(err)
        })
};

module.exports = { createMarker, getMarkers }