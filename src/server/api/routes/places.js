const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json');
const PlaceQueryModel = require('../query-model/places-query-model'); 
const _ = require('underscore');

const computeResource = new Compute();
const placeQueryModel = new PlaceQueryModel();

// Locations API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Update Places Store  ****************/

// Get place from database
router.get('/store', function (req, res) {
    // Query mySQL using knex
    const query = placeQueryModel.getMatchingPlaces(req.body.filters);

    // Construct response using mySQL data
    // TODO: Error handling to be done here.
    query
        .then(function (places) {
            res.end('This is the response: ' + JSON.stringify(places));
        })
        .catch(function (err) {
            throw new Error('Error querying server');
        });
});

// Insert a location into database
router.post('/store', function(req, res) {
    const toInsert = req.body.location;

    // Insert into mySQL using knex
    const insertion = placeQueryModel.insertPlace(toInsert);

    // Construct response after insertion
    insertion
        .then(function (returnObject) {
            res.end('Return object was ', JSON.stringify(returnObject));
        });
});

router.delete('/store', function(req, res) {
    const toDelete = req.body.location;

    // Delete from mySQL using knex
    const deletion = placeQueryModel.deletePlace(toDelete);

    // Construct response after deletion
    deletion
        .then(function (returnObject) {
            res.end('Return object was ', JSON.stringify(returnObject));
        });
});

/**************** Place Search APIs  ****************/

// TODO: Temporarily not needed?
router.get('/search', function (req, res) {
    console.log('Search for a location based on params');
});

module.exports = router;