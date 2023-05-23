import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import FullUserAttribute from "./FullUserAttribute.model";
import getSequelize from "../../services/sequelize/sequelize.service";
import UserDepartmentDataModel from "../department/UserDepartmentDataModel.model";

class UserDataModel extends Model<InferAttributes<UserDataModel>, InferCreationAttributes<UserDataModel>> implements FullUserAttribute {
    declare userId: CreationOptional<string>;
    declare username: string;
    declare password: string;
    declare departmentId: CreationOptional<number>;

    public getDepartment!: BelongsToGetAssociationMixin<UserDepartmentDataModel>;
    public createDepartment!: BelongsToCreateAssociationMixin<UserDepartmentDataModel>;
    public setDepartment!: BelongsToSetAssociationMixin<UserDepartmentDataModel, number>;

    public static initializeModel(sequelize: Sequelize) {
        UserDataModel.init(
            {
                userId: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                    allowNull: false,
                    field: 'user_id'
                },
                username: {
                    type: DataTypes.STRING(25),
                    unique: true,
                    allowNull: false
                },
                departmentId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    field: 'department_id'
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users'
            }
        );
    }

    public static associate() {
        UserDataModel.belongsTo(
            UserDepartmentDataModel,
            {
                foreignKey: 'department_id',
                as: 'departments'
            }
        );
    }
}

UserDataModel.initializeModel(getSequelize());


export default UserDataModel;