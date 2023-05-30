import { RequestHandler, Response, Request } from 'express';

import ErrorResponse from '../../models/response/ErrorResponse.model';
import ErrorHandler from '../../services/response/ErrorHandler.service';
import EmployeeService from '../../services/employee/employee.service';

import Department from '../../models/employee/Department.enum';
import EmployeeDef from '../../models/employee/EmployeeDef.model';
import EmployeeRequest from '../../models/request/EmployeeRequest.model';
import VerifyAuthorizationService from '../../services/login/verifyAuthorization.service';
import ResponseUserVerificationService from '../../services/user/responseUserVerification.service';
import UserService from '../../services/user/user.service';
import EmployeeDataModel from '../../models/employee/EmployeeDataModel.model';
import {
    verifyUserAuthorizationForFetchingEmployee,
    getUserAuthorizedDepartment,
} from '../verifyUserAuthorizationHandlers/verifyUserAuthorizationForEmployee.controller';

const getEmployeeRequest: RequestHandler<
    { emp_id: string },
    EmployeeDef | ErrorResponse
> = async (req, res) => {
    try {
        const employeeId = parseInt(req.params.emp_id);

        const {
            data: employee,
            errorMessage,
            statusCode,
        } = await EmployeeService.getEmployee(employeeId);

        if (statusCode !== 200) {
            // 404
            return res.status(statusCode).send(new ErrorResponse(errorMessage));
        }

        const token = req.headers.authorization!.split(' ')[1];

        const {
            data: departments,
            errorMessage: getDepartmentsErrorMessage,
            statusCode: getDepartmentsStatusCode,
        } = await getUserAuthorizedDepartment(token);

        if (getDepartmentsStatusCode !== 200) {
            // 400, 404
            return res
                .status(getDepartmentsStatusCode)
                .send(new ErrorResponse(getDepartmentsErrorMessage));
        }

        if (!departments.includes(employee.department)) {
            // 401
            return res
                .status(401)
                .send(
                    new ErrorResponse(
                        'User is unauthorized to fetch the employee.'
                    )
                );
        }

        // 200
        res.status(statusCode).send(employee);
    } catch (error) {
        // 500
        res.status(500).send(
            new ErrorResponse(ErrorHandler.handleUnknownError(error))
        );
    }
};

const getAllEmloyeesRequest: RequestHandler<
    any,
    { employees: EmployeeDef[] } | ErrorResponse
> = async (req, res) => {
    try {
        const { statusCode, data: employees } =
            await EmployeeService.getAllEmployees();

        const token = req.headers.authorization!.split(' ')[1];

        const {
            data: authorizedDepartments,
            errorMessage: getDepartmentErrorMessage,
            statusCode: getDepartmentStatusCode,
        } = await getUserAuthorizedDepartment(token);

        if (getDepartmentStatusCode !== 200) {
            // 404
            return res
                .status(getDepartmentStatusCode)
                .send(
                    new ErrorResponse(
                        ErrorHandler.handleUnknownError(
                            getDepartmentErrorMessage
                        )
                    )
                );
        }

        const validEmployees = employees.filter((employee) =>
            authorizedDepartments.includes(employee.department)
        );

        // 200
        res.status(statusCode).send({ employees: validEmployees });
    } catch (error) {
        // 500
        res.status(500).send(
            new ErrorResponse(ErrorHandler.handleUnknownError(error))
        );
    }
};

const postEmployeeRequest: RequestHandler<
    any,
    EmployeeDef | ErrorResponse,
    EmployeeRequest
> = async (req, res) => {
    const { name, salary } = req.body;
    let { department } = req.body;

    department = department.toUpperCase() as Department;

    try {
        const {
            data: createdEmployee,
            errorMessage,
            statusCode,
        } = await EmployeeService.createEmployee(
            new EmployeeRequest(name, salary, department)
        );

        if (statusCode !== 200) {
            return res.status(statusCode).send(new ErrorResponse(errorMessage));
        }

        res.status(statusCode).send(createdEmployee);
    } catch (error) {
        // 500
        res.status(500).send(
            new ErrorResponse(ErrorHandler.handleUnknownError(error))
        );
    }
};

const putEmployeeRequest: RequestHandler<
    { emp_id: string },
    EmployeeDef | ErrorResponse,
    EmployeeRequest
> = async (req, res) => {
    const employeeId = parseInt(req.params.emp_id);
    const { name, salary } = req.body;
    let { department } = req.body;
    department = department.toUpperCase() as Department;

    try {
        const token = req.headers.authorization!.split(' ')[1];

        const {
            data: { isAuthorized },
            errorMessage: errorMessageWhenVerify,
            statusCode: statusCodeWhenverify,
        } = await verifyUserAuthorizationForFetchingEmployee(token, employeeId);

        if (statusCodeWhenverify !== 200) {
            return res
                .status(statusCodeWhenverify)
                .send(new ErrorResponse(errorMessageWhenVerify));
        }

        if (!isAuthorized) {
            return res
                .status(401)
                .send(
                    new ErrorResponse(
                        'User is unauthorized to update the employee data.'
                    )
                );
        }

        const {
            data: updatedEmployee,
            errorMessage,
            statusCode,
        } = await EmployeeService.updateEmployee(
            employeeId,
            new EmployeeRequest(name, salary, department)
        );

        if (statusCode == 200) {
            // 200
            res.status(statusCode).send(updatedEmployee);
        } else if (statusCode == 304) {
            // 304
            res.sendStatus(statusCode);
        } else {
            // 404
            res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch (error) {
        // 500
        res.status(500).send(
            new ErrorResponse(ErrorHandler.handleUnknownError(error))
        );
    }
};

const deleteEmployeeRequest: RequestHandler<
    { emp_id: string },
    ErrorResponse
> = async (req, res) => {
    try {
        const employeeId = parseInt(req.params.emp_id);

        const token = req.headers.authorization!.split(' ')[1];

        const {
            data: { isAuthorized },
            errorMessage: errorMessageWhenVerify,
            statusCode: statusCodeWhenVerify,
        } = await verifyUserAuthorizationForFetchingEmployee(token, employeeId);

        if (statusCodeWhenVerify !== 200) {
            return res
                .status(statusCodeWhenVerify)
                .send(new ErrorResponse(errorMessageWhenVerify));
        }

        if (!isAuthorized) {
            return res
                .status(401)
                .send(
                    new ErrorResponse(
                        'User is unauthorized to delete the employee.'
                    )
                );
        }

        const { deleteEmployee } = EmployeeService;

        const { errorMessage, statusCode } = await deleteEmployee(employeeId);

        if (statusCode === 204) {
            // 204
            res.sendStatus(statusCode);
        } else {
            // 404
            res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch (error) {
        const { handleUnknownError: handlerUnknownError } = ErrorHandler;

        res.status(500).send(new ErrorResponse(handlerUnknownError(error)));
    }
};

export {
    getAllEmloyeesRequest,
    getEmployeeRequest,
    postEmployeeRequest,
    putEmployeeRequest,
    deleteEmployeeRequest,
};
