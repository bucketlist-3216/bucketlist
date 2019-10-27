const EntityQueryModel = require('./entity');
const { knex } = require('../../database');
const _ = require('underscore');

class PlaceImageQueryModel extends EntityQueryModel {

    constructor(dbClient) {
        super(dbClient);

        this.validFilters = ['place_id'];
        this.selectableProps = ['place_id', 'image_link'];
        this.nonInsertableProps = ['place_image_id'];
        this.tableName = 'Place_Image';
        this.bucketUrl = 'https://storage.googleapis.com/place-image-bucket/';
        this.s3Url = 'https://place-image.s3-ap-southeast-1.amazonaws.com/';

        this.userMutable = false;
    }

    augmentUrlWithBucket(objectName) {
        return this.s3Url + objectName;
    }

    getPlaceImage(placeId) {
      return knex
          .select(this.selectableProps)
          .from(this.tableName)
          .where({ place_id: placeId });
    }
}

module.exports = PlaceImageQueryModel;
