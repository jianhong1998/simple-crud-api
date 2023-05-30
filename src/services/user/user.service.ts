import RequestUserAttribute from '../../models/user/RequestUserAttribute.model';
import DataResponse from '../../models/response/Response.model';
import UserDataModel from '../../models/user/UserDataModel.model';
import ErrorHandler from '../response/ErrorHandler.service';
import FullUserAttribute from '../../models/user/FullUserAttribute.model';
import PasswordService from '../password/passwordHashing.service';
import UserDepartmentAttribute from '../../models/department/UserDepartmentAttribute.model';
import Department from '../../models/employee/Department.enum';

export default class UserService {
    // Handlered response: 200
    public static async getAllUsers(): Promise<
        DataResponse<FullUserAttribute[]>
    > {
        return new Promise(async (resolve, reject) => {
            try {
                const userDataModels = await UserDataModel.findAll();

                const fullUserAttribute: FullUserAttribute[] =
                    userDataModels.map((userDataModel) => {
                        const { userId, username, password, departmentId } =
                            userDataModel;

                        return { userId, username, password, departmentId };
                    });

                return resolve(new DataResponse(fullUserAttribute, 200, ''));
            } catch (error) {
                return reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }

    // Handlered response: 200, 404
    public static async getUser(
        username: string
    ): Promise<DataResponse<FullUserAttribute>> {
        return new Promise(async (resolve, reject) => {
            try {
                const userDataModel = await UserDataModel.findOne({
                    where: { username: username },
                });

                // 404
                if (userDataModel === null) {
                    return resolve(
                        new DataResponse(
                            {
                                userId: '',
                                username: '',
                                departmentId: -1,
                                password: '',
                            },
                            404,
                            'User Not Found.'
                        )
                    );
                }

                const {
                    userId,
                    password,
                    username: existingUsername,
                    departmentId,
                } = userDataModel;

                // 200
                return resolve(
                    new DataResponse(
                        {
                            userId,
                            password,
                            username: existingUsername,
                            departmentId,
                        },
                        200,
                        ''
                    )
                );
            } catch (error) {
                return reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }

    // Handlered response: 200
    public static async createUser(
        inputUser: RequestUserAttribute
    ): Promise<DataResponse<FullUserAttribute>> {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    username: inputUsername,
                    password: inputPassword,
                    departmentId: inputDepartmentId,
                } = inputUser;

                const existingUser = await UserDataModel.findOne({
                    where: {
                        username: inputUsername,
                    },
                });

                if (existingUser !== null) {
                    throw new Error('Username is used.');
                }

                const hashedPassword = await PasswordService.hashPassword(
                    inputPassword
                );

                const userDataModel = await UserDataModel.create({
                    username: inputUsername,
                    password: hashedPassword,
                    departmentId: inputDepartmentId,
                });

                const { userId, username, password, departmentId } =
                    userDataModel;

                // 200
                resolve(
                    new DataResponse(
                        { userId, username, password, departmentId },
                        200,
                        ''
                    )
                );
            } catch (error) {
                return reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }

    // Handlered response: 200, 304, 404
    public static async updateUser(
        user: FullUserAttribute
    ): Promise<DataResponse<FullUserAttribute>> {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    userId: inputUserId,
                    username: inputUsername,
                    password: inputPassword,
                    departmentId: inputDepartmentId,
                } = user;

                const existingUserDataModel = await UserDataModel.findByPk(
                    inputUserId
                );

                // 404
                if (existingUserDataModel === null) {
                    return resolve(
                        new DataResponse(
                            {
                                userId: '',
                                username: '',
                                password: '',
                                departmentId: -1,
                            },
                            404,
                            'User Not Found.'
                        )
                    );
                }

                const {
                    username: currentUsername,
                    password: currentHashedPassword,
                    departmentId: currentDepartmentId,
                } = existingUserDataModel;

                const passwordCompareResult =
                    await PasswordService.comparePassword(
                        inputPassword,
                        currentHashedPassword
                    );

                // 304 - No Change
                if (
                    inputUsername === currentUsername &&
                    inputDepartmentId === currentDepartmentId &&
                    passwordCompareResult
                ) {
                    return resolve(
                        new DataResponse(
                            {
                                userId: '',
                                username: '',
                                password: '',
                                departmentId: -1,
                            },
                            304,
                            'No Change: User data is the same.'
                        )
                    );
                }

                existingUserDataModel.username = inputUsername;
                existingUserDataModel.departmentId = inputDepartmentId;

                if (!passwordCompareResult) {
                    existingUserDataModel.password =
                        await PasswordService.hashPassword(inputPassword);
                }

                const { userId, username, departmentId, password } =
                    await existingUserDataModel.save();

                // 200
                return resolve(
                    new DataResponse(
                        { userId, username, password, departmentId },
                        200,
                        ''
                    )
                );
            } catch (error) {
                return reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }

    // Handlered response: 204, 404
    public static async deleteUser(
        userId: string
    ): Promise<DataResponse<FullUserAttribute>> {
        return new Promise(async (resolve, reject) => {
            try {
                const existingUserDataModel = await UserDataModel.findByPk(
                    userId
                );

                // 404
                if (existingUserDataModel === null) {
                    return resolve(
                        new DataResponse(
                            {
                                userId: '',
                                username: '',
                                password: '',
                                departmentId: -1,
                            },
                            404,
                            'User Not Found.'
                        )
                    );
                }

                await existingUserDataModel.destroy();

                if ((await UserDataModel.findByPk(userId)) !== null) {
                    throw new Error(
                        `Fail Delete User: User ${userId} cannot be deleted from database. Something went wrong.`
                    );
                }

                // 204
                return resolve(
                    new DataResponse(
                        {
                            userId: '',
                            username: '',
                            departmentId: -1,
                            password: '',
                        },
                        204,
                        ''
                    )
                );
            } catch (error) {
                return reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }

    // Handled response: 200, 404
    public static async getAuthorizedDepartments(
        userId: string
    ): Promise<DataResponse<Department[]>> {
        return new Promise(async (resolve, reject) => {
            try {
                const userDataModel = await UserDataModel.findByPk(userId);

                // 404
                if (userDataModel === null) {
                    return resolve(
                        new DataResponse([], 404, 'User not found.')
                    );
                }

                const { departmentName } = await userDataModel.getDepartment();
                const authorizedDepartmentArray: Department[] = [];

                switch (departmentName.toLocaleLowerCase()) {
                    case 'admin':
                        authorizedDepartmentArray.push(
                            ...Object.values(Department)
                        );
                        break;
                    case 'ps':
                        authorizedDepartmentArray.push(Department.PS);
                        break;
                    case 'hr':
                        authorizedDepartmentArray.push(Department.HR);
                        break;
                    default:
                        break;
                }

                // 200
                resolve(new DataResponse(authorizedDepartmentArray, 200, ''));
            } catch (error) {
                reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }
}
