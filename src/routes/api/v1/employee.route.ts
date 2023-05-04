import { Request, Router, Response } from "express";
import EmployeeDef from "../../../util/employees/models/EmployeeDef.model";
import EmployeeService from "../../../util/employees/services/Employee.service";
import ErrorResponse from "../../../util/response/models/ErrorResponse.model";
import EmployeeRequest from "../../../util/employees/models/EmployeeRequest.model";
import ErrorHandler from "../../../util/response/services/ErrorHandler.service";
import EmployeeRequestVerificationService from "../../../util/employees/services/EmployeeRequestVerification.service";
import Department from "../../../util/employees/models/Department.enum";

const employeeRouter = Router();

// GET - all
employeeRouter.get('/', (req: Request, res: Response<{employees: EmployeeDef[]} | ErrorResponse>) => {
    try {
        const {statusCode, data: employees} = EmployeeService.getAllEmployees();
    
        // 200
        res.status(statusCode).send({employees});
    } catch(error) {
        // 500
        res.status(500).send(new ErrorResponse(ErrorHandler.handlerUnknownError(error)));
    }
});

// GET
employeeRouter.get('/:emp_id', (req: Request<{emp_id: string}>, res: Response<EmployeeDef | ErrorResponse>) => {
    const {verifyEmployeeId} = EmployeeRequestVerificationService;
    
    // 400 - Invalid emp_id
    if (!verifyEmployeeId(req.params.emp_id)) {
        res.status(400).send(new ErrorResponse(`Invalid Employee ID (${req.params.emp_id}): employeeId must be only number.`));
        return;
    }
    
    try {
        const employeeId = parseInt(req.params.emp_id);
    
        const {data, errorMessage, statusCode} = EmployeeService.getEmployee(employeeId);

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
});

// POST
employeeRouter.post('/', (req: Request<{}, {}, EmployeeRequest>, res: Response<EmployeeDef | ErrorResponse>) => {
    const {name, salary} = req.body;
    let {department} = req.body;

    department = department.toUpperCase() as Department;
    
    // 400 - Invalid body - Not EmployeeRequest
    if (
        typeof name === "undefined" ||
        typeof salary === "undefined" ||
        typeof department === "undefined"
    ) {
        res.status(400).send(new ErrorResponse('EmployeeRequest Not Found: name, salary or department is not found in request body.'));
        
        return;
    }

    // 400 - Invalid department
    if (!EmployeeRequestVerificationService.verifyDepartment(department.toUpperCase())) {
        res.status(400).send(new ErrorResponse(`Invalid Department: department in request body is invalid. Received department: ${department}`));
        return;
    }

    try {
        const {data: createdEmployee, errorMessage, statusCode} = EmployeeService.createEmployee(new EmployeeRequest(name, salary, department));
    
        if (statusCode == 200) {
            // 200
            res.status(statusCode).send(createdEmployee);
        } else {
            // 400 && 500
            res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch(error) {
        // 500
        res.status(500).send(new ErrorResponse(ErrorHandler.handlerUnknownError(error)));
    }
});


// PUT
employeeRouter.put('/:emp_id', (req: Request<{emp_id: string}, {}, EmployeeRequest>, res: Response<EmployeeDef | ErrorResponse>) => {
    const { verifyEmployeeId } = EmployeeRequestVerificationService;
    
    // 400 - Invalid emp_id
    if (!verifyEmployeeId(req.params.emp_id)) {
        res.status(400).send(new ErrorResponse(`Invalid Employee ID (${req.params.emp_id}): employeeId must be only number.`));
        return;
    }

    const employeeId = parseInt(req.params.emp_id);
    const { name, salary } = req.body;
    let { department } = req.body;
    department = department.toUpperCase() as Department;

    // 400 - Invalid body - Not EmployeeRequest
    if (
        typeof name === "undefined" ||
        typeof salary === "undefined" ||
        typeof department === "undefined"
    ) {
        res.status(400).send(new ErrorResponse('EmployeeRequest Not Found: name, salary or department is not found in request body.'));
        
        return;
    }

    // 400 - Invalid department
    if (!EmployeeRequestVerificationService.verifyDepartment(department.toUpperCase())) {
        res.status(400).send(new ErrorResponse(`Invalid Department: department in request body is invalid. Received department: ${department}`));
        return;
    }

    try {
        const {data: updatedEmployee, errorMessage, statusCode} = EmployeeService.updateEmployee(employeeId, new EmployeeRequest(name, salary, department));
    
        if (statusCode == 200) {
            // 200
            res.status(statusCode).send(updatedEmployee);
        } else if (statusCode == 304) {
            // 304
            res.sendStatus(304);
        } else {
            // 404 && 500
            res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch(error) {
        // 500
        res.status(500).send(new ErrorResponse(ErrorHandler.handlerUnknownError(error)));
    }
});


// DELETE
employeeRouter.delete('/:emp_id', (req: Request<{emp_id: string}>, res: Response<ErrorResponse>) => {
    const {verifyEmployeeId} = EmployeeRequestVerificationService;
    const {deleteEmployee} = EmployeeService;
    
    // 400 - Invalid emp_id
    if (!verifyEmployeeId(req.params.emp_id)) {
        res.status(400).send(new ErrorResponse(`Invalid Employee ID (${req.params.emp_id}): employeeId must be only number.`));
        return;
    }

    try {
        const employeeId = parseInt(req.params.emp_id);

        const {errorMessage, statusCode} = deleteEmployee(employeeId);

        if (statusCode === 204) {
            res.sendStatus(statusCode);
        } else {
            res.status(statusCode).send(new ErrorResponse(errorMessage));
        }
    } catch(error) {
        const {handlerUnknownError} = ErrorHandler;
        
        res.status(500).send(new ErrorResponse(handlerUnknownError(error)));
    }
});


export default employeeRouter;