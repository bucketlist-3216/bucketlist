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
        return knex(this.tableName)
            .select(this.selectableProps)
            .where(filters);
    }

    // Cast a vote for a location
    castVote(vote) {
        vote = _.omit(vote, this.nonInsertableProps);
        const filter = {
            "trip_place_id": vote['trip_place_id'],
            "trip_friend_id": vote['trip_friend_id']
        };

        // Delete any older votes for the same thing
        const deleteOldVotes = 
            knex(this.tableName)
            .where(filter)
            .del();
        
        // TODO: Logic is flawed here. Need to fix this
        let that = this;
        return deleteOldVotes
            .then(function (afterDeletion) {
                // Now you can cast new vote (since the type of vote might be different)
                return knex(that.tableName).insert(vote);
            })
            .catch(function (err) {
                throw err;
            });
    }

    // Add a 
    addVoteToLocationQuery(locationParticulars) {

    }
}

module.exports = VotesQueryModel;