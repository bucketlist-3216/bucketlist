const mysql = require('mysql');
const config = require('../config/settings');

const knex = require('knex')({
    client: 'mysql',
    connection: config.database,
    pool: { min: 0, max: 10 }
});

module.exports = {
    knex
};
