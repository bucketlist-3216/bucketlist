const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json')

// Trip API router
var router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Trip Member APIs  ****************/

// These are the people who are a part of this trip

router.get('/members', function (req, res) {
    res.end('Get members of this trip');
});

router.post('/members', function (req, res) {
    res.end('Add a member to this trip');
});

router.delete('/members', function (req, res) {
    res.end('Delete a member from this trip');
});

/**************** Trip Voting APIs  ****************/

// These are the votes that have been cast inside this trip

router.post('/vote', function (req, res) {
    console.log(req.body);
    res.end('You chose to vote');
});

/**************** Trip Itinerary APIs  ****************/

// These are the itineraries inside the trip

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

// These are the locations inside the trip

router.get('/locations', function (req, res) {
    res.end('Get places in the trip');
});

router.post('/locations', function (req, res) {
    res.end('Add places in the trip');
});

router.get('/locations/top', function (req, res) {
    res.end('Get top n locations in the trip');
});

router.get('/locations/votes', function (req, res) {
    res.end('You want to see the votes');
});

module.exports = router;