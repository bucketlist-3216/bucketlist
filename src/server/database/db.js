const mysql = require('mysql');

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
        return queryString;
    }

    query(queryString) {
        this.connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
            if (err) throw err
          
            console.log('The solution is: ', rows[0].solution)
          })
    }

    close() {
        this.connection.end();
    }
}

module.exports = DBClient;