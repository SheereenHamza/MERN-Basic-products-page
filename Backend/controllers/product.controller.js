// import necessary libraries
import mongoose from 'mongoose';

// import models
import { Product } from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
};

export const getProductById = async (req, res) => {
    const productId = req.params['id'];

    // Throw 404 error if product id is invalid
    if (!mongoose.Types.ObjectId.isValid(productId))
        res.status(404).json({ success: false, message: "Invalid product ID" });

    Product.findById(productId).then(product => {
        if (product && product !== null)
            res.status(200).json({ success: true, data: product });
        else throw new Error('Document not found');

    }).catch(error => {
        res.status(500).json({ success: false, message: 'Server Error' })
    });
};

export const createProduct = async (req, res) => {
    // Validate req body
    if (!(req.body && req.body.name !== null && req.body.category !== null && req.body.image !== null && req.body.price !== null))
        return res.status(400).json({ success: false, message: 'Please provide all fields' });

    // Create and save new product
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error!' });
    }
};

export const updateProductById = async (req, res) => {
    // Get the product id and find the product
    const productId = req.params['id'];
    const newProductDetails = req.body;

    // Throw 404 error if product id is invalid
    if (!mongoose.Types.ObjectId.isValid(productId))
        res.status(404).json({ success: false, message: "Invalid product ID" });

    Product.findByIdAndUpdate(productId, newProductDetails, { new: true }).then(product => {
        if (!(product && product !== null)) res.status(404).json({ success: false, message: "Document not found" });
        res.status(200).json({ success: true, data: product });
    }).catch(error => {
        res.status(500).json({ success: false, message: 'Server Error' })
    });
};

export const deleteProductByid = (req, res) => {
    // Get the product id and find the product
    const productId = req.params['id'];

    // Throw 404 error if product id is invalid
    if (!mongoose.Types.ObjectId.isValid(productId))
        res.status(404).json({ success: false, message: "Invalid product ID" });

    Product.findByIdAndDelete(productId).then(product => {
        res.status(200).json({ success: true, data: product });
    }).catch(error => {
        res.status(500).json({ success: false, message: 'Server Error' })
    });
};