// docs/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Urbondom API',
      version: '1.0.0',
      description: 'API documentation for the Urbondom real estate project',
    },
    servers: [
      {
        url: 'http://localhost:5001/api',
        description: 'Local Development Server',
      },
    ],
  },
  apis: ['./src/api/**/*.js', './swagger/*.js'], // ✅ Fixed path
};

const specs = swaggerJsdoc(options);

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(specs);
