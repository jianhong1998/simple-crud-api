import EmployeeStorageController from "../controllers/EmployeeStorage.controller";

export default class EmployeeIdGenerator {
    public static generateEmployeeId(): number {
        return EmployeeStorageController.size() + 1;
    }
}