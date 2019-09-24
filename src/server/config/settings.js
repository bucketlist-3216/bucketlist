const configFolder = `${__dirname}/../../../config/ssl_cert/`;
const fs = require('fs');

module.exports = {
    "port": 3001,
    "listedKeys": [
        "sampleKey1",
        "sampleKey2",
        "sampleKey3"
    ],
    "validate": false,
    "database": {
        "host": "127.0.0.1",
        "user": "root",
        "password": "sureNUS",
        "database": "bucketlist"
    }
};
