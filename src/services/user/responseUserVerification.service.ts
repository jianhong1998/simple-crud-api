import ResponseUserAttribute from "../../models/user/ResponseUserAttribute.model";

export default class ResponseUserVerificationService {
    static verify(unknownObject: unknown): unknownObject is ResponseUserAttribute {
        return (
            typeof unknownObject === 'object' &&
            unknownObject !== null &&
            'userId' in unknownObject &&
            typeof unknownObject.userId === 'string' &&
            'username' in unknownObject &&
            typeof unknownObject.username === 'string' &&
            'departmentId' in unknownObject &&
            typeof unknownObject.departmentId === 'number'
        );
    }
}