// import necessary libraries
import express from 'express';
import dotenv from 'dotenv';

// import DB connection async function
import { connectDB } from './config/db.js';
import { Product } from './models/product.model.js';

const app = express();

// load .env file contents to process.env
dotenv.config();

// Middleware that allows us to accept JSON in req.body
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hellooooo !!!')
});

// ------------------------------ PRODUCTS ------------------------------
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
});

app.get('/products/:id', async (req, res) => {
    const productId = req.params['id'];
    Product.findById(productId).then(product => {
        if (product && product !== null)
            res.status(200).json({ success: true, data: product });
        else throw new Error('Document not found');
    }).catch(error => {
        res.status(500).json({ success: false, message: 'Couldn\'t find the document' })
    });
});

app.post('/products', async (req, res) => {
    // Validate req body
    if (!(req.body && req.body.name && req.body.category && req.body.image && req.body.price))
        return res.status(400).json({ success: false, message: 'Please provide all fields' });

    // Create and save new product
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error!' });
    }
})

app.patch('/products/:id', async (req, res) => {
    // Get the product id and find the product
    const productId = req.params['id'];
    const newProductDetails = req.body;
    Product.findByIdAndUpdate(productId, newProductDetails, { new: true }).then(product => {
        if (!(product && product !== null)) throw new Error('Document not found');
        res.status(200).json({ success: true, data: product });
    }).catch(error => {
        res.status(500).json({ success: false, message: 'Couldn\'t find the document' })
    });
})

app.delete('/products/:id', (req, res) => {
    // Get the product id and find the product
    const productId = req.params['id'];
    Product.findByIdAndDelete(productId).then(product => {
        res.status(200).json({ success: true, data: product });
    }).catch(error => {
        res.status(500).json({ success: false, message: 'Couldn\'t find the document' })
    });
})

app.listen(5000, () => {
    connectDB();
    console.log('Server running on http://localhost:5000... Welcome!')
});