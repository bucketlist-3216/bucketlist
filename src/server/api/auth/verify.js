// For Google Login authentication
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// For Facebook Login authentication
const request = require('request-promise');

module.exports = ({ token, platform }) => {
    if (platform === 'google') {
        const ticket = client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
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
                &access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
        };

        return request(options)
            .then(response => {
                response = JSON.parse(response);
                if (response.data.app_id !== process.env.FACEBOOK_APP_ID) {
                    throw new Error("Unauthorized");// res.status(401).end('Unauthorized');
                }
                return response.data.user_id;
            })
            .catch((error) => {
                throw error;
            });
    }
    // TODO: get user email from token
};
