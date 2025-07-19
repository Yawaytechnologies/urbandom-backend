import dotenv from 'dotenv';
import express from 'express';
import db from './src/data/db.js';
import cors from 'cors';
import { swaggerServe, swaggerSetup } from './src/config/swagger.js';
import routeuser from './src/api/users/user.route.js';  
import { verifyToken } from './src/middlewares/jwtauth.js';  
import mongoose from 'mongoose';import CountryRoute from './src/api/country/country.route.js';
import StateRoute from './src/api/state/state.route.js';
import DistrictRoute from './src/api/district/district.route.js';
import LocationRoute from './src/api/location/location.route.js';
import PropertyRoute from './src/api/properties/property.route.js';
import OwnerRoute from './src/api/sellproperty/owner.route.js';


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
  app.use ('/api/owner', OwnerRoute);
  // app.use(verifyToken);





app.use('/api/country', CountryRoute);
app.use('/api/state', StateRoute);
app.use('/api/district', DistrictRoute);
app.use('/api/location', LocationRoute);
app.use('/api/property', PropertyRoute);







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
   /*  console.log("Connected to DB!!!!"); */
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
});


export default server;