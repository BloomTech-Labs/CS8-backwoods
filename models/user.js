const bcrypt = require('bcrypt');
const Trips = require('./trips');

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
      }
    },
    {
      timestamps: true
    },
    {
      classMethods: {
        associate: (models) => {
          User.hasMany(models.Trips)
        }
      }
    }
  );

  User.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw new Error();
      });
  });

  User.beforeUpdate((user, options) => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw new Error();
      });
  });
  User.associate = function(models) {
    models.User.hasMany(models.Trips, { foreignKey: 'email', targetKey: 'fk_user'});
    // models.Trips.belongsTo(models.User,{foreignKey: 'fk_user', targetKey: 'email'})
  };
  return User;
};

module.exports = user;
