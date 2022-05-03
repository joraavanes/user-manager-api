import { compare, genSalt, hash } from "bcrypt";
import { sign, verify } from 'jsonwebtoken'
import { Date } from "mongoose";

import { User, UserType } from "./user.entity";

export class UsersService {
    private static JwtSecret = process.env.JWT_SECRET || 'JWT_SECRET_KEY'

    // Finds user based on stored token
    static async getUserByToken(token: string): Promise<UserType | null> {
        return await User.findOne({
            "tokens.token": token
        });
    }

    // User sign up with password hashing
    static async createUser(email: string, password: string, fullname: string, birthdate: Date, lastLogin: Date) {
        const existingUser = await User.findOne({ email });

        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await this.generateHash(password);

        const user = new User({
            email,
            password: hashedPassword,
            fullname,
            role: 'user',
            birthdate,
            lastLogin
        });

        return await user.save();
    }

    // Logs in the user by email & password and generates jwt token
    static async loginUser(email: string, password: string): Promise<Error | string> {
        const user = await User.findOne({ email });

        if (!user) throw new Error('User doesn\'t exists');

        const passwordCheck = await compare(password, user.password);

        if (!passwordCheck) throw new Error('Email or password is incorrect');

        const token = sign({
            email: user.email,
        }, this.JwtSecret);

        await this.updateUserToken(email, token);
        await this.updateLastLogin(email);

        return token;
    }

    // Logs out user by removing user token(s)
    static async logoutUser(token: string) {
        const user = await this.getUserByToken(token);

        if (!user) throw new Error('User doesn\'t exists');

        return await User.findOneAndUpdate(
            {
                email: user.email
            },
            {
                $set: {
                    tokens: []
                }
            }
        );
    }

    // Updates the user data based on user email
    static async updateUser(email: string, fullname: string, birthdate: Date, password: string): Promise<UserType | null> {
        let hashedPassword = undefined;
        if (password) {
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

    // Updates the user token
    static async updateUserToken(email: string, token: string): Promise<void> {
        await User.findOneAndUpdate(
            { email },
            {
                $set: { tokens: [{ token }] },
            });
    }

    // Updates the last user login date
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

    // Verifies the jwt
    static verifyToken(token: string) {
        try {
            return verify(token, this.JwtSecret , { complete: false });
        } catch (error) {
            throw error;
        }
    }

    // Hashes the plain password using bcrypt package
    static async generateHash(plainPassword: string): Promise<string> {
        const salt = await genSalt(10);
        return await hash(plainPassword, salt);
    }
}