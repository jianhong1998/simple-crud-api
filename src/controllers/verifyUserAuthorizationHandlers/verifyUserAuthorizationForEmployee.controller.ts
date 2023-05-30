import Department from '../../models/employee/Department.enum';
import EmployeeDataModel from '../../models/employee/EmployeeDataModel.model';
import DataResponse from '../../models/response/Response.model';
import VerifyAuthorizationService from '../../services/login/verifyAuthorization.service';
import ErrorHandler from '../../services/response/ErrorHandler.service';
import ResponseUserVerificationService from '../../services/user/responseUserVerification.service';
import UserService from '../../services/user/user.service';

const verifyUserAuthorizationForFetchingEmployee = async (
    token: string,
    employeeId: number
): Promise<DataResponse<{ isAuthorized: boolean }>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { payload: loggedInUserInfo } =
                VerifyAuthorizationService.decodeLoginToken(token);

            if (!ResponseUserVerificationService.verify(loggedInUserInfo)) {
                // 400
                return resolve(
                    new DataResponse(
                        { isAuthorized: false },
                        400,
                        'Payload in token is not ResponseUserAttribute.'
                    )
                );
            }

            const {
                data: authorizedDepartments,
                errorMessage: getDepartmentErrorMessage,
                statusCode: getDepartmentStatusCode,
            } = await UserService.getAuthorizedDepartments(
                loggedInUserInfo.userId
            );

            if (getDepartmentStatusCode !== 200) {
                // 404 - user not found
                return resolve(
                    new DataResponse(
                        { isAuthorized: false },
                        getDepartmentStatusCode,
                        getDepartmentErrorMessage
                    )
                );
            }

            const employeeDataModel = await EmployeeDataModel.findByPk(
                employeeId
            );

            if (employeeDataModel === null) {
                // 404 - employee not found
                return resolve(
                    new DataResponse(
                        { isAuthorized: false },
                        404,
                        'Employee not found.'
                    )
                );
            }

            return resolve(
                new DataResponse(
                    {
                        isAuthorized: authorizedDepartments.includes(
                            employeeDataModel.department
                        ),
                    },
                    200,
                    ''
                )
            );
        } catch (error) {
            reject(ErrorHandler.handleUnknownError(error));
        }
    });
};

const getUserAuthorizedDepartment = async (
    token: string
): Promise<DataResponse<Department[]>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { payload: loggedInUserInfo } =
                VerifyAuthorizationService.decodeLoginToken(token);

            if (!ResponseUserVerificationService.verify(loggedInUserInfo)) {
                // 400
                return resolve(
                    new DataResponse(
                        [],
                        400,
                        'Payload in token is not ResponseUserAttribute.'
                    )
                );
            }

            const {
                data: authorizedDepartments,
                errorMessage: getDepartmentErrorMessage,
                statusCode: getDepartmentStatusCode,
            } = await UserService.getAuthorizedDepartments(
                loggedInUserInfo.userId
            );

            if (getDepartmentStatusCode !== 200) {
                // 404 - user not found
                return resolve(
                    new DataResponse(
                        [],
                        getDepartmentStatusCode,
                        getDepartmentErrorMessage
                    )
                );
            }

            return resolve(
                new DataResponse(
                    authorizedDepartments,
                    getDepartmentStatusCode,
                    ''
                )
            );
        } catch (error) {
            reject(ErrorHandler.handleUnknownError(error));
        }
    });
};

export {
    verifyUserAuthorizationForFetchingEmployee,
    getUserAuthorizedDepartment,
};
