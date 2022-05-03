import { Schema, model } from 'mongoose'

type Token = {
    access: string;
    token: string;
};

export type UserType = {
    email: string,
    password: string,
    fullname: string,
    role: string,
    birthdate: Date,
    lastLogin?: Date,
    tokens?: Token[];
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
    role:{
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    lastLogin: {
        type: Date
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

export const User = model('users', UserSchema);
