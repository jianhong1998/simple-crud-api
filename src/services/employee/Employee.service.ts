import EmployeeRequest from "../../models/request/EmployeeRequest.model";
import DataResponse from "../../models/response/Response.model";
import EmployeeDef, { TestEmployee } from "../../models/employee/EmployeeDef.model";
import EmployeeDataModel from "../../models/employee/EmployeeDataModel.model";
import ErrorHandler from "../response/ErrorHandler.service";

export default class EmployeeService {
    // Handlered response: 200
    public static async getAllEmployees(): Promise<DataResponse<EmployeeDef[]>> {
        const employeeDataModels = await EmployeeDataModel.findAll();

        const employees = employeeDataModels.map(employeeDataModel => {
            const { id, name, department, salary } = employeeDataModel;
            
            return new EmployeeDef(id, name, salary, department);
        });

        return new DataResponse(employees, 200, '');
    }

    // Handlered response: 200, 404
    public static async getEmployee(employeeId: number): Promise<DataResponse<EmployeeDef>> {
        try {
            const employeeDataModel = await EmployeeDataModel.findByPk(employeeId);
    
            // 404
            if (employeeDataModel === null) {
                return new DataResponse(new TestEmployee(), 404, 'Employee Not Found.');
            }
    
            // 200
            const { id, name, department, salary } = employeeDataModel;

            return new DataResponse(new EmployeeDef(id, name, salary, department), 200, '');
        } catch (error) {
            return Promise.reject(Error(ErrorHandler.handlerUnknownError(error)));
        }
        
    }

    // Handlered response: 200
    public static async createEmployee(newEmployee: EmployeeRequest): Promise<DataResponse<EmployeeDef>> {
        try {
            const { id, name, department, salary } = await EmployeeDataModel.create({
                name: newEmployee.name,
                department: newEmployee.department,
                salary: newEmployee.salary
            });

            return new DataResponse(new EmployeeDef(id, name, salary, department), 200, '');
        } catch (error) {
            const response = new DataResponse(new TestEmployee(), -1, '');
            
            // 500
            return Promise.reject(ErrorHandler.handlerUnknownError(error));
        }
        
    }

    // Handlered response: 200, 304, 404, 500
    public static async updateEmployee(employeeId: number, employeeRequest: EmployeeRequest): Promise<DataResponse<EmployeeDef>> {
        try {
            const currentEmployeeDataModel = await EmployeeDataModel.findByPk(employeeId);

            // 404
            if (currentEmployeeDataModel === null) {
                return new DataResponse(new TestEmployee(), 404, `Employee Not Found: EmployeeId ${employeeId} is not found in database.`);
            }

            const { name: currentName, salary: currentSalary, department: currentDepartment } = currentEmployeeDataModel;

            // 304 - No Change
            if (
                currentName === employeeRequest.name &&
                currentDepartment === employeeRequest.department &&
                currentSalary == employeeRequest.salary
            ) {
                return new DataResponse(new TestEmployee(), 304, 'No Change: Employee data is the same.');
            }

            currentEmployeeDataModel.name = employeeRequest.name;
            currentEmployeeDataModel.salary = employeeRequest.salary;
            currentEmployeeDataModel.department = employeeRequest.department;

            const {id: savedId , name: savedName, salary: savedSalary, department: savedDepartment} = await currentEmployeeDataModel.save();

            // 200
            return new DataResponse(new EmployeeDef(savedId, savedName, savedSalary, savedDepartment), 200, '');
        } catch (error) {
            // 400 - Handle invalid request (at route phase)
            
            // 500
            return Promise.reject(ErrorHandler.handlerUnknownError(error));
        }
    }

    // Handlered response: 204, 404
    public static async deleteEmployee(employeeId: number): Promise<DataResponse<EmployeeDef>> {
        try {
            const currentEmployeeDataModel = await EmployeeDataModel.findByPk(employeeId);

            if (currentEmployeeDataModel === null) {
                return new DataResponse(new TestEmployee(), 404, `Employee Not Found: EmployeeId ${employeeId} is not found in database.`);
            }

            await currentEmployeeDataModel.destroy();
            
            if ((await EmployeeDataModel.findByPk(employeeId)) !== null) {
                throw new Error(`Fail Delete Employee: Employee ${employeeId} cannot be deleted from database. Something went wrong.`);
            }
            
            // 204
            return new DataResponse(new TestEmployee(), 204, '');
        } catch (error) {
            return Promise.reject(ErrorHandler.handlerUnknownError(error));
        }
    }
}