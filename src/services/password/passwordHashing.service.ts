// import bcrypt from 'bcrypt';
import { hash, compare } from 'bcryptjs';
import ErrorHandler from '../response/ErrorHandler.service';

export default class PasswordService {
    public static async hashPassword(password: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = await hash(password, 15);

                return resolve(hashedPassword);
            } catch (error) {
                return reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }

    public static async comparePassword(
        originalPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const compareResult = await compare(
                    originalPassword,
                    hashedPassword
                );

                return resolve(compareResult);
            } catch (error) {
                return reject(ErrorHandler.handleUnknownError(error));
            }
        });
    }
}
