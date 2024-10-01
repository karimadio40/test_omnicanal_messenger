import { Request, Response } from "express";
import { Staff } from "../../../entity/Staff.entity";
import { AppDataSource } from "../../../data-source";
import { encrypt, generateRandomString } from "../utils/auth.util";
import { handleError, handleOkResponse, handleUnauthorized } from "../../../helpers/handler/message.handler";

export class AuthController {
    static async signUp(req, res) {
        const { firstName, lastName, email, password } = req.body;

        try {
            //TODO Check field validity
            const user = new Staff();
            user.salt = await encrypt.generateSalt();
            const encryptedPassword = await encrypt.encryptpass(password, user.salt);
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.isVerify = true;
            user.verificationCode = generateRandomString()
            user.password = encryptedPassword;

            const userRepository = AppDataSource.getRepository(Staff);
            await userRepository.save(user);

            return handleOkResponse(res, "User created successfully")
        } catch (error) {
            return handleError(res, error);
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const userRepository = AppDataSource.getRepository(Staff);
            const user = await userRepository.findOne({ where: { email: email } });

            if (!user) {
                return handleUnauthorized(res, "user credencial invalid");
            }

            const isMatch = await encrypt.comparepassword(user.password, password);
            if (!isMatch) {
                return handleUnauthorized(res, "password incorrect");
            }

            delete user.password;
            delete user.salt;
            return handleOkResponse(res, user);
        } catch (e) {
            return handleError(res, e)
        }
    }

    static async signOut(req: Request, res: Response) {
        try {

        } catch (e) {
            return handleError(res, e)
        }
    }
}