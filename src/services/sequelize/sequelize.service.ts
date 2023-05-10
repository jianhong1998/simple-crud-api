import { Sequelize } from "sequelize"
import dotenv from 'dotenv';

dotenv.config();

const getSequelize = (): Sequelize => {
    
    
    return new Sequelize({
        username: process.env.USER_NAME,
        password: process.env.PASS_WORD,
        database: process.env.DATA_BASE,
        host: "emp_api_db", //process.env.HOST || to change back to localhost
        dialect: "postgres"
    });
};

export default getSequelize;