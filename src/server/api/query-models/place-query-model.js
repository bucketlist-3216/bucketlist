const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class PlaceQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);

        this.validFilters = ['name', 'type'];
        this.selectableProps = [];
        this.nonInsertableProps = ['place_id'];
        this.tableName = 'Place';

        this.userMutable = false;
    }

    getPlaceData(placeId) {
      return knex
          .select(this.selectableProps)
          .from(this.tableName)
          .where({ place_id: placeId });
    }

    getMatchingPlaces(filters) {
        filters = _.pick(filters, this.validFilters);

        return knex
            .select(this.selectableProps)
            .from(this.tableName)
            .where(filters);
    }

    getPlacesByCity(cityName) {
        return knex
            .select(this.selectableProps)
            .from(this.tableName)
            .where({"city": cityName});
    }

    insertPlace(toInsert) {
        toInsert = _.omit(toInsert, this.nonInsertableProps);

        return knex(this.tableName)
            .insert(toInsert);
    }

    deletePlace(toDelete) {
        return knex(this.tableName)
            .where({"place_id": toDelete})
            .del();
    }

    searchPlace(toSearch) {
        return knex(this.tableName)
            .select(this.selectableProps)
            .where('description', 'like', '%' + toSearch + '%');
    }
}

module.exports = PlaceQueryModel;
