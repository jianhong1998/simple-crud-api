import { RequestHandler, Response, Request } from "express";

import ErrorResponse from "../../models/response/ErrorResponse.model";
import ErrorHandler from "../../services/response/ErrorHandler.service";
import EmployeeService from "../../services/employee/employee.service";

import Department from "../../models/employee/Department.enum";
import EmployeeDef from "../../models/employee/EmployeeDef.model";
import EmployeeRequest from "../../models/request/EmployeeRequest.model";

const getEmployeeRequest: RequestHandler<{emp_id: string}> = async (req: Request, res: Response<EmployeeDef | ErrorResponse>) => {
    try {
        const employeeId = parseInt(req.params.emp_id);
    
        const {data, errorMessage, statusCode} = await EmployeeService.getEmployee(employeeId);

        if (statusCode === 200) {
            // 200
            res.status(statusCode).send(data);
        } else {
            // 404
            res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch (error) {
        // 500
        res.status(500).send(new ErrorResponse(ErrorHandler.handlerUnknownError(error)));
    }
}

const getAllEmloyeesRequest: RequestHandler = async (req: Request, res: Response<{employees: EmployeeDef[]} | ErrorResponse>) => {
    try {
        const {statusCode, data: employees} = await EmployeeService.getAllEmployees();
    
        // 200
        res.status(statusCode).send({employees});
    } catch(error) {
        // 500
        res.status(500).send(new ErrorResponse(ErrorHandler.handlerUnknownError(error)));
    }
}

const postEmployeeRequest: RequestHandler = async (req: Request<{}, {}, EmployeeRequest>, res: Response<EmployeeDef | ErrorResponse>) => {
    const {name, salary} = req.body;
    let {department} = req.body;

    department = department.toUpperCase() as Department;

    try {
        const {data: createdEmployee, errorMessage, statusCode} = await EmployeeService.createEmployee(new EmployeeRequest(name, salary, department));
    
        if (statusCode == 200) {
            // 200
            res.status(statusCode).send(createdEmployee);
        }
    } catch(error) {
        // 500
        res.status(500).send(new ErrorResponse(ErrorHandler.handlerUnknownError(error)));
    }
};

const putEmployeeRequest: RequestHandler<{emp_id: string}, {}, EmployeeRequest> = async (req: Request, res: Response<EmployeeDef | ErrorResponse>) => {
    const employeeId = parseInt(req.params.emp_id);
    const { name, salary } = req.body;
    let { department } = req.body;
    department = department.toUpperCase() as Department;

    try {
        const {data: updatedEmployee, errorMessage, statusCode} = await EmployeeService.updateEmployee(employeeId, new EmployeeRequest(name, salary, department));
    
        if (statusCode == 200) {
            // 200
            res.status(statusCode).send(updatedEmployee);
        } else if (statusCode == 304) {
            // 304
            res.sendStatus(304);
        } else {
            // 404
            res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch(error) {
        // 500
        res.status(500).send(new ErrorResponse(ErrorHandler.handlerUnknownError(error)));
    }
};

const deleteEmployeeRequest: RequestHandler<{emp_id: string}> = async (req: Request, res: Response<ErrorResponse>) => {
    try {
        const { deleteEmployee } = EmployeeService;

        const employeeId = parseInt(req.params.emp_id);

        const {errorMessage, statusCode} = await deleteEmployee(employeeId);

        if (statusCode === 204) {
            // 204
            res.sendStatus(statusCode);
        } else {
            // 404
            res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch(error) {
        const {handlerUnknownError} = ErrorHandler;
        
        res.status(500).send(new ErrorResponse(handlerUnknownError(error)));
    }
};

export {
    getAllEmloyeesRequest,
    getEmployeeRequest,
    postEmployeeRequest,
    putEmployeeRequest,
    deleteEmployeeRequest
}