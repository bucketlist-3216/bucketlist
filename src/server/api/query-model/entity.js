class EntityQueryModel {

    constructor (dbClient) {
        this.validfilters = [];
        this.userMutable = true;
        this.tableName = '';
        this.dbClient = dbClient;
    }
};

module.exports = EntityQueryModel;