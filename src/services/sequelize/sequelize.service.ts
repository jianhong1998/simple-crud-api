import { Sequelize } from 'sequelize';

const getSequelize = (): Sequelize => {
    return new Sequelize({
        username: process.env.USER_NAME,
        password: process.env.PASS_WORD,
        database: process.env.DATA_BASE,
        host: 'emp_api_db',
        // host: process.env.HOST,
        dialect: 'postgres',
    });
};

export default getSequelize;
