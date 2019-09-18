const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json')

var computeResource = new Compute();

// Locations API router
var router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

router.post('/location', function(req, res) {
    console.log('Add a location to the database');
});

router.delete('/location', function(req, res) {
    console.log('Delete a location from database');
});

router.get('/location', function (req, res) {
    console.log('Get details of a location');
});

router.get('/', function (req, res) {
    let computeValue = computeResource.getSampleMessage();
    res.end('User router reached. ' + computeValue);
});

module.exports = router;