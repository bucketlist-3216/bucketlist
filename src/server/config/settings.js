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
        "host": "35.186.146.32",
        "user": "bucketlist",
        "password": "INSERT-PASSWORD-HERE",
        "database": "bucketlist",
        "ssl": {
          "key": fs.readFileSync(`${configFolder}/client-key.pem`),
          "cert": fs.readFileSync(`${configFolder}/client-cert.pem`),
          "ca": fs.readFileSync(`${configFolder}/server-ca.pem`)
        }
    }
};
