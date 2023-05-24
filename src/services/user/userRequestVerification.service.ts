export default class UserRequestVerificationService {
    public static verifyUsername(username: unknown): boolean {
        return (
            typeof username === 'string' &&
            username.split(' ').length === 1 &&
            username.length > 4
        );
    }

    public static verifyPassword(password: unknown): boolean {
        return (
            typeof password === 'string' &&
            password.split(' ').length === 1 &&
            password.length > 7 &&
            password.length <= 20
        );
    }

    public static verifyDepartmentId(departmentId: unknown): boolean {
        return (
            typeof departmentId === 'number' &&
            departmentId > 0
        );
    }

    public static verifyUserId(userId: unknown): boolean {
        return (
            typeof userId === 'string' &&
            userId.split(' ').length === 1
        );
    }
}