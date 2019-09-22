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

    }

    // Add a location to this trip
    addTripFriend (toInsert) {
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

module.exports = TripFriendQueryModel;