const express = require('express');
const bodyParser = require('body-parser');
const { DBClient } = require('./database');
const {
    users,
    trips,
    places,
    admin 
} = require('./api/routes');
const config = require('./config/settings');
const cors = require('cors');

/************************** Database Connection **************************/

const dbClient = new DBClient(config.database);

/************************** CORS + JSON parsing **************************/

const app = express()
app.use(cors());
app.use(bodyParser.json());

/************************** Middleware for logging **************************/

app.use('/api/', function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

/************************** Routes **************************/

app.use('/api/v1/trips', trips);
app.use('/api/v1/places', places);
app.use('api/v1/user', users);

app.use('/debug', admin);

/************************** Start the server **************************/

port = config.port || 3000;

app.listen(port, () => {
    console.log('Listening on port ', port);
});