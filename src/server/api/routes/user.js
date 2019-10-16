const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../validate');
const settings = require('../../config/settings.js');
const {
    UserQueryModel,
    TripFriendQueryModel
} = require('../query-models')

const userQueryModel = new UserQueryModel();

// User API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** User end points ****************/

router.post('/', addUserHandler);
router.get('/:userId', getUserHandler);
router.put('/:userId', updateUserHandler);
router.delete('/:userId', deleteUserHandler);

/*********** Implement Request Handlers **********/

function addUserHandler(req, res) {
    const insertion = userQueryModel.addUser(req.body.user);

    insertion.then(function (insertionResponse) {
        res.end(JSON.stringify({"insertedId": insertionResponse}));
    });
}

function getUserHandler(req, res) {
    const userProfile = userQueryModel.getUser({user_id: req.params.userId});

    userProfile
        .then(function (response) {
            res.json(response);
        })
        .catch(function (err) {
            res.status(500).end(`Could not get user because of the following error: ${err.message}`);
            console.log(err);
        });
}

// TODO: Implement this operation
function updateUserHandler(req, res) {
    res.end();
}

// TODO: Implement this operation
function deleteUserHandler(req, res) {
    res.end();
}

module.exports = router;
