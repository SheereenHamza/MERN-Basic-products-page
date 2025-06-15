// import necessary libraries
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

// import DB connection async function
import { connectDB } from './config/db.js';

// import routes
import { productRoutes } from './routes/product.route.js';

// import swagger documentation configuration
import { swaggerDocs } from './swagger.js';

const app = express();
const PORT = process.env.PORT || 5000;

// load .env file contents to process.env
dotenv.config();

// Middleware that allows us to accept JSON in req.body
app.use(express.json());

// Swagger documentation middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ------------------------------ HOME routes ------------------------------
app.get('/', (req, res) => {
    res.send('Hellooooo !!!')
});

// ------------------------------ PRODUCTS routes ------------------------------
app.use('/product', productRoutes)

// start the server and make it listen on port 5000
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}... Welcome!`);
});