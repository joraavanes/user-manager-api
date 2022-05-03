import { Schema, model } from 'mongoose'

export type UserType = {
    email: string,
    password: string,
    fullname: string,
    birthdate: Date,
    lastLogin?: Date
};

const UserSchema = new Schema<UserType>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    lastLogin: {
        type: Date
    }
});

export const User = model('users', UserSchema);
