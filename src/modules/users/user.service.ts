import { compare, genSalt, hash } from "bcrypt";
import jwt, { verify } from 'jsonwebtoken'
import { Date } from "mongoose";

import { User, UserType } from "./user.entity";

export class UsersService {
    static async getUserByToken(token: string, email: string): Promise<UserType|null> {
        return await User.findOne({
            email,
            "tokens.token": token
        });
    }

    static async createUser(email: string, password: string, fullname: string, birthdate: Date, lastLogin: Date) {
        const existingUser = await User.findOne({ email });

        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await this.generateHash(password);

        const user = new User({
            email,
            password: hashedPassword,
            fullname,
            birthdate,
            lastLogin
        });

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

    static async updateUser(email: string, fullname: string, birthdate: Date, password: string): Promise<UserType|null> {
        let hashedPassword = undefined;
        if(password){
            hashedPassword = await this.generateHash(password);
        }

        return await User.findOneAndUpdate<UserType>(
            { email },
            {
                $set: {
                    password: hashedPassword,
                    fullname,
                    birthdate
                },
            }, {
            new: true
        }
        );
    }

    static async updateUserToken(email: string, token: string): Promise<void> {
        await User.findOneAndUpdate(
            { email },
            {
                $set: { tokens: [{ access: 'user', token }] },
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

    static verifyToken(token: string) {
        try {
            return verify(token, 'SECRETKEY', { complete: false });
        } catch (error) {
            throw error;
        }
    }

    static async generateHash(plainPassword: string): Promise<string>{
        const salt = await genSalt(10);
        return await hash(plainPassword, salt);
    }
}