
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');

// Fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        productList.innerHTML = '';

        products.forEach(product => {
            const div = document.createElement('div');

            div.className = 'product';

            div.innerHTML = `
                <h3>${product.name}</h3>
                <p>ID: ${product.id}</p>
                <p>Price: ₹${product.price}</p>
                <p>Rating: ${product.rating} / 5</p>
            `;

            productList.appendChild(div);
        });
    } catch (error) {
        productList.textContent = 'Unable to load products.';
        console.error(error);
    }
}

// Add new product
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const price = Number(document.getElementById('price').value);
    const rating = Number(document.getElementById('rating').value);

    if (!name || price < 0 || rating < 0 || rating > 5) {
        alert('Please enter valid product details.');
        return;
    }

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                price,
                rating
            })
        });

        if (!response.ok) {
            throw new Error('Unable to add product');
        }

        alert('Product added successfully!');

        productForm.reset();

        fetchProducts();

    } catch (error) {
        alert(error.message);
    }
});

// Load products when page opens
fetchProducts();
