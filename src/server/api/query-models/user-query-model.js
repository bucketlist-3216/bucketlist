const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class UserQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);
        this.validFilters = ['user_id', 'email', 'google_id', 'facebook_id', 'temporary'];
        this.nonInsertableProps = ['user_id', 'create_time'];
        this.selectableProps = ['user_id', 'username', 'email'];
        this.userMutable = true;
        this.tableName = 'User';
    }

    addUser (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);
        toInsert = _.pick(toInsert, this.selectableProps); // in case there are extra fields in toInsert

        return knex(this.tableName)
            .insert(toInsert);
    }

    getUserId (filters) {
        filters = _.pick(filters, this.validFilters);
        return knex
            .select(['user_id'])
            .from(this.tableName)
            .where(filters);
    }

    getUser (filters) {
        filters = _.pick(filters, this.validFilters);
        return knex
            .select(this.selectableProps)
            .from(this.tableName)
            .where(filters);
    }

    updateUser (filters, data) {
        filters = _.pick(filters, this.validFilters);
        data = _.omit(data, this.nonInsertableProps);

        return knex(this.tableName)
            .where(filters)
            .update(data);
    }

    deleteUser (userId) {
        return knex(this.tableName)
            .where({user_id: userId})
            .del();
    }
}

module.exports = UserQueryModel;
