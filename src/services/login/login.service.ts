import LoginUserAttribute from '../../models/user/LoginUserAttribute.model';
import UserDataModel from '../../models/user/UserDataModel.model';
import ErrorHandler from '../response/ErrorHandler.service';
import DataResponse from '../../models/response/Response.model';
import LoginResult from '../../models/login/LoginResult.model';
import PasswordService from '../password/passwordHashing.service';
import ResponseUserAttribute from '../../models/user/ResponseUserAttribute.model';
import TokenService from '../token/token.service';

export default class LoginService {
    public static async login(
        inputUser: LoginUserAttribute
    ): Promise<DataResponse<LoginResult>> {
        return new Promise(async (resolve, reject) => {
            try {
                const { username: inputUsername, password: inputPassword } =
                    inputUser;

                const existingUserDataModel = await UserDataModel.findOne({
                    where: {
                        username: inputUsername,
                    },
                });

                // 404
                if (existingUserDataModel === null) {
                    return resolve(
                        new DataResponse({ token: '' }, 404, 'User Not Found.')
                    );
                }

                const {
                    password: existingPassword,
                    username,
                    departmentId,
                    userId,
                } = existingUserDataModel;

                const passwordCompaereResult =
                    await PasswordService.comparePassword(
                        inputPassword,
                        existingPassword
                    );

                // 401 - Unauthorised
                if (!passwordCompaereResult) {
                    return resolve(
                        new DataResponse(
                            { token: '' },
                            401,
                            'Password incorrect.'
                        )
                    );
                }

                const token = TokenService.generateToken({
                    userId,
                    username,
                    departmentId,
                } as ResponseUserAttribute);

                // 200
                return resolve(new DataResponse({ token }, 200, ''));
            } catch (error) {
                reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }
}
