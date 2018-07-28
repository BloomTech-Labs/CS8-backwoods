const markers = (sequelize, DataTypes) => {
    const Markers = sequelize.define('markers', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        markerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        long: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    Markers.associate = function (models) {
        models.Markers.belongsTo(models.Trips)
    }

    return Markers;
};



module.exports = markers;