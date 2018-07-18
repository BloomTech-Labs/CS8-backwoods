const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const models = require('./models');
const routes = require('./routes/routes');

// Test GET request
app.get('/', (req, res) => {
  res.send('GET request');
});

models.sequelize.sync({ force: true }).then(() => {
  app.listen('8000', () => console.log('Server listening on port 8000'));
});

routes(app);

module.exports = app;
