import EmployeeRequest from "../request/EmployeeRequest.model";
import Department from "./Department.enum";
import EmployeeDef from "./EmployeeDef.model";

export default interface EmployeeAttributes extends EmployeeRequest {
    id: number;
    // name: string;
    // salary: number;
    // department: Department;
}