import Department from '../employee/Department.enum';

export default class EmployeeRequest {
    public name: string;
    public salary: number;
    public department: Department;

    constructor(name: string, salary: number, department: Department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
}

export class TestEmployeeRequest extends EmployeeRequest {
    constructor() {
        super('', -1, '' as Department);
    }
}
