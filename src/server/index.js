const express = require('express');
const bodyParser = require('body-parser');
const process = require('process');
const path = require('path');
const {
    users,
    trips,
    places,
    admin 
} = require('./api/routes');
const config = require('./config/settings');
const cors = require('cors');

/************************ HTTPS redirect middleware *************************/

const app = express();
app.use(function(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
});

/************************** CORS + JSON parsing **************************/

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
app.use('/api/v1/user', users);

app.use('/debug', admin);

// Serve the static files from build
console.log('Serving folder', path.join(__dirname, 'build'));
app.use(express.static(path.join(__dirname, 'build')));

/************************** Start the server **************************/

console.log(process.env.PORT);
port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log('Listening on port ', port);
});