const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json')

const computeResource = new Compute();

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
router.post('/profile', function(req, res) {
    res.end();
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