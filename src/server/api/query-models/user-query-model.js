const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class UserQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);
        this.validFilters = ['user_id', 'email'];
        this.nonInsertableProps = ['user_id', 'create_time'];
        this.selectableProps = ['user_id', 'username', 'email', 'google_id'];
        this.userMutable = true;
        this.tableName = 'User';
    }

    addUser (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);
        toInsert = _.pick(toInsert, this.selectableProps); // in case there are extra fields in toInsert

        return knex(this.tableName)
            .insert(toInsert);
    }

    getUserId (email) {
        return knex(this.tableName)
            .select(['user_id'])
            .where({'email': email});
    }

    getUser (filters) {
        console.log(filters);
        filters = _.pick(filters, this.validFilters);
        console.log(filters);

        return knex
            .select(this.selectableProps)
            .from(this.tableName)
            .where(filters);
    }

    updateUser (userData) {
        const filters = _.pick(userData, this.validFilters);
        const data = _.omit(userData, this.nonInsertableProps);
        console.log(userData);

        return knex(this.tableName)
            .where(filters)
            .update(data);
    }
}

module.exports = UserQueryModel;
