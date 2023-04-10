import { connect, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDatabase(): Promise<void> {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME!,
  } as ConnectOptions; 
  try {
    await connect(process.env.MONGODB_URI!, options);
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
  }
}

export default connectToDatabase;
