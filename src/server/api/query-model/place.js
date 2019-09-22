const EntityQueryModel = require('./entity');
const _ = require('underscore');

class PlaceQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);
        this.validFilters = ['name', 'type'];
        this.userMutable = false
        this.tableName = 'Place';
    }

    getMatchingModelsQuery(filters) {
        let filterKeys = Object.keys(filters);
        filterKeys = _.intersection(filterKeys, this.validFilters);

        let command = 'select * from Place';

        if (filterKeys.size == 0) {
            command = command + ';';
        } else {
            command = command + ' where ';
            _.forEach(filterKeys, k => {
                let v = filters[k];
                command = command + k + ' = \'' + v + '\' ';
            });
            command = command + ';';
        }

        return command;
    }
}

module.exports = PlaceQueryModel;