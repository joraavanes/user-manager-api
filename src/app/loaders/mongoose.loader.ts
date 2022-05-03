import { connect } from 'mongoose'

export const mongooseLoader = async (): Promise<void> => {
    try {
        await connect(process.env.DB||'mongodb://localhost:27017/climedo-test');
    } catch (error) {
        process.exit(this);
    }
}; 