import dotenv from 'dotenv';
import express from 'express';
import db from './src/data/db.js';
import cors from 'cors';
import { swaggerServe, swaggerSetup } from './src/config/swagger.js';
import routeuser from './src/api/users/user.route.js';  
import { verifyToken } from './src/middlewares/jwtauth.js';  
import mongoose from 'mongoose';

dotenv.config()



const app = express();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Swagger route

  app.use('/api-docs', swaggerServe, swaggerSetup);
  app.use("/api/user", routeuser);
  app.use(verifyToken);






app.get('/', (req, res) => {
    res.send('Server is running');
  });

db();

const server = app.listen(PORT, async () => {
    console.log(`⚡️⚡️⚡️[server]: Server is running at http://localhost:${PORT} ⚡️⚡️⚡️`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    try {
    if (!DB_URL)
      throw new Error("DB_URL is not defined in the environment variables");
    await mongoose.connect(DB_URL);
    console.log("Connected to DB!!!!");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
});


export default server;