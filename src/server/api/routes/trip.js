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

const {
    addTripFriendHandler,
    getTripFriendsHandler,
    deleteTripFriendHandler
} = require('../handlers/trip-friend.js');

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
router.delete('/:tripId', deleteTripHandler);

/**************** Trip Friend end points ****************/

router.post('/:tripId/friends', addTripFriendHandler);
router.get('/:tripId/friends', getTripFriendsHandler);
router.delete('/:tripId/friends/:tripFriendId', deleteTripFriendHandler);

/*********** Implement Request Handlers **********/

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
        const { tripId } = req.params;
        const userId = req.headers.verifiedUserId;
        const forbiddenErrorMessage = `Failed to get trip details because user ${userId} is not inside trip ${tripId}`;

        // Check if user is in this trip
        tripFriendQueryModel.getTripFriendId(tripId, userId)
          .then(function (queryResponse) {
            console.log(queryResponse);
             if (queryResponse.length === 0) {
               throw new Error(forbiddenErrorMessage);
             }

             // If user is inside the trip retrieve trip details
             return tripQueryModel.getTrip(tripId);
          })
          .then(function (queryResponse) {
              res.json(queryResponse[0]);
          })
          .catch(function (err) {
              if (err.message === forbiddenErrorMessage) {
                res.status(403).end('User is not authorized to get trip details');
              } else {
                res.status(500).end('Unable to get trip details');
              }
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

            insertTripLink(insertedTrips[0]);

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

// Delete user's trip
function deleteTripHandler(req, res, next) {
    // Generate mySQL query to delete entry
    const user_id = req.headers.verifiedUserId;
    const trip_id = req.params.tripId;
    console.log('Parameters to delete: ', user_id, trip_id);

    // Delete user's trip by deleting user's tripFriend object
    let userTripsDeleted;
    tripFriendQueryModel.deleteTripFriend({ trip_id, user_id })
      .then(function (queryResponse) {
            console.log(queryResponse);
            userTripsDeleted = queryResponse;

            if (userTripsDeleted === 0) {
                throw new Error(`Failed to delete because user ${user_id} is not inside trip ${trip_id}`);
            }

            // Check if the trip has other users inside
            return tripFriendQueryModel.getTripFriends(trip_id, user_id);
        })
        .then(function (tripFriends) {
            // Delete trip object if it no longer has any user inside
            if (tripFriends && tripFriends.length === 0) {
                return tripQueryModel.deleteTrip(user_id, trip_id);
            }
            return null;
        })
        .then(function () {
            // Form and send response
            res.json({
              "tripToDelete": req.params.toDelete,
              "tripsDeleted": userTripsDeleted
            });
        })
        .catch(function (err) {
            res.status(500).end('Not authorized to delete this trip');
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
