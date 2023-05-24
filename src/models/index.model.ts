import UserDepartmentDataModel from "./department/UserDepartmentDataModel.model"
import UserDataModel from "./user/UserDataModel.model"

const initDataModelsRelationship = () => {
    UserDataModel.belongsTo(UserDepartmentDataModel, {foreignKey: 'departmentId'});
    UserDepartmentDataModel.hasMany(UserDataModel, {foreignKey: 'departmentId'});
}

export {
    initDataModelsRelationship
};