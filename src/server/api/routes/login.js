const express = require('express');
const validateRequest = require('../validate');
const settings = require('../../config/settings.js');
const { UserQueryModel } = require('../query-models');
const userQueryModel = new UserQueryModel();
const verify = require('../auth/verify');

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
    const { email, username, token, platform } = userData;
    const gettingUser = userQueryModel.getUser({ email });
    const gettingPlatformId = verify({ token, platform });

    Promise.all([gettingUser, gettingPlatformId])
        .then(function (result) {
            let [users, platformId] = result;
            // users is an array of length 0 or 1

            if (users.length == 0) {
            // User does not exist
                return userQueryModel.addUser({
                    email,
                    username,
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
            res.json({"insertedId": userId});
        })
        .catch(function (err) {
            res.status(500).end('Unable to login due to', err);
            console.log(err);
        });
});

module.exports = router;
