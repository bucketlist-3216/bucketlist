const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.js')
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

// These are the trips
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
        })
        .catch(function (err) {
            res.status(500).end(`Unable to add trip because of the following error: ${err.message}`);
            console.log(JSON.stringify(err));
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

router.put('/', function (req, res) {
    const toUpdate = req.body.trip;

    // Update on mySQL using knex
    const updating = tripQueryModel.updateTrip(toUpdate);

    // Construct response after updating
    updating
        .then(function (returnObject) {
            res.end('Return object was ', JSON.stringify(returnObject));
        });
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
            res.status(500).end(`Unable to add user to trip because of the following error: ${err.message}`);
            console.log(err);
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
            res.status(500).end(`Unable to delete user from trip because of the following error: ${err.message}`);
            console.log (err);
        });
});

/**************** Trip Voting APIs  ****************/

// These are the votes that have been cast inside this trip
const votesQueryModel = new VotesQueryModel();

router.post('/vote', function (req, res) {
    // Cast the vote
    const voting = votesQueryModel.castVote(req.body.vote);

    // Insert into database and return response
    voting
        .then(function (insertionResponse) {
            res.json({"insertedId": insertionResponse});
        })
        .catch(function (err) {
            res.status(500).end(`Unable to cast a vote because of the following error: ${err.message}`);
            console.log(err);
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

// Get the votes for the chosen location
router.get('/vote/location/:locationId', function (req, res) {
    const votes = votesQueryModel.getVotes({trip_place_id: req.params.locationId});

    votes
        .then(function(queryResponse) {
            res.json(queryResponse);
        })
        .catch(function(err) {
            res.status(500).end('Unable to get votes for location');
            console.log(err);
        });
});

// Get locations sorted by votes
router.get('/vote/results/:tripId', function (req, res) {
    const votingResults = votesQueryModel.getVotingResults(req.params.tripId);

    votingResults
        .then(function(queryResponse) {
            res.json(queryResponse);
        })
        .catch(function (err) {
            res.status(500).end(`Unable to get voting results because of the following error: ${err.message}`);
            console.log(err);
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

module.exports = router;
