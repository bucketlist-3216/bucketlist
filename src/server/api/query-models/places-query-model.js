const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class PlaceQueryModel extends EntityQueryModel {
    
    constructor(dbClient) {
        super(dbClient);

        this.validFilters = ['name', 'type'];
        this.selectableProps = ['name', 'type', 'link_1', 'link_2', 'image_link', 'description'];
        this.nonInsertableProps = ['place_id'];
        this.tableName = 'Place';
        
        this.userMutable = false;
    }

    getMatchingPlaces(filters) {
        filters = _.pick(filters, this.validFilters);

        return knex
            .select(this.selectableProps)
            .from(this.tableName)
            .where(filters);
    }

    insertPlace(toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);

        return knex(this.tableName)
            .insert(toInsert);
    }

    deletePlace(filters) {
        return knex(this.tableName)
            .where(filters)
            .del();
    }
}

module.exports = PlaceQueryModel;