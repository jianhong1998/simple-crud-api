import { Sequelize } from 'sequelize';
const { test, development, production } = require('../../../config/config.js');

let username: string;
let password: string;
let database: string;
let host: string;

const nodeEnv = process.env.NODE_ENV || '';

switch (nodeEnv) {
    case 'test':
        username = test.username;
        password = test.password;
        database = test.database;
        host = test.host;
        break;
    case 'development':
        username = development.username;
        password = development.password;
        database = development.database;
        host = development.host;
        break;
    case 'production':
        username = production.username;
        password = production.password;
        database = production.database;
        host = production.host;
        break;
    default:
        username = test.username;
        password = test.password;
        database = test.database;
        host = test.host;
        break;
}

const getSequelize = (): Sequelize => {
    return new Sequelize({
        // username: process.env.USER_NAME,
        // password: process.env.PASS_WORD,
        // database: process.env.DATA_BASE,
        // host: 'emp_api_db',
        // host: process.env.HOST,
        username,
        password,
        database,
        host,
        dialect: 'postgres',
    });
};

export default getSequelize;
