import { connect } from 'mongoose'
import { ConnectionOptions } from 'tls';

export const mongooseLoader = async (): Promise<void> => {
    try {
        await connect('mongodb://localhost:27017/express-playground');
    } catch (error) {
        process.exit(this);
    }
}; 