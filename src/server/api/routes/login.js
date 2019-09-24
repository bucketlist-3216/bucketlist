const express = require('express');
const validateRequest = require('../auth');
const settings = require('../../config/settings.js');
const {
    UserQueryModel
} = require('../query-models')

const userQueryModel = new UserQueryModel();

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
    let result = userQueryModel.getUserId(userData.email);

    result.then(function (result) {
        if (result.length > 0) {
            return [result[0].user_id];
        }
        return userQueryModel.addUser(userData);
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
