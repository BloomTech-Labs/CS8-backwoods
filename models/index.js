const Sequelize = require('sequelize');

//       DB Name     DB Username  DB Password
// const sequelize = new Sequelize('backwoods', 'postgres', 'dbsuperuser', {
//   dialect: 'postgres'
// });

// for production this will be changed to:
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    }
  })
} else {
  sequelize = new Sequelize('backwoods', 'postgres', 'dbsuperuser', {
    dialect: 'postgres'
  })
}


// Test to see if we are connected to sequelize/db
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// imports the models to the database
const models = {
  User: sequelize.import('./user')
};

// Creates relationship between models. I.E A User and their Trips.
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;

module.exports = models;
