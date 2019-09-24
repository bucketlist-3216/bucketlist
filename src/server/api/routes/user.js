const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.js');
const { UserQueryModel } = require('../query-models')

const computeResource = new Compute();
const userQueryModel = new UserQueryModel();

// User API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** User end points ****************/

// Dont know what end points we need here. Leaving blank for now.

/***
 * Post user profile
 */
router.post('/', function(req, res) {
    const insertion = userQueryModel.addUser(req.body.user);

    insertion
        .then(function (insertionResponse) {
            res.end(JSON.stringify({"insertedId": insertionResponse}));
        })
        .catch(function (err) {
            res.status(500).end(`Could not create user because of the following error: ${err.message}`);
            console.log(JSON.stringify(err));
        });
});


/***
 * Get user profile
 */
router.get('/profile', function(req, res) {
    res.end();
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

module.exports = router;
