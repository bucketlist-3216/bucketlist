const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.js');
const { PlaceQueryModel } = require('../query-models');
const _ = require('underscore');

const computeResource = new Compute();
const placeQueryModel = new PlaceQueryModel();

// Locations API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Update Places Store  ****************/

// Get place from database based on given filters
router.get('/store', function (req, res) {
    // Query mySQL using knex
    const query = placeQueryModel.getMatchingPlaces(req.body.filters);

    // Construct response using mySQL data
    // TODO: Error handling to be done here.
    query
        .then(function (places) {
            res.end(JSON.stringify({"places": places}));
        })
        .catch(function (err) {
            throw new Error('Error querying server');
        });
});

// Get place from database based on city
router.get('/city/:city', function (req, res) {
    // Query mySQL using knex
    const query = placeQueryModel.getMatchingPlaces(req.params.city);

    // Construct response using mySQL data
    // TODO: Error handling to be done here.
    query
        .then(function (places) {
            res.end(JSON.stringify({"places": places}));
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
            res.json({
                "response": returnObject
            });
        });
});

router.delete('/store/:locationId', function(req, res) {
    // Delete from mySQL using knex
    const deletion = placeQueryModel.deletePlace(req.params.locationId);

    // Construct response after deletion
    deletion
        .then(function (returnObject) {
            res.json({
                "deletedId": req.params.locationId,
                "response": returnObject
            });
        });
});

/**************** Place Search APIs  ****************/

// TODO: Temporarily not needed?
router.get('/search/:searchString', function (req, res) {
    const search = placeQueryModel.searchPlace(req.params.searchString);

    search
        .then(function (returnObject) {
            res.json({
                "searchResults": returnObject
            })
        })
});

module.exports = router;
