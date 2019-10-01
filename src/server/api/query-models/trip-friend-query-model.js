const EntityQueryModel = require('./entity');
const UserQueryModel = require('./user-query-model');
const TripQueryModel = require('./trip-query-model');
const { knex } = require('../../database');
const _ = require('underscore');

class TripFriendQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);

        this.validFilters = ['trip_friend_id'];
        this.nonInsertableProps = ['trip_friend_id'];
        this.tableName = 'Trip_Friend';
        this.selectableProps = ['trip_friend_id', 'trip_id', 'user_id']

        this.userMutable = false;
        this.tripQueryModel = new TripQueryModel();
        this.userQueryModel = new UserQueryModel();
    }

    // Get all the members in this particular trip
    getTripFriends (trip_id) {
        return knex(this.tableName)
            .select(this.selectableProps)
            .where({ trip_id });
    }

    getTripFriendId (trip_id, user_id) {
        return knex(this.tableName)
            .select('trip_friend_id')
            .where({ trip_id, user_id });
    }

    // Add a member to this trip by their email
    addTripFriend ({ user_id, trip_id }) {
        return knex(tableName)
            .insert({
                user_id,
                trip_id
            });
    }

    deleteTripFriend (filter) {
        filter = _.omit(filter, ['trip_friend_id']);

        return knex(this.tableName)
            .where(filter)
            .del();
    }

    // Get all the locations in this particular trip
    getUserTrips (userId) {
        let tripProperties = this.tripQueryModel.selectableProps.filter((element) => element !== 'trip_id');
        let userProperties = this.userQueryModel.selectableProps.filter((element) => element !== 'user_id');

        let selectedColumns = [`${this.tableName}.trip_id`,`${this.tableName}.user_id`].concat(
            tripProperties,
            userProperties
        );

        let filteringUserTrips = knex(this.tableName)
            .where({user_id: userId});

        let queryingTrips = knex
            .select(selectedColumns)
            .from(this.tableName)
            .innerJoin(this.tripQueryModel.tableName, `${this.tripQueryModel.tableName}.trip_id`, '=', `${this.tableName}.trip_id`)
            .innerJoin(this.userQueryModel.tableName, `${this.userQueryModel.tableName}.user_id`, '=', `${this.tableName}.user_id`)
            .whereExists(filteringUserTrips.whereRaw(`${this.tripQueryModel.tableName}.trip_id = ${this.tableName}.trip_id`))
            .groupBy(...selectedColumns);

        let instance = this;
        return queryingTrips
            .then(function (results) {
                let tripResults = {};

                results.forEach(function (row) {
                    row = Object.assign({}, row);

                    let tripId = row.trip_id;

                    if (!tripResults[tripId]) {
                        tripResults[tripId] = _.omit(row, instance.userQueryModel.selectableProps);
                        tripResults[tripId].members = [];
                    }

                    if (row.user_id != userId) {
                      tripResults[tripId].members.push(_.pick(row, instance.userQueryModel.selectableProps));
                    }
                });

                let array = Object.values(tripResults);
                return array;
            })
            .catch(function (err) {
                throw err;
            });
    }
}

module.exports = TripFriendQueryModel;
