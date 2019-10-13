const express = require('express');

const verify = require('./verify');
const { UserQueryModel } = require('../query-models');
const userQueryModel = new UserQueryModel();

module.exports = (req, res, next) => {
  if (req.path === '/login' || req.path === '/login/guest') {
    next();
  } else {
    const { token, platform } = req.headers;
    const gettingVerifiedUserId = verify({ token, platform });

    if (platform === 'jwt') {
        let userId = gettingVerifiedUserId;
        console.log(userId);
        req.headers.verifiedUserId = userId;
        next();
    } else {
      if (!gettingVerifiedUserId) {
        res.status(401).end('User not logged in');
      } else {
        gettingVerifiedUserId
          .then(function (platformId) {
              return userQueryModel.getUserId({ [`${platform}_id`]: platformId });
          })
          .then(function (results) {
              const userId = results[0].user_id;
              req.headers.verifiedUserId = userId;
              next();
          })
          .catch(function(err) {
              res.status(401).end(`Unable to authenticate user due to ${err.message}`);
              console.log(err);
          });
      }
    }
  }
};
