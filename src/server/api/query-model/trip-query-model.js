const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class TripQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);
        
        this.validFilters = ['trip_id'];
        this.nonInsertableProps = ['trip_id'];
        this.tableName = 'Trip';
        this.selectableProps = []
        
        this.userMutable = false;
    }

    // Get all the locations in this particular trip
    getTrip (tripParticulars) {

    }

    // Add a location to this trip
    addTrip (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);

        return knex(this.tableName)
            .insert(toInsert);
    }

    // Delete a location from this trip
    deleteLocationFromTrip (locationParticulars) {

    }

    // Get the top locations in this particular trip (in order)
    getTopLocationInTrip (tripParticulars) {

    }
}

module.exports = TripQueryModel;