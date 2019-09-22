const EntityQueryModel = require('./entity');
const VotingQueryModel = require('./votes-query-model');
const { knex } = require('../../database');
const _ = require('underscore');

class TripPlaceQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);
        
        this.validFilters = ['trip_place_id'];
        this.nonInsertableProps = ['trip_place_id'];
        this.tableName = 'Trip_Place';
        this.selectableProps = ['place_id', 'trip_id']
        
        this.userMutable = false
        this.votingQueryModel = new VotingQueryModel();
    }

    // Get all the locations in this particular trip
    getLocationsInTrip (tripParticulars) {
        const tripId = tripParticulars['trip_id'];

        let that = this;
        return knex(this.tableName)
            .select(this.selectableProps)
            .where({"trip_id": tripId});
    }

    // Add a location to this trip
    addLocationToTrip (toInsert) {
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

module.exports = TripPlaceQueryModel;