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

    // This shouldn't be here right? Isn't this covered under TripPlace?
    // Get all the locations in this particular trip
    getTrip (tripParticulars) {

    }

    // Add a location to this trip
    addTrip (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);

        return knex(this.tableName)
            .insert(toInsert);
    }

    // Delete a trip entirely
    deleteTrip (filter) {
        return knex(this.tableName)
            .where(filters)
            .del();
    }

}

module.exports = TripQueryModel;