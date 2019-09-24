const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json')
const _ = require('underscore');
const { 
    VotesQueryModel,
    TripPlaceQueryModel, 
    TripQueryModel, 
    TripFriendQueryModel 
} = require('../query-models');

// Trip API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Trip APIs  ****************/

// These are the people who are a part of this trip
const tripQueryModel = new TripQueryModel();

// TODO: Do we really need this?
router.get('/', function (req, res) {
    res.end('Get all trips');
});

// Create a trip
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

// Delete a trip
router.delete('/', function (req, res) {
    const toDelete = req.body.trip;

    // Delete from mySQL using knex
    const deletion = tripQueryModel.deleteTrip(toDelete);

    // Construct response after deletion
    deletion
        .then(function (returnObject) {
            res.end('Return object was ', JSON.stringify(returnObject));
        });
});

// TODO: Implement this - Update a trip
router.put('/', function (req, res) {
    const toUpdate = req.body.trip;
    res.end('Update an existing trip record');
});

/**************** Trip Member APIs  ****************/

// These are the people who are a part of this trip
const tripFriendQueryModel = new TripFriendQueryModel();

// Get the members of a given trip.
router.get('/members', function (req, res) {
    let getTripFriends = tripFriendQueryModel.getTripFriends(req.body.tripFriend);

    getTripFriends
        .then(function (queryResponse) {
            res.json({"tripFriends": queryResponse});
        })
});

// Add a member to a trip (adding a member-trip association)
router.post('/members', function (req, res) {
    const addTripFriend = tripFriendQueryModel.addTripFriend(req.body.tripFriend);

    addTripFriend
        .then(function (insertionResponse) {
            res.json({"insertedId": insertionResponse});
        })
        .catch(function (err) {
            res.status(500).end('Could not add user to trip');
            console.log (JSON.stringify(err));
        });
});

// Remove a member from a trip
router.delete('/members', function (req, res) {
    const deleteMember = tripFriendQueryModel.deleteTripFriend(req.body.tripFriend);

    deleteMember
        .then(function (deletionResponse) {
            res.json({"deletedId": deletionResponse});
        })
        .catch(function (err) {
            res.status(500).end('Could not delete user from trip');
            console.log (JSON.stringify(err));
        });
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

router.delete('/vote', function (req, res) {
    const toDelete = req.body.vote;

    // Delete from mySQL using knex
    const deletion = votesQueryModel.deleteVote(toDelete);

    // Construct response after deletion
    deletion
        .then(function (returnObject) {
            res.json({"deletedId": returnObject});
        });
});

/**************** Trip Itinerary APIs  ****************/

// These are the itineraries inside the trip
// Are these being deferred for now? 

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
            res.json({"location_ids": _.map(queryResponse, pair => pair['place_id'])});
        })
        .catch(function(err) {
            res.status(500).end('Unable to get trip locations');
            console.log(err);
        });
});

// Add a location to this trip.
router.post('/locations', function (req, res) {
    const insert = tripPlaceQueryModel.addLocationToTrip(req.body.trip);

    insert
        .then(function(insertionResponse) {
            res.json({"inserted": insertionResponse});
        })
        .catch(function(err) {
            console.log(JSON.stringify(err));
            res.status(500).end('Unable to insert trip locations');
        });
});

// Delete a location from this trip.
router.delete('/locations', function (req, res) {
    const deleteLocation = tripPlaceQueryModel.deleteLocationFromTrip(req.body.trip);

    deleteLocation
        .then(function(deletionResponse) {
            res.json({"deleted": deletionResponse});
        })
        .catch(function(err) {
            console.log(JSON.stringify(err));
            res.status(500).end('Unable to delete trip location');
        });
});

// Get the top locations by vote.
// TODO: This needs to be implemented
router.get('/locations/top', function (req, res) {
    // This call is not implemented
    const getTopLocations = tripPlaceQueryModel.getTopLocationInTrip(req.body.trip);

    getTopLocations
        .then(function(queryResponse) {
            res.json(queryResponse);
        })
        .catch(function (err) {
            res.status(500).end('Unable to get top locations');
        });
});

// Get the votes for the chosen location
// TODO: Need to implement this 
router.get('/locations/votes', function (req, res) {
    const getVotes = tripPlaceQueryModel.get
});

module.exports = router;