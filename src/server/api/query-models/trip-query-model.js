const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class TripQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);
        
        this.validFilters = ['trip_id'];
        this.nonInsertableProps = ['trip_id'];
        this.tableName = 'Trip';
        this.selectableProps = ['trip_id', 'destination', 'start_date', 'end_date'];
        this.userMutable = false;
    }

    // This shouldn't be here right? Isn't this covered under TripPlace?
    // Get all the locations in this particular trip
    getTrip (tripParticulars) {

    }

    // Add a location to this trip
    addTrip (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);
        toInsert = _.pick(toInsert, this.selectableProps);

        return knex(this.tableName)
            .insert(toInsert);
    }

    // Delete a trip entirely
    deleteTrip (filter) {
        return knex(this.tableName)
            .where(filters)
            .del();
    }

    updateTrip (id, newObject) {
        newObject = _.omit(this.nonInsertableProps);
        
        return knex(this.tableName)
            .where({'trip_id': id})
            .update(newObject);
    }

}

module.exports = TripQueryModel;