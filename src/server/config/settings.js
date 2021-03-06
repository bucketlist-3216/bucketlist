const configFolder = `${__dirname}/../../../config/`;
const fs = require('fs');
const mysqlUser = require(`${configFolder}/mysql_user.json`);
const process = require('process');

module.exports = {
    "port": 3001,
    "listedKeys": [
        "sampleKey1",
        "sampleKey2",
        "sampleKey3"
    ],
    "validate": false,
    "database1": {
        "host": "35.186.146.32",
        "user": "bucketlist",
        "password": mysqlUser.password,
        "database": "bucketlist",
        "ssl": {
          "key": fs.readFileSync(`${configFolder}/ssl_cert/client-key.pem`),
          "cert": fs.readFileSync(`${configFolder}/ssl_cert/client-cert.pem`),
          "ca": fs.readFileSync(`${configFolder}/ssl_cert/server-ca.pem`)
        }
    },
    "database": {
        "host": "bucketlist.c3xvacxs1afc.ap-southeast-1.rds.amazonaws.com",
        "user": "bucketlist",
        "password": mysqlUser.password,
        "database": "bucketlist"
    },
    "aws": {
        "accessKeyId": process.env.accessKeyId,
        "secretAccessKey": process.env.secretAccessKey
    }
};
