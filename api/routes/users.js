const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json')

var computeResource = new Compute();

// User API router
var router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** User end points ****************/

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