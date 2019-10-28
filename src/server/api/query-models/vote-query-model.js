const EntityQueryModel = require('./entity');
const TripQueryModel = require('./trip-query-model');
const TripFriendQueryModel = require('./trip-friend-query-model');
const PlaceQueryModel = require('./place-query-model');
const PlaceImageQueryModel = require('./place-image-query-model');
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
        this.placeImageQueryModel = new PlaceImageQueryModel();
    }

    // Get the votes for the matching location entry
    getVotesForLocation(filters) {
        return knex(this.tableName)
            .select(this.selectableProps)
            .where(filters);
    }

    getPlacesToVote({tripId, userId, placeId, limit = 20}) {
        let start = new Date();
        console.log ('Invoking SQL Interface at ', new Date());
        let query = knex
            .select([`${this.placeQueryModel.tableName}.place_id`, 'name', 'city', 'price', 'address', 'opening_hours', 'description', 'ph_number', 'type', knex.raw(`GROUP_CONCAT(image_link) as images`)])
            .from(this.placeQueryModel.tableName)
            .innerJoin(this.tripQueryModel.tableName, `${this.tripQueryModel.tableName}.destination`, '=', `${this.placeQueryModel.tableName}.city`)
            .where({trip_id: tripId})
            .whereNotExists(knex
                .from(this.tableName)
                .innerJoin(this.tripFriendQueryModel.tableName, `${this.tripFriendQueryModel.tableName}.trip_friend_id`, '=', `${this.tableName}.trip_friend_id`)
                .where({user_id: userId, trip_id: tripId})
                .whereRaw(`${this.tableName}.place_id = ${this.placeQueryModel.tableName}.place_id`)
            )
            .limit(limit)
            .innerJoin(this.placeImageQueryModel.tableName, `${this.placeImageQueryModel.tableName}.place_id`, '=', `${this.placeQueryModel.tableName}.place_id`)
            .groupBy(['place_id', 'name', 'city', 'price', 'address', 'opening_hours', 'description', 'ph_number', 'type'].map(e => `${this.placeQueryModel.tableName}.${e}`))
            .orderBy('place_id', 'asc');

        // console.log(query.toQuery());
        if (placeId || placeId == 0) {
          query = query.orWhere({place_id: placeId, trip_id: tripId}).orderByRaw(`(place_id = ${placeId}) DESC`);
        }

        let that = this;
        return query
            .then(function(unsortedPlacesToVote) {
                unsortedPlacesToVote = _.map(unsortedPlacesToVote, e => { 
                    e.images = e.images.split(',').map(link => that.placeImageQueryModel.augmentUrlWithBucket(link));
                    return e;
                })
                // console.log('Received result: ', unsortedPlacesToVote)
                console.log ('Organizing place details at ', new Date());
                
                let food = []
                let attractions = []

                food = _.filter(unsortedPlacesToVote, e => e.type === 'Food')
                attractions = _.filter(unsortedPlacesToVote, e => e.type === 'Attraction')
                
                console.log ('Returning place details at ', new Date());
                console.log('Took totally ', new Date() - start);
                return {
                    food: food,
                    attractions: attractions
                }
            });
    }

    // Cast a vote for a location
    castVote(vote) {
        // console.log(vote);

        vote = _.omit(vote, this.nonInsertableProps);
        const filter = {
            "place_id": vote['place_id'],
            "trip_friend_id": vote['trip_friend_id']
        };

        // console.log(filter);

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
        let selectedColumns = [`${this.tableName}.place_id`, 'name', 'address', 'vote'];

        let queryingVotes = knex
            .select(knex.raw(`${selectedColumns.join()}, count(*) as count`))
            .from(this.tableName)
            .innerJoin(this.tripFriendQueryModel.tableName, `${this.tripFriendQueryModel.tableName}.trip_friend_id`, '=', `${this.tableName}.trip_friend_id`)
            .innerJoin(this.placeQueryModel.tableName, `${this.placeQueryModel.tableName}.place_id`, '=', `${this.tableName}.place_id`)
            .where({trip_id: tripId})
            .groupBy(...selectedColumns);
        
        let that = this;
        return queryingVotes
            .then(function(results) {
                let place_ids = _.map(results, r => r.place_id);
                let promises = _.map(place_ids, p => that.placeImageQueryModel.getPlaceImage(p));

                return new Promise(function(resolve, reject) {
                    Promise.all(promises)
                        .then(function(images) {
                            images = _.map(images, img => img.map(i => that.placeImageQueryModel.augmentUrlWithBucket(i.image_link)));
                            _.each(images, (element, idx, list) => {
                                results[idx].image = element[0];
                            })
                            resolve(results);
                        })
                })
            })
            .then(function (results) {
                console.log('The results we see are: ', results);
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
