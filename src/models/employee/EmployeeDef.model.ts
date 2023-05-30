import Department from './Department.enum';
import EmployeeRequest from '../request/EmployeeRequest.model';
import EmployeeAttributes from './EmployeeAttributes.model';

export default class EmployeeDef
    extends EmployeeRequest
    implements EmployeeAttributes
{
    public readonly id: number;

    constructor(
        id: number,
        name: string,
        salary: number,
        department: Department
    ) {
        if (typeof salary !== 'number') {
            salary = parseFloat(salary);
        }

        super(name, salary, department);

        this.id = id;
    }

    compare(employee: EmployeeDef): boolean {
        return (
            this.id === employee.id &&
            this.name === employee.name &&
            this.salary === employee.salary &&
            this.department === employee.department
        );
    }
}

export class TestEmployee extends EmployeeDef {
    constructor() {
        super(-1, '', -1, '' as Department);
    }
}
