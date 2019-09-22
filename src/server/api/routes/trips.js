const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json')
const { 
    VotesQueryModel,
    TripPlaceQueryModel, 
    TripQueryModel, 
    TripFriendQueryModel 
} = require('../query-model');

// Trip API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Trip APIs  ****************/

// These are the people who are a part of this trip
const tripQueryModel = new TripQueryModel();

router.get('/', function (req, res) {
    res.end('Get all trips');
});

router.post('/', function (req, res) {
    const toInsert = req.body.trip;

    // Insert into mySQL using knex
    const insertion = tripQueryModel.addTrip(toInsert);

    // Construct response after insertion
    insertion
        .then(function (returnObject) {
            res.end('Return object was ', JSON.stringify(returnObject));
        });
});

router.delete('/', function (req, res) {
    res.end('Delete a trip');
});

/**************** Trip Member APIs  ****************/

// These are the people who are a part of this trip
const tripFriendQueryModel = new TripFriendQueryModel();

router.get('/members', function (req, res) {
    res.end('Get members of this trip');
});

router.post('/members', function (req, res) {
    let addTripFriend = tripFriendQueryModel.addTripFriend(req.body.tripFriend);

    addTripFriend
        .then(function (insertionResponse) {
            res.end(JSON.stringify({"insertedId":insertionResponse}));
        })
        .catch(function (err) {
            res.status(500).end('Could not add user to trip');
            console.log (JSON.stringify(err));
        });
});

router.delete('/members', function (req, res) {
    res.end('Delete a member from this trip');
});

/**************** Trip Voting APIs  ****************/

// These are the votes that have been cast inside this trip
const votesQueryModel = new VotesQueryModel();

router.post('/vote', function (req, res) {
    // Cast the vote
    const vote = votesQueryModel.castVote(req.body.vote);

    // Insert into database and return response
    vote.then(function (insertionResponse) {
        res.end('Vote cast');
    });
});

router.get('/vote', function (req, res) {

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
const tripPlaceQueryModel = new TripPlaceQueryModel();

// View the locations in the trip.
// TODO: Implement this endpoint
router.get('/locations', function (req, res) {
    const tripLocations = tripPlaceQueryModel.getLocationsInTrip(req.body.trip);

    tripLocations
        .then(function(queryResponse) {
            res.end('The places in the trip are ', JSON.stringify(queryResponse));
        })
        .catch(function(err) {
            res.status(500).end('Unable to get trip locations');
        });
});

// Add a location to this trip.
router.post('/locations', function (req, res) {
    const insert = tripPlaceQueryModel.addLocationToTrip(req.body.trip);

    insert
        .then(function(insertionResponse) {
            res.end(JSON.stringify({"inserted_id": insertionResponse}));
        })
        .catch(function(err) {
            console.log(JSON.stringify(err));
            res.status(500).end('Unable to insert trip locations');
        });
});

// Get the top locations by vote.
router.get('/locations/top', function (req, res) {
    const getTopLocations = tripPlaceQueryModel.getTopLocationInTrip(req.body.trip);

    getTopLocations
        .then(function(queryResponse) {
            res.end('The top locations in this trip are ', JSON.stringify(queryResponse));
        })
        .catch(function (err) {
            res.status(500).end('Unable to get top locations');
        });
});

// Do we need this anymore?
router.get('/locations/votes', function (req, res) {
    res.end('You want to see the votes');
});

module.exports = router;