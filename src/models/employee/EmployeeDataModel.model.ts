import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import EmployeeAttributes from "./EmployeeAttributes.model";
import Department from "./Department.enum";
import getSequelize from "../../services/sequelize/sequelize.service";

class EmployeeDataModel extends Model<InferAttributes<EmployeeDataModel>, InferCreationAttributes<EmployeeDataModel>> implements EmployeeAttributes {
    declare id: CreationOptional<number>;
    declare name: string;
    declare department: Department;
    declare salary: number;
}

EmployeeDataModel.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        salary: {
            allowNull: false,
            type: DataTypes.DECIMAL(10,2)
        },
        department: {
            allowNull: false,
            type: DataTypes.ENUM(...Object.values(Department))
        }
    },
    {
        sequelize: getSequelize(),
        modelName: 'Employee',
        tableName: 'employees'
    }
);

export default EmployeeDataModel;