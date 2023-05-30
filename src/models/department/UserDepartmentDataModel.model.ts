import {
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManySetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from 'sequelize';
import UserDepartmentAttribute from './UserDepartmentAttribute.model';
import getSequelize from '../../services/sequelize/sequelize.service';
import UserDataModel from '../user/UserDataModel.model';

class UserDepartmentDataModel
    extends Model<
        InferAttributes<UserDepartmentDataModel>,
        InferCreationAttributes<UserDepartmentDataModel>
    >
    implements UserDepartmentAttribute
{
    declare departmentId: number;
    declare departmentName: string;

    public getUsers!: HasManyGetAssociationsMixin<UserDataModel>;

    public createUser!: HasManyCreateAssociationMixin<UserDataModel>;

    public serUser!: HasManySetAssociationsMixin<UserDataModel, string>;

    public static initializeModel(sequelize: Sequelize) {
        UserDepartmentDataModel.init(
            {
                departmentId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                    field: 'department_id',
                },
                departmentName: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false,
                    field: 'department_name',
                },
            },
            {
                sequelize,
                modelName: 'Department',
                tableName: 'departments',
            }
        );
    }

    public static associate() {
        UserDepartmentDataModel.hasMany(UserDataModel, {
            foreignKey: 'department_id',
            as: 'users',
        });
    }
}

UserDepartmentDataModel.initializeModel(getSequelize());

export default UserDepartmentDataModel;
