const mysql = require('mysql');
const config = require('../config/settings');

/***
 * Database client class. This will implement mysql operations.
 */
class DBClient {
    
    constructor(dbConfig) {
        this.config = dbConfig;
        this.connection = mysql.createConnection(dbConfig);
    }

    connect() {
        this.connection.connect();
    }

    sanitize(queryString) {
        // TODO: Sanitize the query
        let sanitizedQueryString = queryString;
        return sanitizedQueryString;
    }

    /***
     * This method receives callback and executes it on the results from the query.
     */
    query(queryString, cb) {
        // TODO: Check if connection valid, else call connect() here. 
        let sanitizedQueryString = this.sanitize(queryString);

        this.connection.query(sanitizedQueryString, function (err, rows, fields) {
            if (err) throw err;
            cb(err, rows);
            console.log('The solution is: ', rows[0].solution)
          })
    }

    close() {
        this.connection.end();
    }
}

const dbClient = new DBClient(config.database);

module.exports = dbClient;