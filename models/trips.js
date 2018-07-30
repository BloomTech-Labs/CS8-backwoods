const trips = (sequelize, DataTypes) => {
    const Trips = sequelize.define('trips', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
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
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Trips;
};


module.exports = trips;