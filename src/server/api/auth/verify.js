// For Google Login authentication
const loginSecrets = require('../../../../config/login_secrets.json');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(loginSecrets.google);
let jwt = require('jsonwebtoken');

// For Facebook Login authentication
const request = require('request-promise');

module.exports = ({ token, platform }) => {
    if (!token) {
        return new Promise((resolve, reject) => {
            throw new Error("No auth token provided");
        });
    }

    if (platform === 'google') {
        const ticket = client.verifyIdToken({
            idToken: token,
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
    } else if (platform === 'facebook') {
        const options = {
            method: 'GET',
            uri: `https\://graph.facebook.com/debug_token?\
                input_token=${token}\
                &access_token=${loginSecrets.facebook}|${loginSecrets.facebook_app_secret}`
        };

        return request(options)
            .then(response => {
                response = JSON.parse(response);
                if (response.data.app_id !== loginSecrets.facebook) {
                    throw new Error("Unauthorized");
                }
                return response.data.user_id;
            })
            .catch((error) => {
                throw error;
            });
    } else if (platform === 'jwt') {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        return new Promise((resolve, reject) => {
            jwt.verify(token, loginSecrets.jwtSecret, (err, payload) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Decoded to ', JSON.stringify(payload));
                    resolve(payload.userId);
                }
            });
        });
    }
};
