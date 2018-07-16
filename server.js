const app = require("express")();
const bodyParser = require('body-parser');
const cors = require("cors");


app.use(cors())
app.use(bodyParser.json());


// Test GET request
app.get('/', (req, res) => {
  res.send('GET request')
  })

app.listen('8000',() => console.log("Server listening on port 8000"))