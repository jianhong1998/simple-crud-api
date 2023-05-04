import app from './src/app';
import Department from './src/util/employees/models/Department.enum';
import EmployeeRequest, { TestEmployeeRequest } from './src/util/employees/models/EmployeeRequest.model';

app.listen(3000, () => {
    console.log("App is running on 'http://localhost:3000/'");
});