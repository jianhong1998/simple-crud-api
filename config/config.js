const { parse } = require('pg-connection-string');
require('dotenv').config();

const {user: devUser, password: devPassword, database: devDatabase, host: devHost} = parse(process.env.DB_URL_DEV);
const {user: testUser, password: testPassword, database: testDatabase, host: testHost} = parse(process.env.DB_URL_TEST);
const {user: productionUser, password: productionPassword, database: productionDatabase, host: productionHost} = parse(process.env.DB_URL_PRODUCTION);

module.exports = {
  "development": {
    "username": devUser,
    "password": devPassword,
    "database": devDatabase,
    "host": devHost,
    "dialect": "postgres"
  },
  "test": {
    "username": testUser || "",
    "password": testPassword || "",
    "database": testDatabase || "",
    "host": testHost || "",
    "dialect": "postgres"
  },
  "production": {
    "username": productionUser || "",
    "password": productionPassword || "",
    "database": productionDatabase || "",
    "host": productionHost || "",
    "dialect": "postgres"
  },
}