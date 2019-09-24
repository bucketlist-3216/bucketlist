const EntityQueryModel = require('./entity');
const UserQueryModel = require('./user-query-model');
const { knex } = require('../../database');
const _ = require('underscore');

class VotesQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);
        this.validFilters = ['swipe_id', 'trip_friend_id', 'trip_place_id', 'vote'];
        this.selectableProps = ['trip_place_id', 'vote', 'trip_friend_id'];
        this.nonInsertableProps = ['swipe_id'];
        this.userMutable = false
        this.tableName = 'Swipe';
    }

    // Cast a vote for a location
    castVote(vote) {
        console.log(vote);

        vote = _.omit(vote, this.nonInsertableProps);
        const filter = {
            "trip_place_id": vote['trip_place_id'],
            "trip_friend_id": vote['trip_friend_id']
        };

        console.log(filter);

        // Delete any older votes for the same thing
        const deleteOldVotes = this.deleteVote(filter);

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

    deleteVote(filter) {
        return knex(this.tableName).where(filter).del();
    }

    getVotes(filters) {
        filters = _.pick(filters, this.validFilters);

        return knex
            .select(this.selectableProps)
            .from(this.tableName)
            .where(filters);
    }

    getVotingResults(tripId) {
        const votingResults = knex
            .select(knex.raw(`${this.tableName}.trip_place_id, vote, count(*) as count`))
            .from(this.tableName)
            .innerJoin('Trip_Place', 'Trip_Place.trip_place_id', '=', `${this.tableName}.trip_place_id`)
            .where({trip_id: tripId})
            .groupBy(`${this.tableName}.trip_place_id`, 'vote');

        return votingResults
            .then(function (votingResults) {
                let totalVotes = {};

                votingResults.forEach(function (item) {
                    item = Object.assign({}, item);

                    let tripPlaceId = item.trip_place_id;
                    let vote = item.vote;
                    let count = item.count;

                    if (!totalVotes[tripPlaceId]) {
                        totalVotes[tripPlaceId] = 0;
                    }

                    if (vote === 'DISLIKE') {
                        totalVotes[tripPlaceId] += 1/(count + 1) - 1;
                        // 1/(count + 1) instead of count so that more DISLIKEs means less addition in voting results
                        // -1 so that no DISLIKE is better than 1 DISLIKE
                        // 1/(count + 1) instead of 1/count otherwise 1 DISLIKE equals to no DISLIKE (1/1 - 1 = 0 )
                    } else {
                        totalVotes[tripPlaceId] += count;
                    }
                });

                let array = [];
                for (const tripPlaceId in totalVotes) {
                    array.push({tripPlaceId, votes: totalVotes[tripPlaceId]});
                }

                return array.sort(function (a, b) {
                    return b.votes - a.votes;
                });
            })
            .catch(function (err) {
                throw err;
            });
    }
}

module.exports = VotesQueryModel;
