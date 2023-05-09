import { Sequelize } from "sequelize"
import dotenv from 'dotenv';

dotenv.config();

const getSequelize = (): Sequelize => {
    if (typeof process.env.DB_URL === "undefined") {
        return new Sequelize({
            database: 'crud_rest_api_db_dev',
            username: 'leejianhong',
            password: 'root',
            host: 'localhost',
            port: 5432,
            dialect: 'postgres'
        });
    }
    
    return new Sequelize(process.env.DB_URL);
};

export default getSequelize;