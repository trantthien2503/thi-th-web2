// require("dotenv").config();

// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_POST}/${process.env.DB_DATABASE}`;

// const pool = new Pool({
//     connectionString: isProduction ? process.env.DB_DATABASE_URL : connectionString
// });

// module.exports = { pool };

var Sequelize = require("sequelize");


var url = 'postgres://postgres:postgres@localhost:5432/Web-2'
var database = new Sequelize(url);

module.exports = database;