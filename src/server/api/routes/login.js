const express = require('express');
const validateRequest = require('../auth');
const {
    UserQueryModel
} = require('../query-models')

// Login API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Login end points ****************/

/***
 * Post user data
 */
router.post('/', function(req, res) {
    let userData = req.body.userData;
    let userId = userQueryModel.getUserId(userData.email);

    userId.then(function (userId) {
        if(!userId) {
            userQueryModel.addUser(userData);
        }
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
