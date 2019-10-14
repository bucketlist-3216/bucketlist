const express = require('express');

const verify = require('./verify');
const { UserQueryModel } = require('../query-models');
const userQueryModel = new UserQueryModel();

module.exports = (req, res, next) => {
    if (req.path === '/login' || req.path === '/login/guest') {
        next();
        return;
    }

    const { token, platform } = req.headers;
    let gettingVerifiedUserId = verify({ token, platform });

    if (!gettingVerifiedUserId) {
        res.status(401).end('User not logged in');
        return;
    }

    if (platform === 'google' || platform === 'facebook') {
        gettingVerifiedUserId = gettingVerifiedUserId
            .then(function (platformId) {
                return userQueryModel.getUserId({ [`${platform}_id`]: platformId });
            })
            .then(function (results) {
                return results[0].user_id;
            });
    }

    gettingVerifiedUserId
        .then(function (userId) {
            req.headers.verifiedUserId = userId;
            next();
        })
        .catch(function (err) {
            res.status(401).end(`Unable to authenticate user due to ${err.message}`);
            console.log(err);
        });
};
