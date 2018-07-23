// const DATABASE_URL = require('../config')
const Sequelize = require('sequelize');

//       DB Name     DB Username  DB Password
// const sequelize = new Sequelize('backwoods', 'postgres', 'dbsuperuser', {
//   dialect: 'postgres'
// });
// for production this will be changed to:

const sequelize = new Sequelize({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
sequelize.connect();


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
