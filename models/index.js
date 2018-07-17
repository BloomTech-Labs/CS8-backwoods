import Sequelize from 'sequelize';

const sequelize = new Sequelize('user', 'postgres', 'dbsuperuser', {
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;

export default models;
