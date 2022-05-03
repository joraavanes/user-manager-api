import { genSalt, hash } from "bcrypt";
import { User } from "./user.entity";

export class UsersService {
    static async createUser(email: string, password: string, fullname: string, birthdate: Date, lastLogin: Date) {
        const existingUser = await User.findOne({ email });

        if (existingUser) throw new Error('User doesn\'t exist');

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

    static async loginUser(email: string, password: string): Promise<any> {

    }
}