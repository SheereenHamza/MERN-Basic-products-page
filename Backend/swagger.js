// import necessary libraries
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from 'dotenv';

dotenv.config();

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Basic product page',
        version: '1.0.0',
        description: 'APIs for products',
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}`
        }
    ]
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routes/*.js', './server.js'], // Path to the API routes in your Node.js application
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);