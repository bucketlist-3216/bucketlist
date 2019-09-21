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

/**************** Update Places Store  ****************/

router.post('/store', function(req, res) {
    console.log('Add a location to the database');
});

router.delete('/store', function(req, res) {
    console.log('Delete a location from database');
});

router.get('/store', function (req, res) {
    console.log('Get details of a location');
});

/**************** Place Search APIs  ****************/

router.get('/search', function (req, res) {
    console.log('Search for a location based on params');
});

module.exports = router;