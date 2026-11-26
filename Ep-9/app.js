
const express = require("express");
const app = express();

const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Temporary product data
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        description: "A high-performance laptop"
    },
    {
        id: 2,
        name: "Mobile Phone",
        price: 25000,
        description: "A smartphone with a good camera"
    },
    {
        id: 3,
        name: "Headphones",
        price: 2000,
        description: "Wireless headphones"
    }
];

// 1. CREATE - Add a new product
app.post("/products", (req, res) => {
    const { name, price, description } = req.body;

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof description !== "string" ||
        !description.trim() ||
        price === undefined ||
        price === null ||
        price === "" ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
    ) {
        return res.status(400).json({
            message: "Please provide a valid name, price and description."
        });
    }

    const newProduct = {
        id: products.length
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name: name.trim(),
        price: Number(price),
        description: description.trim()
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully!",
        product: newProduct
    });
});

// 2. READ - Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// 3. READ - Get a single product by ID
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found!"
        });
    }

    res.json(product);
});

// 4. UPDATE - Update a product
app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found!"
        });
    }

    const { name, price, description } = req.body;

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof description !== "string" ||
        !description.trim() ||
        price === undefined ||
        price === null ||
        price === "" ||
        !Number.isFinite(Number(price)) ||
        Number(price) < 0
    ) {
        return res.status(400).json({
            message: "Please provide a valid name, price and description."
        });
    }

    product.name = name.trim();
    product.price = Number(price);
    product.description = description.trim();

    res.json({
        message: "Product updated successfully!",
        product
    });
});

// 5. DELETE - Delete a product
app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found!"
        });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    res.json({
        message: "Product deleted successfully!",
        product: deletedProduct
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
