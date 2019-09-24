const EntityQueryModel = require('./entity');
const UserQueryModel = require('./user-query-model');
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
        this.userQueryModel = new UserQueryModel();
    }

    // Get all the members in this particular trip
    getTripFriends (tripParticulars) {
        return knex(this.tableName)
            .select(this.selectableProps)
            .where({trip_id: tripParticulars['trip_id']});
    }

    // Add a member to this trip by their email
    addTripFriend (toInsertEmail, tripId) {
        // Get the user's ID
        let tableName = this.tableName;
        return this.userQueryModel.getUserId(toInsertEmail)
            .then(function (userId) {
                return knex(tableName)
                    .insert({
                        "user_id": userId[0]['user_id'],
                        "trip_id": tripId
                    });
            });
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