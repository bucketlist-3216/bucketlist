const EntityQueryModel = require('./entity');
const UserQueryModel = require('./user-query-model');
const { knex } = require('../../database');
const _ = require('underscore');

class VotesQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);
        this.validFilters = ['swipe_id'];
        this.selectableProps = []
        this.nonInsertableProps = ['swipe_id'];
        this.userMutable = false
        this.tableName = 'Swipe';
    }

    // Get the votes for the matching location entry
    getVotesForLocation(filters) {
        // Get place id 
        const place_id = "";

        return knex(this.tableName)
            .where({"trip_place_id": place_id});
    }

    // Cast a vote for a location
    castVote(vote) {
        vote = _.omit(vote, this.nonInsertableProps);

        return knex(this.tableName)
            .insert(vote);
    }

    // Add a 
    addVoteToLocationQuery(locationParticulars) {

    }
}

module.exports = VotesQueryModel;