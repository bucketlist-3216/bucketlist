const express = require('express');

const verify = require('./verify');
const { UserQueryModel } = require('../query-models');
const userQueryModel = new UserQueryModel();

module.exports = (req, res, next) => {
  if (req.path === '/login') {
    next();
  } else if (!req.headers.token) {
    res.status(401).end('User not logged in');
  } else {
    const { token, platform } = req.headers;
    verify({ token, platform })
        .then(function (platformId) {
            return userQueryModel.getUserId({ [`${platform}_id`]: platformId });
        })
        .then(function (results) {
            const userId = results[0].user_id;
            req.headers.verifiedUserId = userId;
            next();
        })
        .catch(function(err) {
            res.status(500).end(`Unable to authenticate user due to ${err.message}`);
            console.log(err);
        });
  }
};
