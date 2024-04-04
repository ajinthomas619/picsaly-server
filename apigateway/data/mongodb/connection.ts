import mongoose from 'mongoose';
import { MongoDBUserDataSource } from './source';

export const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/picsaly-user-service');
        console.log('Database Connected 💾');
        return new MongoDBUserDataSource();
    } catch (error) {
        console.log(error);
    }
};