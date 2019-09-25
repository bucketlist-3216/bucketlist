const express = require('express');
const bodyParser = require('body-parser');
const {
    login: loginRouter,
    user: userRouter,
    trip: tripRouter,
    place: placeRouter,
    admin
} = require('./api/routes');
const config = require('./config/settings');
const cors = require('cors');

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

app.use('/api/v1/login', loginRouter);
app.use('/api/v1/trip', tripRouter);
app.use('/api/v1/place', placeRouter);
app.use('/api/v1/user', userRouter);

app.use('/debug', admin);

/************************** Start the server **************************/

port = config.port || 3000;

app.listen(port, () => {
    console.log('Listening on port ', port);
});
