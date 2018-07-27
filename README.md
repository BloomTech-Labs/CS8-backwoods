# CS8-backwoods
This Lambda Labs Project is a location based trip planner to keep your family and friends informed of your adventures.
## Tech Stack
React, Express, Node, Postgres

## To run project locally 
_______________________________
1. Clone repo.
2. In `/CS8-Backwoods` type `yarn` or `npm i` to install back-end dependencies.
3. Make sure you have a Postgres DB running on your local machine. [Instructions here](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)
4. The `yarn start` or `npm start` command will start back-end server [listening on port 8000](http://localhost:8000/).
5. Open a new terminal window.
6. `cd client` type `yarn` or `npm i` to install front-end dependencies.
7. The `yarn start` or `npm start` command visit site at [localhost:3000](http://localhost:3000/)


### Back-end Dependencies:
_____________________________
* [express](https://expressjs.com/)
* [body-parser](https://github.com/expressjs/body-parser)
* [cors](https://github.com/expressjs/cors#readme)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
* [pg](https://github.com/brianc/node-postgres)
* [pg-hstore](https://github.com/scarney81/pg-hstore)
* [sequelize](http://docs.sequelizejs.com/)
* [chai](http://www.chaijs.com/)
* [chai-http](https://github.com/chaijs/chai-http)
* [mocha](https://mochajs.org/)
* [nodemon](https://nodemon.io/)
### Front-end Dependencies:
* [sinon](http://sinonjs.org/)
* [sinon-chai](https://github.com/domenic/sinon-chai)
* [Material-UI](https://material-ui.com/)
* [axios](https://github.com/axios/axios)
* [google-maps-react](https://github.com/fullstackreact/google-maps-react)
* [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
* [react-stripe-elements](https://github.com/stripe/react-stripe-elements)
* [react-material-ui-form-validator](https://github.com/NewOldMax/react-material-ui-form-validator#readme)


### API
____________
#### Sign up a new user
* POST route `/signup` 
##### Example json object of required data
```
{
	"firstName": "Test",
	"lastName": "Test",
	"email": "test@test.com",
	"password": "test"   
}
```
_______
#### Sign in as existing user
* POST route `/login`
##### Example json object of required data
```
{
	"email": "test@test.com",
	"password":"test"
}
```
(This route will return a JWT token that you will need to create trips)
_______
#### Checking if user has trips
* GET route `/:user`
##### Example route (no data required other then user email in route)
`/test@test.com`
_________
#### Create Trip with existing user
* POST route `/createTrips
##### Example json object of required data
```
{
	"tripName": "test",
	"startDate": "10-23-18",
	"endDate": "11-24-18",
	"email": "new@test.com"
}
```
(Under headers/Authorization you will need to pass back the JWT token from the `/login` route)
