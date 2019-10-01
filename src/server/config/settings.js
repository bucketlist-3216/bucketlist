const configFolder = `${__dirname}/../../../config/`;
const fs = require('fs');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

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
        "password": process.env.MYSQL_PASSWORD,
        "database": "bucketlist",
        "ssl": {
          "key": fs.readFileSync(`${configFolder}/ssl_cert/client-key.pem`),
          "cert": fs.readFileSync(`${configFolder}/ssl_cert/client-cert.pem`),
          "ca": fs.readFileSync(`${configFolder}/ssl_cert/server-ca.pem`)
        }
    }
};
