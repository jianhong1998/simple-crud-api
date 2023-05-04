import { Request, Router, Response, NextFunction } from "express";

import ErrorResponse from "../../../models/response/ErrorResponse.model";


import { deleteEmployeeRequest, getAllEmloyeesRequest, getEmployeeRequest, postEmployeeRequest, putEmployeeRequest } from '../../../controllers/requestHandlers/employeeRequestHandler.controller'
import EmployeeRequestVerificationService from "../../../services/employee/EmployeeRequestVerification.service";
import EmployeeRequest from "../../../models/request/EmployeeRequest.model";
import EmployeeDef from "../../../models/employee/EmployeeDef.model";

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
employeeRouter.get('/', getAllEmloyeesRequest);


// GET
employeeRouter.get('/:emp_id', getEmployeeRequest);


// POST
employeeRouter.post('/', postEmployeeRequest);


// PUT
employeeRouter.put('/:emp_id', putEmployeeRequest);


// DELETE
employeeRouter.delete('/:emp_id', deleteEmployeeRequest);


export default employeeRouter;