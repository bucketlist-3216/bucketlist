const express = require('express');
const Compute = require('../../compute');
const validateRequest = require('../auth');
const settings = require('../../config/settings.json');
const PlaceQueryModel = require('../query-model/place'); 
const { dbClient, QueryBuilder } = require('../../database')
const _ = require('underscore');

const computeResource = new Compute();
const placeQueryModel = new PlaceQueryModel();

// Locations API router
const router = express.Router();
if (settings.validate) {
    router.use(validateRequest);
}

/**************** Update Places Store  ****************/

/**
 * Modelling the request body as in the sample object inside for your reference while you write code.
 */
router.get('/store', function (req, res) {
    /**** Request Body Schema - remove later ****/
    const requestBodyModel = {
        filters: {
            "name": ""
        }
    };

    // Use the entity's query model to generate the command.
    let command = placeQueryModel.getMatchingModelsQuery(req.body.filters);

    // Use the database interface to run the command from here, and return data.
    dbClient.query(command, (err, row) => {
        if (err) throw err;

        let data = {
            "results": row
        };

        res.end(JSON.stringify(data));
    });
});

router.post('/store', function(req, res) {
    let command = req.body.command;

    console.log('The value of command is ', command);
    dbClient.query(command, (err, row) => {
        console.log('I received the error object', err);
        console.log('I received the row object', row);
        return {
            "status": "yayyy"
        };
    })
    console.log('Add a location to the database');
});

router.delete('/store', function(req, res) {
    console.log('Delete a location from database');
});

/**************** Place Search APIs  ****************/

router.get('/search', function (req, res) {
    console.log('Search for a location based on params');
});

module.exports = router;