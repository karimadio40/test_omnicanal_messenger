export function getRandomChar(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
}

export function generateRandomString(length=6) {
    const chars = '0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += getRandomChar(chars);
    }
    return randomString;
}

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export class encrypt {
    static async encryptpass(password: string, salt) {
        return bcrypt.hashSync(password, salt);
    }
    static comparepassword(hashPassword: string, password: string) {
        return bcrypt.compareSync(password, hashPassword);
    }

    static generateToken(payload: any) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
    }

    static async generateSalt() {
        return await bcrypt.genSalt();
    }
}