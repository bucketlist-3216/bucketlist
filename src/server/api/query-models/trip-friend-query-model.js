const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class TripFriendQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);
        
        this.validFilters = ['trip_friend_id'];
        this.nonInsertableProps = ['trip_friend_id'];
        this.tableName = 'Trip_Friend';
        this.selectableProps = []
        
        this.userMutable = false;
    }

    // Get all the locations in this particular trip
    getTripFriends (tripParticulars) {
        return knex(this.tableName)
            .select(this.selectableProps)
            .where({trip_id: tripParticulars['trip_id']});
    }

    // Add a location to this trip
    addTripFriend (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);

        return knex(this.tableName)
            .insert(toInsert);
    }

    deleteTripFriend (filter) {
        filter = _.omit(filter, ['trip_friend_id']);
        
        return knex(this.tableName)
            .where(filter)
            .del();
    }

    // This shouldn't be here right? Isn't this covered by trip-place model?
    // Delete a location from this trip
    deleteLocationFromTrip (locationParticulars) {

    }

    // This shouldn't be here right? Isn't this covered by trip-place model?
    // Get the top locations in this particular trip (in order)
    getTopLocationInTrip (tripParticulars) {

    }
}

module.exports = TripFriendQueryModel;