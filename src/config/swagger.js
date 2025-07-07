// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Urbondom API',
      version: '1.0.0',
      description: 'API documentation for the Tripsy project',
    },
    servers: [
      {
        url: 'http://localhost:5001',
      },
    ],
  },
  apis: ['./route/*.js'], // Make sure the path is correct
};

const specs = swaggerJsdoc(options);
const swaggerServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(specs);

export { swaggerServe, swaggerSetup };
