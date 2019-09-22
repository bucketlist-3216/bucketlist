const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class UserQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);
        this.validFilters = ['user_id'];
        this.nonInsertableProps = ['user_id', 'create_time'];
        this.selectableProps = []
        this.userMutable = false
        this.tableName = 'User';
    }

    addUser (toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);

        return knex(this.tableName)
            .insert(toInsert);
    } 

}

module.exports = UserQueryModel;