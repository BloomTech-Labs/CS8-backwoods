const models = require('../models');

const createMarker = (req, res) => {
    models.Markers.create({
        tripId: req.body.tripId,
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
    models.Markers.findAll({
        where: { tripId: req.params.tripId }
    })
        .then((marker) => {
            if (marker.length === 0) {
                res.status(422).json({ "error": "Trip has no markers" })
                return
            }
            res.json({ marker })
        })
        .catch(err => {
            res.json({"error": err})
        })
};

module.exports = { createMarker, getMarkers }