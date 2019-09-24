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

    // Create a new trip
    addTrip (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);
        toInsert = _.pick(toInsert, this.selectableProps);

        return knex(this.tableName)
            .insert(toInsert);
    }

    // Delete a trip entirely
    deleteTrip (filter) {
        filters = _.pick(filters, this.validFilters);
        return knex(this.tableName)
            .where(filters)
            .del();
    }

    // Update the particulars of  a trip
    updateTrip (toUpdate) {
        const data = _.omit(toUpdate, this.nonInsertableProps);
        const filters = _.pick(toUpdate, this.validFilters);
        return knex(this.tableName)
            .where(filters)
            .update(data);
    }
}

module.exports = TripQueryModel;
