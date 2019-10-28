const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../validate');
const settings = require('../../config/settings.js')
const _ = require('underscore');
const {
    VoteQueryModel,
    TripPlaceQueryModel,
    TripQueryModel,
    TripFriendQueryModel,
    UserQueryModel,
    PlaceImageQueryModel
} = require('../query-models');

// Trip API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Query Model Instantiation  ****************/

const tripQueryModel = new TripQueryModel();
const tripFriendQueryModel = new TripFriendQueryModel();
const voteQueryModel = new VoteQueryModel();
const tripPlaceQueryModel = new TripPlaceQueryModel();
const userQueryModel = new UserQueryModel();
const placeImageQueryModel = new PlaceImageQueryModel();

/**************** Trip APIs  ****************/
router.get('/', getUserTripsHandler); // TODO: Move this to /user/trips

router.get('/:tripId', getTripDetailsHandler);
router.post('/', addTripHandler);
router.put('/:toUpdate', updateTripHandler);
router.delete('/:toDelete', deleteTripHandler);

router.get('/:tripId/members', getTripMembersHandler);
router.post('/:tripId/members/', addTripMembersHandler);
router.delete('/members/:tripFriend', deleteTripMemberHandler);

// Get trip details
function getTripDetailsHandler(req, res) {
    if (isNaN(req.params.tripId)) {
        //try to handle as invite
        return tripQueryModel.getTripInvite(req.params.tripId).pluck('trip_id')
            .then((trip_id_array) => {
                if (_.size(trip_id_array) == 0) res.status(404).end("Invite Link not found");
                else {
                    let tripId = trip_id_array[0];
                    console.log("TripId: ", tripId);
                    res.send({"tripId": tripId});
                    return tripFriendQueryModel.addTripFriend({user_id: req.headers.verifiedUserId, trip_id: tripId})
                        .catch(function (err) {
                            res.status(500).end('Unable to add user to trip');
                            console.log(err);
                        });
                }
            })
            .catch(function (err) {
                res.status(500).end('Unable to get trip details');
                console.log(err);
            });
    } else {
        return tripQueryModel.getTrip(req.params.tripId)
            .then(function (queryResponse) {
                res.json(queryResponse[0]);
            })
            .catch(function (err) {
                res.status(500).end('Unable to get trip details');
                console.log(err);
            });
    }
}

// Get user trips
function getUserTripsHandler(req, res) {
    const userId = req.headers.verifiedUserId;
    const trips = tripFriendQueryModel.getUserTrips(userId);

    trips
        .then(function (queryResponse) {
            res.json(queryResponse);
        })
        .catch(function (err) {
            res.status(500).end(`Unable to get user's trips because of the following error: ${err.message}`);
            console.log(err);
        });
}

// Create a trip
function addTripHandler(req, res) {
    const toInsert = req.body.trip;
    toInsert.created_by = req.headers.verifiedUserId;
    // console.log(toInsert.created_by);

    // Insert trip into mySQL using knex
    const tripInsertion = tripQueryModel.addTrip(toInsert);

    return tripInsertion
        .then(function (insertedTrips) {
            // console.log('Trip insertion complete: ', insertedTrips);
            // console.log(toInsert.members);

            insertTripLink(returnedObject[0]);

            let tripMembershipUpdates = _.map(toInsert.members, emailId => {
                let getUserId = userQueryModel.getUserId({ email: emailId });

                return getUserId.then(function (userId) {
                    return tripFriendQueryModel.addTripFriend({
                        "trip_id": insertedTrips[0],
                        "user_id": userId[0]['user_id']
                    });
                });

            });

            tripMembershipUpdates.push(tripFriendQueryModel.addTripFriend({
                "trip_id": insertedTrips[0],
                "user_id": toInsert.created_by
            }));

            return Promise.all([insertedTrips].concat(tripMembershipUpdates));
        })
        .then(function (result) {
            // console.log('promise.all is complete with result: ', result);
            res.json({ insertedId: result[0] });
        })
        .catch(function (err) {
            res.status(500).end(`Could not create a trip due to ${err})`);
            console.log(err);
        });
}

// Delete a trip
function deleteTripHandler(req, res) {
    // Generate mySQL query to delete entry
    const userID = req.verifiedUserId;
    const deletion = tripQueryModel.deleteTrip(userId, req.params.trip);

    // Construct response after deletion
    deletion
        .then(function (returnObject) {
            console.log(returnObject);

            res.json({
                "deletedId": req.params.toDelete,
                "response": returnObject
            });
        })
        .catch(function (err) {
            res.status(500).end(`Unable to delete trip because of the following error: ${err.message}`);
            console.log(err);
        });
}

// Replace an existing entry
function updateTripHandler(req, res) {
    // Update on mySQL using knex
    const updating = tripQueryModel.updateTrip(req.params.toUpdate, req.body.trip);

    // Construct response after updating
    updating
        .then(function (updateResponse) {
            res.json({
                "updatedId": req.params.toUpdate,
                "response": updateResponse
            });
        })
        .catch(function (err) {
            res.status(500).end(`Unable to update trip due to ${err.message}`);
            console.log(err);
        });
}

// Generate and inserts a unique 16-character random link for trip
async function insertTripLink(trip_id) {
    //console.log("Inserting link for trip ID: ", trip_id)
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    do {
        for (let i = 0; i < 16; i++) {
            result += characters.charAt(Math.floor(Math.random() * 52));
        }
        let linkAlreadyExists = await tripQueryModel.getTripInvite(result).select("trip_id").then((rows) => _.size(rows));
        //console.log(linkAlreadyExists);
        if (linkAlreadyExists)
            result = '';
    } while (!result);
    tripQueryModel.updateTrip(trip_id, { invite_extension: result }).then((rows) => console.log(rows));
}

/**************** Trip Member APIs  ****************/

// Get the members of a given trip.
function getTripMembersHandler(req, res) {
    let getTripFriends = tripFriendQueryModel.getTripFriends(req.params.tripId);

    getTripFriends
        .then(function (queryResponse) {
            res.json({ "tripFriends": queryResponse });
        })
}

// Add a member to a trip (adding a member-trip association)
function addTripMembersHandler(req, res) {
    const { tripId } = req.params;
    const { email } = req.body;
    const userNotFoundMessage = `Could not find user with email '${email}'`;

    userQueryModel.getUserId({ email })
        .then(function (results) {
            if (results.length === 0) {
                throw new Error(userNotFoundMessage);
            } else {
                const { user_id } = results[0];
                return addTripFriend({ user_id, trip_id: tripId });
            }
        })
        .then(function (insertionResponse) {
            res.json({ "insertedId": insertionResponse });
        })
        .catch(function (err) {
            if (err.message === userNotFoundMessage) {
                res.status(404).end(userNotFoundMessage);
                console.log(err);
            } else {
                res.status(500).end('Could not add user to trip');
                console.log(err);
            }
        });
}

// Remove a member from a trip
function deleteTripMemberHandler(req, res) {
    const deleteMember = tripFriendQueryModel.deleteTripFriend(req.params.tripFriend);

    deleteMember
        .then(function (deletionResponse) {
            res.json({ "deletedId": deletionResponse });
        })
        .catch(function (err) {
            res.status(500).end('Could not delete user from trip');
            console.log(JSON.stringify(err));
        });
}

/**************** Trip Voting APIs  ****************/

// These are the votes that have been cast inside this trip

router.post('/vote', function (req, res) {
    let { vote, user_id, trip_id, place_id } = req.body;
    user_id = req.headers.verifiedUserId;

    const queryingTripFriendId = tripFriendQueryModel.getTripFriendId(trip_id, user_id);
    queryingTripFriendId
        .then(function (response) {
            const { trip_friend_id } = Object.assign({}, response[0]);
            return voteQueryModel.castVote({ trip_friend_id, place_id, vote });
        })
        .then(function (voteId) {
            // console.log(voteId);
            res.json({ insertedId: voteId });
        })
        .catch(function (err) {
            res.status(500).end(`Unable to get cast vote due to ${err.message}`);
            console.log(err);
        });
});

router.delete('/vote', function (req, res) {
    const toDelete = req.body.vote;

    // Delete from mySQL using knex
    const deletion = voteQueryModel.deleteVote(toDelete);

    // Construct response after deletion
    deletion
        .then(function (returnObject) {
            res.json({ "deletedId": returnObject });
        });
});

// Get the votes for the chosen location
router.get('/vote/location/:locationId', function (req, res) {
    const votes = voteQueryModel.getVotes({ trip_place_id: req.params.locationId });

    votes
        .then(function (queryResponse) {
            res.json(queryResponse);
        })
        .catch(function (err) {
            res.status(500).end('Unable to get votes for location');
            console.log(err);
        });
});

// Get locations to vote for the trip
router.get('/:tripId/vote', function (req, res) {
    const params = Object.assign({}, req.params, req.query);
    params.userId = req.headers.verifiedUserId;
    let places = voteQueryModel.getPlacesToVote(params);

    places
        .then(function (queryResponse) {
            res.json(queryResponse);
        })
        .catch(function (err) {
            res.status(500).end(`Unable to get places to vote due to ${err.message}`);
            console.log(err);
        });
});

// Get locations sorted by votes
router.get('/:tripId/vote/results', function (req, res) {
    const votingResults = voteQueryModel.getVotingResults(req.params.tripId);

    votingResults
        .then(function (queryResponse) {
            res.json(queryResponse);
        })
        .catch(function (err) {
            res.status(500).end(`Unable to get voting results due to ${err.message}`);
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

// View the locations in the trip.
router.get('/locations', function (req, res) {
    const tripLocations = tripPlaceQueryModel.getLocationsInTrip(req.body.trip);

    tripLocations
        .then(function (queryResponse) {
            res.json({
                "location_ids": _.map(queryResponse, pair => pair['place_id'])
            });
        })
        .catch(function (err) {
            res.status(500).end('Unable to get trip locations');
            console.log(err);
        });
});

// Add a location to this trip.
router.post('/locations', function (req, res) {
    const insert = tripPlaceQueryModel.addLocationToTrip(req.body.trip);

    insert
        .then(function (insertionResponse) {
            res.json({ "inserted": insertionResponse });
        })
        .catch(function (err) {
            console.log(JSON.stringify(err));
            res.status(500).end('Unable to insert trip locations');
        });
});

// Delete a location from this trip.
router.delete('/locations/:tripPlaceId', function (req, res) {
    const deleteLocation = tripPlaceQueryModel.deleteLocationFromTrip(req.params.tripPlaceId);

    deleteLocation
        .then(function (deletionResponse) {
            res.json({ "deleted": deletionResponse });
        })
        .catch(function (err) {
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
        .then(function (queryResponse) {
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
