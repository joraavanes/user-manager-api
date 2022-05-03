import { User } from "./user.entity";

export class UsersService {
    static async createUser(email: string, password: string) {
        //todo: Creates and stores a user to the database
        const user = new User({ email, password });
        console.log(user);
        return await user.save();
    }

    static async loginUser(email: string, password: string): Promise<any> {
        const user = await User.findOne({ email });

        if(!user) throw new Error('User doesn\'t exist');
    }
}