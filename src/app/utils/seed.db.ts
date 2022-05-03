import { User, UserType } from "../../modules/users/user.entity";
import { UsersService } from "../../modules/users/user.service";

// Seeds initial data into the db
export const seedDb = async () => {
    try {
        await User.deleteMany();

        const users: UserType[] = [
            {
                "email": "peter@dev.com",
                "password": await UsersService.generateHash('PassWord'),
                "fullname": "Peter Jackson",
                "birthdate": new Date()
            },
            {
                "email": "mike@dev.com",
                "password": await UsersService.generateHash('PassWord'),
                "fullname": "Mike Black",
                "birthdate": new Date()
            },
            {
                "email": "sue@dev.com",
                "password": await UsersService.generateHash('PassWord'),
                "fullname": "Sue Hopkins",
                "birthdate": new Date()
            },
        ];
        
        await User.insertMany(users);

    } catch {
        throw new Error('Faild to seed to database');
    }
};