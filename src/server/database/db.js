const mysql = require('mysql');
const config = require('../config/settings');

const knex = require('knex')({
    client: 'mysql',
    connection: config.database
});

module.exports = {
    knex
};
