import { connect } from 'mongoose'
import { ConnectionOptions } from 'tls';

export const mongooseLoader = async (): Promise<void> => {
    try {
        await connect(process.env.DB||'');
    } catch (error) {
        process.exit(this);
    }
}; 