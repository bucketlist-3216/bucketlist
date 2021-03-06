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
        this.selectableProps = ['trip_friend_id', 'trip_id', 'user_id', 'is_admin'];

        this.userMutable = false;
        this.tripQueryModel = new TripQueryModel();
        this.userQueryModel = new UserQueryModel();
    }

    // Get all the members in this particular trip
    getTripFriends (tripId, userId) {
        const tripFriendProperties = this.selectableProps.filter((element) => element !== 'trip_id' && element !== 'user_id');
        const userProperties = this.userQueryModel.selectableProps.filter((element) => element !== 'user_id');
        const isSelf = knex.raw(`${this.tableName}.user_id = ${userId} as is_self`);
        const selectedColumns = tripFriendProperties.concat(
            userProperties,
            [`${this.tableName}.trip_friend_id`],
            [isSelf]);
        return knex
            .select(selectedColumns)
            .from(this.tableName)
            .innerJoin(this.userQueryModel.tableName, `${this.userQueryModel.tableName}.user_id`, '=', `${this.tableName}.user_id`)
            .where({ trip_id: tripId })
            .orderBy('is_self', 'desc');
    }


    getTripFriendId (trip_id, user_id) {
        return knex(this.tableName)
            .select('trip_friend_id')
            .where({ trip_id, user_id });
    }

    // Add a member to this trip by their email
    addTripFriend ({user_id, trip_id}) {
        return knex(this.tableName)
            .insert({
                user_id,
                trip_id,
                is_admin: 0
            });
    }

    deleteTripFriend (filter) {
        filter = _.omit(filter, ['trip_friend_id']);

        return knex(this.tableName)
            .where(filter)
            .del();
    }

    changeTripFriendUserId(oldId, newId) {
        return knex(this.tableName)
            .where({user_id: oldId})
            .update({user_id: newId});
    }

    // Get all the locations in this particular trip
    getUserTrips (userId) {
        let tripProperties = this.tripQueryModel.selectableProps.map((element) => this.tripQueryModel.tableName + '.' + element);
        let userProperties = this.userQueryModel.selectableProps.map((element) => this.userQueryModel.tableName + '.' + element);

        let selectedColumns = tripProperties.concat(userProperties);

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
