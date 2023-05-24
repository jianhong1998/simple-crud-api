'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('departments', {
      departmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'department_id'
      },
      departmentName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'department_name'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });

    await queryInterface.bulkInsert('departments', [
      {
        "department_id": 1,
        "department_name": 'Admin',
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "department_id": 2,
        "department_name": 'HR',
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "department_id": 3,
        "department_name": 'PS',
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('departments');
  }
};