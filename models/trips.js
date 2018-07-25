const trips = (sequelize, DataTypes) => {
    const Trips = sequelize.define('trips', {
        tripName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Trips;
};


module.exports = trips;