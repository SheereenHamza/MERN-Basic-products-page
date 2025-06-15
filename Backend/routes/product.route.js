// import necessary libraries
import express from 'express';

// import models
import { Product } from '../models/product.model.js';

// Create router
const router = express.Router();

// Swagger component schemas - Product
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The product's name
 *              price:
 *                  type: number
 *                  description: The product's price
 *              category:
 *                  type: string
 *                  description: The product's category
 *              image:
 *                  type: string
 *                  description: url to the product's image
 * 
 *      ErrorResponse:
 *          type: object
 *          properties:
 *              success:
 *                  type: boolean
 *                  description: Whether the requested operation was successfull or not
 *              message:
 *                  type: string
 *                  description: Error message
 */

// Swagger tags
/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Product management operations
 */

/**
 * @swagger
 * /product:
 *  get:
 *      tags: [Product]
 *      summary: Retrieve list of all products
 *      responses: 
 *          200: 
 *              description: Successfully retrieved list of all products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  type: array
 *                                  description: Array of products
 *                                  items:
 *                                      $ref: '#components/schemas/Product'
 *                      
 */
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
});

/**
 * @swagger
 * /product/{id}:
 *  get:
 *      tags: [Product]
 *      summary: Get product
 *      description: Get product given product ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of the product to be retrieved
 *            schema: 
 *              type: string  
 *      responses: 
 *          200: 
 *              description: Successfully retrieved the product
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  type: object
 *                                  description: Product with given productId
 *                                  $ref: '#components/schemas/Product'
 *          404:
 *              description: Product not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/ErrorResponse'
 */
router.get('/:id', async (req, res) => {
    const productId = req.params['id'];
    Product.findById(productId).then(product => {
        if (product && product !== null)
            res.status(200).json({ success: true, data: product });
        else throw new Error('Document not found');
    }).catch(error => {
        res.status(404).json({ success: false, message: 'Couldn\'t find the document' })
    });
});

/**
 * @swagger
 * /product:
 *  post:
 *      tags: [Product]
 *      summary: Create product
 *      description: Create product given product details 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/Product'
 *      responses: 
 *          201: 
 *              description: Successfully created the product
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  type: object
 *                                  description: Created product
 *                                  $ref: '#components/schemas/Product'
 *          400:
 *              description: Missing fields
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/ErrorResponse'
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/ErrorResponse'
 */
router.post('/', async (req, res) => {
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
})

/**
 * @swagger
 * /product/{id}:
 *  patch:
 *      tags: [Product]
 *      summary: Update product
 *      description: Update product given product ID and product details
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of the product to be updated
 *            schema: 
 *              type: string  
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/Product'
 *      responses: 
 *          200: 
 *              description: Successfully updated the product
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  type: object
 *                                  description: Updated product
 *                                  $ref: '#components/schemas/Product'
 *          404:
 *              description: Product not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/ErrorResponse'
 */
router.patch('/:id', async (req, res) => {
    // Get the product id and find the product
    const productId = req.params['id'];
    const newProductDetails = req.body;
    Product.findByIdAndUpdate(productId, newProductDetails, { new: true }).then(product => {
        if (!(product && product !== null)) throw new Error('Document not found');
        res.status(200).json({ success: true, data: product });
    }).catch(error => {
        res.status(404).json({ success: false, message: 'Couldn\'t find the document' })
    });
})

/**
 * @swagger
 * /product/{id}:
 *  delete:
 *      tags: [Product]
 *      summary: Delete product
 *      description: Delete product given product ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID of the product to be deleted
 *            schema: 
 *              type: string  
 *      responses: 
 *          200: 
 *              description: Successfully deleted the product
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                  type: object
 *                                  description: Deleted product
 *                                  $ref: '#components/schemas/Product'
 *          404:
 *              description: Product not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/ErrorResponse'
 */
router.delete('/:id', (req, res) => {
    // Get the product id and find the product
    const productId = req.params['id'];
    Product.findByIdAndDelete(productId).then(product => {
        res.status(200).json({ success: true, data: product });
    }).catch(error => {
        res.status(404).json({ success: false, message: 'Couldn\'t find the document' })
    });
})

export const productRoutes = router;
