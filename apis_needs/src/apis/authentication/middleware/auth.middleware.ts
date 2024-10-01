import * as jwt from 'jsonwebtoken';
import { encrypt } from "../utils/auth.util";
import { handleUnauthorized } from "../../../helpers/handler/message.handler";
import { AppDataSource } from "../../../data-source";
import { Staff } from "../../../entity/Staff.entity";


export const isAuthorized = async ( req,res,next) => {
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    
    const isMatch = await encrypt.comparepassword(email, password);
    if (!isMatch) {
        return handleUnauthorized(res, "Unauthorized");
    }
    const user = await AppDataSource.getRepository(Staff).findOne({ where: { email: email } });

    if (!user) {
        return handleUnauthorized(res, "Unauthorized");
    }

    delete user.password
    delete user.salt

    req.user = user
    
    next();
};