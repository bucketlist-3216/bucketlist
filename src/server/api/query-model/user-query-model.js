const EntityQueryModel = require('./entity');
const _ = require('underscore');

class UserQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);
        this.validFilters = ['place_id'];
        this.selectableProps = []
        this.userMutable = false
        this.tableName = 'User';
    }

}

module.exports = UserQueryModel;