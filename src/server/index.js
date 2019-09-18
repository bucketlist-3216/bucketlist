const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`)
});