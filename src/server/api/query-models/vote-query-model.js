const EntityQueryModel = require('./entity');
const TripQueryModel = require('./trip-query-model');
const TripFriendQueryModel = require('./trip-friend-query-model');
const PlaceQueryModel = require('./place-query-model');
const { knex } = require('../../database');
const _ = require('underscore');

class VoteQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);
        this.validFilters = ['swipe_id'];
        this.selectableProps = []
        this.nonInsertableProps = ['swipe_id'];
        this.userMutable = false
        this.tableName = 'Swipe';

        this.tripQueryModel = new TripQueryModel();
        this.tripFriendQueryModel = new TripFriendQueryModel();
        this.placeQueryModel = new PlaceQueryModel();
    }

    // Get the votes for the matching location entry
    getVotesForLocation(filters) {
        return knex(this.tableName)
            .select(this.selectableProps)
            .where(filters);
    }

    getPlacesToVote({tripId, userId, limit = 100}) {
      console.log(userId, tripId);
        return knex
            .select([`${this.placeQueryModel.tableName}.place_id`, 'name', 'city', 'image_link'])
            .from(this.placeQueryModel.tableName)
            .innerJoin(this.tripQueryModel.tableName, `${this.tripQueryModel.tableName}.destination`, '=', `${this.placeQueryModel.tableName}.city`)
            .where({trip_id: tripId})
            .whereNot({image_link: ''})
            .whereNotExists(knex
                .from(this.tableName)
                .innerJoin(this.tripFriendQueryModel.tableName, `${this.tripFriendQueryModel.tableName}.trip_friend_id`, '=', `${this.tableName}.trip_friend_id`)
                .where({user_id: userId, trip_id: tripId})
                .whereRaw(`${this.tableName}.place_id = ${this.placeQueryModel.tableName}.place_id`)
            )
            .limit(limit);
    }

    // Cast a vote for a location
    castVote(vote) {
        console.log(vote);

        vote = _.omit(vote, this.nonInsertableProps);
        const filter = {
            "place_id": vote['place_id'],
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
        let selectedColumns = [`${this.tableName}.place_id`, 'name', 'address', 'image_link', 'vote'];

        let queryingVotes = knex
            .select(knex.raw(`${selectedColumns.join()}, count(*) as count`))
            .from(this.tableName)
            .innerJoin(this.tripFriendQueryModel.tableName, `${this.tripFriendQueryModel.tableName}.trip_friend_id`, '=', `${this.tableName}.trip_friend_id`)
            .innerJoin(this.placeQueryModel.tableName, `${this.placeQueryModel.tableName}.place_id`, '=', `${this.tableName}.place_id`)
            .where({trip_id: tripId})
            .groupBy(...selectedColumns);

        return queryingVotes
            .then(function (results) {
                let votingResults = {};

                results.forEach(function (row) {
                    row = Object.assign({}, row);

                    let placeId = row.place_id;
                    let vote = row.vote;
                    let count = row.count;

                    if (!votingResults[placeId]) {
                        votingResults[placeId] = _.omit(row, ['vote', 'count']);
                        votingResults[placeId].voteCount = {
                            LIKE: 0,
                            DISLIKE: 0
                        };
                    }
                    votingResults[placeId].voteCount[vote] += count;
                });

                let array = Object.values(votingResults);
                return array.sort(function (a, b) {
                    if (b.voteCount.LIKE != a.voteCount.LIKE) {
                        return b.voteCount.LIKE - a.voteCount.LIKE;
                    } else {
                        return a.voteCount.DISLIKE - b.voteCount.DISLIKE;
                    }
                });
            })
            .catch(function (err) {
                throw err;
            });
    }
}

module.exports = VoteQueryModel;