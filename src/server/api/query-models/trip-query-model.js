const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class TripQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);

        this.validFilters = ['trip_id'];
        this.nonInsertableProps = ['trip_id'];
        this.tableName = 'Trip';
        this.selectableProps = ['trip_id', 'destination', 'start_date', 'end_date', 'invite_extension'];
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
    deleteTrip (filter) {
        return knex(this.tableName)
            .where(filters)
            .del();
    }

    updateTrip (id, newObject) {
        newObject = _.omit(newObject, this.nonInsertableProps);
        return knex(this.tableName)
            .where({'trip_id': id})
            .update(newObject);
    }

    // Get trip by invite link
    getTripInvite (inviteLink) {
        return knex(this.tableName)
            .where({'invite_extension': inviteLink})
    }

}

module.exports = TripQueryModel;
