
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname));

// Product data
let products = [
    { id: 1, name: "Laptop", price: 50000, rating: 4.5 },
    { id: 2, name: "Mobile", price: 20000, rating: 4.2 },
    { id: 3, name: "Headphones", price: 2000, rating: 4.0 }
];

// API to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API to add a new product
app.post('/api/products', (req, res) => {
    const { name, price, rating } = req.body;

    if (!name || price === undefined || rating === undefined) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name,
        price: Number(price),
        rating: Number(rating)
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
