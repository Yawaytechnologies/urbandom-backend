import dotenv from 'dotenv';
import express from 'express';
import db from './src/data/db.js';
import cors from 'cors';
import { swaggerServe, swaggerSetup } from './src/config/swagger.js';


dotenv.config()



const app = express();

const PORT = process.env.PORT;

// Swagger route

  app.use('/api-docs', swaggerServe, swaggerSetup);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



app.get('/', (req, res) => {
    res.send('Server is running');
  });

db();

const server = app.listen(PORT, async () => {
    console.log(`⚡️⚡️⚡️[server]: Server is running at http://localhost:${PORT} ⚡️⚡️⚡️`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});


export default server;