import EmployeeStorageController from "../controllers/EmployeeStorage.controller";
import EmployeeDef from "../models/EmployeeDef.model";
import DataResponse from '../../response/models/Response.model'
import Department from "../models/Department.enum";
import EmployeeRequest from "../models/EmployeeRequest.model";
import EmployeeIdGenerator from "./EmployeeIdGenerator.service";

export default class EmployeeService {
    // Handlered response: 200
    public static getAllEmployees(): DataResponse<EmployeeDef[]> {
        const data = EmployeeStorageController.getAll();

        return new DataResponse(data, 200, '');
    }

    // Handlered response: 200, 404
    public static getEmployee(employeeId: number): DataResponse<EmployeeDef> {
        const employee = EmployeeStorageController.get(employeeId);

        // 404
        if (typeof employee === "undefined") {
            return new DataResponse(new EmployeeDef(-1,"",-1,Department.HR), 404, 'Employee Not Found.');
        }

        // 200
        return new DataResponse(employee, 200, '');
    }

    // Handlered response: 200, 400, 500
    public static createEmployee(newEmployee: EmployeeRequest): DataResponse<EmployeeDef> {
        const employeeId = EmployeeIdGenerator.generateEmployeeId();

        const employee = new EmployeeDef(employeeId, newEmployee.name, newEmployee.salary, newEmployee.department);

        try {
            const insertedEmployee = EmployeeStorageController.insert(employee);

            return new DataResponse(insertedEmployee, 200, '');
        } catch (error) {
            const response = new DataResponse(new EmployeeDef(-1, '', -1, Department.HR), -1, '');

            if (!(error instanceof Error)) {
                response.errorMessage = String(error);
                response.statusCode = 500;
                return response;
            }
            

            if (error.message.includes('EmployeeId Exist:')) {
                response.errorMessage = error.message;
                response.statusCode = 400;
                return response;
            }

            response.errorMessage = error.message;
            response.statusCode = 500;

            return response;
        }
        
    }

    // Handlered response: 200, 304, 404, 500
    public static updateEmployee(employeeId: number, employeeRequest: EmployeeRequest): DataResponse<EmployeeDef> {
        const employee = new EmployeeDef(employeeId, employeeRequest.name, employeeRequest.salary, employeeRequest.department);

        try {
            const updatedEmployee = EmployeeStorageController.update(employee);

            // 200
            return new DataResponse(updatedEmployee, 200, '');
        } catch (error) {
            const response = new DataResponse(new EmployeeDef(-1, "", -1, Department.HR), -1, '');
            
            if (!(error instanceof Error)) {
                response.errorMessage = String(error);
                response.statusCode = 500;
                return response;
            }

            //  404
            if (error.message.includes('Employee Not Found:')) {
                response.statusCode = 404;
                response.errorMessage = error.message;
                return response;
            }

            // 400 - Handle invalid request (at route phase)

            // 304 - No Change
            if (error.message.includes('No Change:')) {
                response.statusCode = 304;
                response.errorMessage = error.message;
                return response;
            }

            // 500
            response.errorMessage = error.message;
            response.statusCode = 500;
            return response;
        }
    }

    // Handlered response: 204, 400, 500
    public static deleteEmployee(employeeId: number): DataResponse<EmployeeDef> {
        try {
            const deletedEmployee = EmployeeStorageController.delete(employeeId);

            // 204
            return new DataResponse(deletedEmployee, 204, '');
        } catch (error) {
            const response = new DataResponse(new EmployeeDef(-1, "", -1, Department.HR), -1, '');
            
            // 500
            if (!(error instanceof Error)) {
                response.statusCode = 500;
                response.errorMessage = String(error);
                return response;
            }

            // 400
            if (error.message.includes('Employee Not Found')) {
                response.statusCode = 404;
                response.errorMessage = error.message;
                return response;
            }

            // 500
            response.statusCode = 500;
            response.errorMessage = error.message;
            return response;
        }
    }
}