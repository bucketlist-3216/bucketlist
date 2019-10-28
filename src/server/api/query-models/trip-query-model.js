const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class TripQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);

        this.validFilters = ['trip_id'];
        this.nonInsertableProps = ['trip_id'];
        this.tableName = 'Trip';
        this.selectableProps = ['trip_id', 'destination', 'start_date', 'end_date', 'created_by'];
        this.userMutable = false;
    }

    // Get details of this trip
    getTrip (tripId) {
        return knex(this.tableName)
            .where({ trip_id : tripId });
    }

    // Add a location to this trip
    addTrip (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);
        toInsert = _.pick(toInsert, this.selectableProps);

        return knex(this.tableName)
            .insert(toInsert);
    }

    // Delete a trip entirely
    deleteTrip (verifiedUserId, tripId) {
        // Check whether this person created the trip

        return knex(this.tableName)
            .where({trip_id: tripId})
            .where({created_by: verifiedUserId})
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
