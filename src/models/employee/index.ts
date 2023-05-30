'use strict';

import fs from 'fs';
import path from 'path';
import sequelize, { Sequelize } from 'sequelize';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db: any = {};

require('dotenv').config();

let sequelizeConnection: any;
if (config.use_env_variable) {
    sequelizeConnection = new Sequelize(
        process.env[config.use_env_variable] as string,
        config
    );
} else {
    sequelizeConnection = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelizeConnection,
            sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelizeConnection;
db.Sequelize = Sequelize;

module.exports = db;
