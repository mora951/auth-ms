import dotenv from 'dotenv';
import mongoose from 'mongoose';

import dbConfig from './db_config';

const { getMongoUrl } = dbConfig;

dotenv.config();

let connected = false;

const connect = async (): Promise<void> => {
  if (!connected) {
    try {
      const mongoUrl = getMongoUrl();

      await mongoose.connect(mongoUrl, {});
      console.log('Database connected successfully!');
      connected = true;
    } catch (err: any) {
      console.error(err.message);
    }
  }
};

function isConnected(): boolean {
  return connected;
}

export { connect, isConnected };
