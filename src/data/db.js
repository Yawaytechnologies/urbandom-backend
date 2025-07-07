import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL= process.env.DB_URL ;

 const db= async () => {
    try {
      if (!DB_URL) throw new Error('DB_URL is not defined in the environment variables');
      await mongoose.connect(DB_URL);
      console.log('Connected to DB!!!!');
    } catch (err) {
      console.error('Database connection error:', err.message);
      process.exit(1);
    }
  };

  export default db;
