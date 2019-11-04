const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../validate');
const settings = require('../../config/settings.js')
const _ = require('underscore');
const {
    TripFriendQueryModel,
    UserQueryModel
} = require('../query-models');

/**************** Query Model Instantiation  ****************/

const tripFriendQueryModel = new TripFriendQueryModel();
const userQueryModel = new UserQueryModel();

/*********** Implement Request Handlers **********/

// Get the members of a given trip.
function getTripFriendsHandler(req, res) {
    const { tripId } = req.params;
    const userId = req.headers.verifiedUserId;
    const gettingTripFriends = tripFriendQueryModel.getTripFriends(tripId, userId);

    gettingTripFriends
        .then(function (queryResponse) {
            res.json(queryResponse);
        })
        .catch(function (err) {
            res.status(500).end('Could not get trip friends');
            console.log(err);
        })
}

// Add a member to a trip (adding a member-trip association)
function addTripFriendHandler(req, res) {
    const { tripId } = req.params;
    const { email } = req.body;
    const userNotFoundMessage = `Could not find user with email '${email}'`;
    const duplicateMessage = `User is already in this trip`;

    userQueryModel.getUserId({ email })
        .then(function (results) {
            if (results.length === 0) {
              throw new Error(userNotFoundMessage);
            } else {
              const { user_id } = results[0];
              return tripFriendQueryModel.addTripFriend({ user_id, trip_id: tripId });
            }
        })
        .then(function (insertionResponse) {
            res.json({"insertedId": insertionResponse});
        })
        .catch(function (err) {
            if (err.message === userNotFoundMessage) {
                res.status(404).end(userNotFoundMessage);
                console.log(err);
            } else if (err.errno === 1062) {
                res.status(409).end(duplicateMessage);
            } else {
                res.status(500).end('Could not add user to trip');
                console.log(JSON.stringify(err));
            }
        });
}

// Remove a member from a trip
function deleteTripFriendHandler(req, res) {
    const deleteFriend = tripFriendQueryModel.deleteTripFriend(req.params.tripFriend);

    deleteFriend
        .then(function (deletionResponse) {
            res.json({"deletedId": deletionResponse});
        })
        .catch(function (err) {
            res.status(500).end('Could not delete user from trip');
            console.log (JSON.stringify(err));
        });
}

module.exports = {
  addTripFriendHandler,
  getTripFriendsHandler,
  deleteTripFriendHandler
};
