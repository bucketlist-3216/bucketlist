const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../validate');
const settings = require('../../config/settings.js');
const {
    UserQueryModel,
    TripFriendQueryModel
} = require('../query-models')

const computeResource = new Compute();
const userQueryModel = new UserQueryModel();
const tripFriendQueryModel = new TripFriendQueryModel();

// User API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** User end points ****************/

// Dont know what end points we need here. Leaving blank for now.

/***
 * Post user profile
 */
router.post('/', function(req, res) {
    const insertion = userQueryModel.addUser(req.body.user);

    insertion.then(function (insertionResponse) {
        res.end(JSON.stringify({"insertedId": insertionResponse}));
    });
});


/***
 * Get user profile
 */
router.get('/:userId', function(req, res) {
    const userProfile = userQueryModel.getUser({user_id: req.params.userId});

    userProfile
        .then(function (response) {
            res.json(response);
        })
        .catch(function (err) {
            res.status(500).end(`Could not get user because of the following error: ${err.message}`);
            console.log(err);
        });
});

/***
 * Edit user profile
 */
router.put('/profile', function(req, res) {
    res.end();
});

/***
 * Remove user
 */
router.delete('/', function(req, res) {
    res.end();
});

/**************** User trips end points ****************/

/***
 * Get user's trips
 */
router.get('/:userId/trips', function (req, res) {
  const trips = tripFriendQueryModel.getUserTrips(req.params.userId);

  trips
      .then(function(queryResponse) {
          res.json(queryResponse);
      })
      .catch(function(err) {
          res.status(500).end(`Unable to get user's trips because of the following error: ${err.message}`);
          console.log(err);
      });
});


module.exports = router;
