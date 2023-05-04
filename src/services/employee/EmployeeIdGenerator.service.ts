import EmployeeStorageController from "../../controllers/storageController/EmployeeStorage.controller";


export default class EmployeeIdGenerator {
    private static idRunningNumber = EmployeeStorageController.size();
    
    public static generateEmployeeId(): number {
        this.idRunningNumber++;
        
        return this.idRunningNumber;
    }
}