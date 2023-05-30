'use strict';
/** @type {import('sequelize-cli').Migration} */

const { UUIDV4 } = require('sequelize');

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('users', {
            userId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4,
                allowNull: false,
                field: 'user_id',
            },
            username: {
                type: DataTypes.STRING(25),
                unique: true,
                allowNull: false,
            },
            departmentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'department_id',
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};
