import { compare, genSalt, hash } from "bcrypt";
import jwt from 'jsonwebtoken'

import { User } from "./user.entity";

export class UsersService {
    static async createUser(email: string, password: string, fullname: string, birthdate: Date, lastLogin: Date) {
        const existingUser = await User.findOne({ email });

        if (existingUser) throw new Error('User already exists');

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const user = new User({
            email,
            password: hashedPassword,
            fullname,
            birthdate,
            lastLogin
        });

        console.log(user);
        return await user.save();
    }

    static async loginUser(email: string, password: string): Promise<Error | string> {
        const user = await User.findOne({ email });

        if (!user) throw new Error('User doesn\'t exists');

        const passwordCheck = await compare(password, user.password);

        if (!passwordCheck) throw new Error('Email or password is incorrect');

        const token = jwt.sign({
            email: user.email,
        }, "SECRETKEY");

        await this.updateUserToken(email, token);
        await this.updateLastLogin(email);

        return token;
    }

    static async updateUserToken(email: string, token: string): Promise<void> {
        await User.findOneAndUpdate(
            { email }, 
            {$set: { tokens: [{ access: 'user', token }] },
        });
    }

    static async updateLastLogin(email: string): Promise<void> {
        await User.findOneAndUpdate(
            { email }, {
            $set: {
                lastLogin: new Date()
            },
        }, {
            new: true
        });
    }
}