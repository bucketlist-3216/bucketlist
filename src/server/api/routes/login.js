const express = require('express');
const validateRequest = require('../validate');
const settings = require('../../config/settings.js');
const { UserQueryModel } = require('../query-models');
const userQueryModel = new UserQueryModel();
const { TripFriendQueryModel } = require('../query-models');
const tripFriendQueryModel = new TripFriendQueryModel();
const verify = require('../auth/verify');
const jwt = require('jsonwebtoken');
const loginSecrets = require('../../../../config/login_secrets.json');

// Login API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}


/**************** Login end points ****************/

/***
 * Post user data
 */
router.post('/', function (req, res) {
    // body parameter is of the form: {userData: {email, username, token, platform}}
    const userData = req.body.userData;
    const { email, username, name, token, platform } = userData;
    const gettingUser = userQueryModel.getUser({ email });
    const gettingPlatformId = verify({ token, platform });
    const oldUserPlatform = req.headers.platform;
    console.log("Old user Platform: ", oldUserPlatform);

    Promise.all([gettingUser, gettingPlatformId])
        .then(function (result) {
            let [users, platformId] = result;
            // users is an array of length 0 or 1

            if (users.length == 0) {
            // User does not exist
                return userQueryModel.addUser({
                    email,
                    name,
                    [`${platform}_id`]: platformId
                });
            }

            const user = Object.assign({}, users[0]);
            const userId = user.user_id;
            if (!users[`${platform}_id`]) {
                return userQueryModel.updateUser(
                    { user_id: userId },
                    { [`${platform}_id`]: platformId }
                )
                    .then(function (updatedId) {
                        return [userId];
                    })
                    .catch(function (err) {
                        throw err;
                    });
            }

            return [userId];
        })
        .then(function (userId) {
            if (oldUserPlatform==='jwt') {
                let gettingVerifiedUserId = verify(req.headers);
                gettingVerifiedUserId.then(function (oldUserId) {
                    console.log("Updating user ID ", oldUserId, " to ", userId[0]);
                    tripFriendQueryModel.changeTripFriendUserId(oldUserId, userId[0]).then(() =>
                        userQueryModel.deleteUser(oldUserId).return().catch(
                            (err) => {
                                console.log("Unable to delete old user ID " + oldUserId);
                                console.log(err);
                        })
                    );
                })
                .catch(function (err) {
                    res.status(401).end(`Unable to authenticate old user token due to ${err.message}`);
                    console.log(err);
                });
            }
            res.json({"insertedId": userId, "userId": userId});
        })
        .catch(function (err) {
            res.status(500).end('Unable to login due to', err);
            console.log(err);
        });
});

// When the user clicks sign in as guest
router.post('/guest', function (req, res) {
    // Add a user to table with temporary as true
    let toAdd = {
        "name": "_GUEST_USER",
        "temporary": true
    };

    userQueryModel
        .addUser(toAdd, true)
        .then(userId => {
            userId = userId[0]

            // Get JWT token
            let token =  jwt.sign({ "userId": userId }, loginSecrets.jwtSecret, { expiresIn: '7d' });

            return {
                token: token,
                userId: userId
            };
        })
        .then(token => {
            // Send JWT token back to the user
            // res.setHeader('userId', token.userId)
            res.json({ "success": true, "message": "Signed in as guest", "token": token.token, userId: token.userId});
        })
        .catch(err => {
            console.log('Error caught: ', err);
        });
});

// When the user signs in after doing some stuff as a guest
router.put('/guest', function (req, res) {
    // insert new login details into the table 

    // change temporary to false
})

module.exports = router;
