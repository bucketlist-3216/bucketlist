const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const app = express();

const port = process.env.PORT || 8080

// keep this here, need for server static files in the future
// app.use(express.static(path.join(__dirname, 'build')));

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


app.listen(port, () =>  {
  console.log(`Server running on ${port}`)
});