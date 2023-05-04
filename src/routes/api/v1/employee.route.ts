import { Request, Router, Response, NextFunction } from "express";
import EmployeeDef from "../../../util/employees/models/EmployeeDef.model";
import EmployeeService from "../../../util/employees/services/Employee.service";
import ErrorResponse from "../../../util/response/models/ErrorResponse.model";
import EmployeeRequest from "../../../util/employees/models/EmployeeRequest.model";
import ErrorHandler from "../../../util/response/services/ErrorHandler.service";
import EmployeeRequestVerificationService from "../../../util/employees/services/EmployeeRequestVerification.service";
import Department from "../../../util/employees/models/Department.enum";

const employeeRouter = Router();

const getErrorMessageForInvalidEmployeeId = (employeeId: string): ErrorResponse => {
    return new ErrorResponse(`Invalid Employee ID (${employeeId}): employeeId must be a positive number.`);
};

const verifyEmployeeRequestMiddleware = () =>
    (req: Request<{}, {}, EmployeeRequest>, res: Response<EmployeeDef | ErrorResponse>, next: NextFunction) => {
        const method = req.method.toUpperCase();

        if (method === "PUT" || method === "POST") {
            const {name, department, salary} = req.body;
            const {verifyName, verifySalary, verifyDepartment} = EmployeeRequestVerificationService;
    
            if (!verifyName(name)) {
                res.status(400).send(new ErrorResponse('Invalid EmployeeRequest: name must be string.'));
                return;
            }
    
            if (!verifySalary(salary)) {
                res.status(400).send(new ErrorResponse('Invalid EmployeeRequest: salary must be a positive number.'));
                return;
            }
    
            if (!verifyDepartment(department)) {
                const errorResponse = new ErrorResponse('');
    
                if (typeof department === "undefined") {
                    errorResponse.errorMessage = "Invalid EmployeeRequest: department is missing in request body.";
                } else {
                    errorResponse.errorMessage = `Invalid EmployeeRequest: department is invalid. Department received: ${department}.`;
                }
                
                res.status(400).send(errorResponse);
                return;
            }
        }
        
        next();
    }
;


const verifyEmployeeIdMiddleware = () => (req: Request<{emp_id: string}>, res: Response<EmployeeDef | ErrorResponse>, next: NextFunction) => {
    const {verifyEmployeeId} = EmployeeRequestVerificationService;
    
    // 400 - Invalid emp_id
    if (!verifyEmployeeId(req.params.emp_id)) {
        res.status(400).send(getErrorMessageForInvalidEmployeeId(req.params.emp_id));
        return;
    }

    next();
};


employeeRouter.use(verifyEmployeeRequestMiddleware());
employeeRouter.use('/:emp_id', verifyEmployeeIdMiddleware());

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
    const employeeId = parseInt(req.params.emp_id);
    const { name, salary } = req.body;
    let { department } = req.body;
    department = department.toUpperCase() as Department;

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
    try {
        const {deleteEmployee} = EmployeeService;

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