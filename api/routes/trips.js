const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json')

// Trip API router
var router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Trip Voting APIs  ****************/

router.post('/vote', function (req, res) {
    console.log(req.body);
    res.end('You chose to vote');
});

router.get('/vote', function (req, res) {
    console.log(req.body);
    res.end('You want to see the votes');
});

/**************** Trip Itinerary APIs  ****************/

router.post('/itinerary', function (req, res) {
    console.log('You chose to add a trip')
});

router.put('/itinerary', function (req, res) {
    console.log('Add a place to this');
});

router.get('/itinerary', function (req, res) {
    console.log('Get an itinerary');
});

router.delete('/itinerary', function (req, res) {
    console.log('Delete an itinerary');
});

/**************** Trip Locations APIs  ****************/

router.get('/location', function (req, res) {
    console.log('Get places in the trip');
});

router.post('/location', function (req, res) {
    console.log('Add places in the trip');
});

router.get('/location/top', function (req, res) {
    console.log('Get top n locations in the trip');
})

router.get('/', function (req, res) {
    let computeValue = computeResource.getSampleMessage();
    res.end('User router reached. ' + computeValue);
});

module.exports = router;