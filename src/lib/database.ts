import mongoose from 'mongoose';
import '@/models'

let isConnected = false; // track the connection

export const connectToDB = async (): Promise<void> => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DB_NAME
    });

    isConnected = true;
    
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
