const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');
const PlaceImageQueryModel = require('./place-image-query-model');

class PlaceQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);

        this.validFilters = ['name', 'type'];
        this.selectableProps = [];
        this.nonInsertableProps = ['place_id'];
        this.tableName = 'Place_Curated';

				this.userMutable = false;
				
				this.placeImageQueryModel = new PlaceImageQueryModel();
    }

    getPlaceData(placeId) {
			let that = this;
			return this.placeImageQueryModel
				.getPlaceImage(placeId)
				.then(res => 
					_.map(res, r => 
						that.placeImageQueryModel.augmentUrlWithBucket(r.image_link)
					)
				)
				.then(r => {
					return new Promise((resolve, reject) => {
						knex
							.select(this.selectableProps)
							.from(this.tableName)
							.where({ place_id: placeId })
							.then(res => res[0])
							.then(res => {
								res = {
									images: r || [],
									place_id: res.place_id,
									name: res.name,
									longitude: res.longitude || "",
									latitude: res.latitude || "",
									desc: res.description || "",
									price: res.price || "",
									category: res.type || "",
									number: res.number || "",
									location: res.address || ""
								};
								
								resolve(res)
							});
					});
				});
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
