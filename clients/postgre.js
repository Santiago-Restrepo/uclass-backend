const pg = require('pg');
const {config} = require("dotenv");
config();
var conString = process.env.URI_POSTGRESQL;
var client = new pg.Client(conString);

client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      return client.query('SELECT NOW() AS "theTime"', function(err, result) {
        console.log("Connected to Postgres: " + result.rows[0].theTime);
        if(err) {
          return console.error('error running query', err);
        } 
      });
});

module.exports = client;