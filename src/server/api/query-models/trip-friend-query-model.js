const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

const TripQueryModel = require('./trip-query-model');
const tripQueryModel = new TripQueryModel();

const UserQueryModel = require('./user-query-model');
const userQueryModel = new UserQueryModel();

class TripFriendQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);

        this.validFilters = ['trip_friend_id'];
        this.nonInsertableProps = ['trip_friend_id'];
        this.tableName = 'Trip_Friend';
        this.selectableProps = ['trip_id', 'user_id']

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
        // filter = _.omit(filter, ['trip_friend_id']);

        return knex(this.tableName)
            .where(filter)
            .del();
    }

    // Get all the locations in this particular trip
    getUserTrips (userId) {
        return new Promise(resolve => setTimeout(resolve, 300))
            .then(function () {
                return [
                    {
                        "destination": "Sydney",
                        "start_date": "2019-11-29T16:00:00.000Z",
                        "end_date": "2019-12-07T16:00:00.000Z",
                        "trip_id": 1,
                        "members": [
                          "a@b.com",
                          "b@c.com"
                        ]
                    }
                ];
            });
        // let tripFriends = knex
        //     .select(this.selectableProps)
        //     .from(this.tableName)
        //     .where({user_id: userId});
        //
        // return tripFriends
        //   .then(function (tripFriends) {
        //       tripFriends = tripFriends.map(tripFriend => Object.assign({}, tripFriend));
        //       // to change Row object to JSON object
        //       let tripIds = tripFriends.map(tripFriend => tripFriend.trip_id);
        //       let userIds = tripFriends.map(tripFriend => tripFriend.user_id);
        //
        //       let trips = knex
        //           .select(tripQueryModel.selectableProps)
        //           .from(tripQueryModel.tableName)
        //           .whereIn('trip_id', tripIds);
        //
        //       let users = knex
        //           .select(userQueryModel.selectableProps)
        //           .from(userQueryModel.tableName)
        //           .whereIn('user_id', userIds);
        //       return Promise.all([tripFriends, trips, users])
        //   })
        //   .then(function (results) {
        //       let [tripFriends, trips, users] = results;
        //       let tripsMapping = {};
        //       trips.forEach(function (trip) {
        //           trip = Object.assign({}, trip);
        //           tripsMapping[trip.trip_id] = trip;
        //       });
        //
        //       let usersMapping = {}
        //       users.forEach(function (user) {
        //           user = Object.assign({}, user);
        //           usersMapping[user.user_id] = user;
        //       });
        //
        //       tripFriends.forEach(function(tripFriend) {
        //           let trip = tripsMapping[tripFriend.trip_id];
        //           let user = usersMapping[tripFriend.user_id];
        //           if (!trip.members) {
        //             trip.members = [];
        //           }
        //           trip.members.push(user.email);
        //       });
        //   })
        //   .catch(function (err) {
        //       throw err;
        //   });
    }

}

module.exports = TripFriendQueryModel;
