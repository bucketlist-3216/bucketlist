const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const process = require('process');
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

// // Serve the static files from build
// console.log('Serving folder', path.join(__dirname, 'build'));
// app.use(express.static(path.join(__dirname, 'build')));
//
// app.get('*', function(req, res) {
//     res.sendFile('index.html', {root: path.join(__dirname, 'build')});
// });

/************************** Start the server **************************/

port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port ', port);
});
