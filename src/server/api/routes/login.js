const express = require('express');
const validateRequest = require('../auth');
const settings = require('../../config/settings.js');
const {
    UserQueryModel
} = require('../query-models')

const userQueryModel = new UserQueryModel();

// For Google Login authentication
const loginSecrets = require('../../../../config/login_secrets.json');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(loginSecrets.google);

// For Facebook Login authentication
const request = require('request-promise');

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
    console.log(userData);
    const { email, username, platform } = userData;
    const gettingUser = userQueryModel.getUser({ email });
    const gettingPlatformId = verify(userData);

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
            console.log(users);
            console.log(user);
            const userId = user.user_id;
            if (!users[`${platform}_id`]) {
                return userQueryModel.updateUser({
                    user_id: userId,
                    [`${platform}_id`]: platformId
                })
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

function verify (userData) {
    if (userData.platform === 'google') {
        const ticket = client.verifyIdToken({
            idToken: userData.token,
            audience: loginSecrets.google
        });
        return ticket
            .then((response) => response.getPayload())
            .then((payload) => {
                return payload.sub;
            })
            .catch((error) => {
                throw error;
            });
    } else if (userData.platform === 'facebook') {
        const options = {
            method: 'GET',
            uri: `https\://graph.facebook.com/debug_token?\
                input_token=${userData.token}\
                &access_token=${loginSecrets.facebook}|${loginSecrets.facebook_app_secret}`
        };

        return request(options)
            .then(response => {
                response = JSON.parse(response);
                if (response.data.app_id !== loginSecrets.facebook) {
                    throw new Error("Unauthorized");// res.status(401).end('Unauthorized');
                }
                return response.data.user_id;
            })
            .catch((error) => {
                throw error;
            });
    }
    // TODO: get user email from token
}

module.exports = router;
