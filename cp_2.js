const apiUrl = 'https://www.course-api.com/javascript-store-products';

// Step 3: Fetch using .then() and .catch()
function fetchProductsThen() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(products => {
            console.log("--- Products from fetchProductsThen ---");
            products.forEach(product => {
                console.log(product.fields.name);
            });
        })
        .catch(error => {
            handleError(error);
        });
}

// Step 4: Fetch using async/await and try/catch
async function fetchProductsAsync() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        handleError(error);
    }
}

// Step 5: Display products in the DOM
function displayProducts(products) {
    const container = document.getElementById('product-container');
    
    // Select only the first 5 products
    const limitedProducts = products.slice(0, 5);

    limitedProducts.forEach(product => {
        const { name, price, image } = product.fields;
        const imageUrl = image[0].url;

        // Create the card element
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Note: price is often in cents in this API, dividing by 100 for dollars
        productCard.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <h3>${name}</h3>
            <p>$${price / 100}</p>
        `;

        container.appendChild(productCard);
    });
}

// Step 6: Custom Error Handler
function handleError(error) {
    console.error(`An error occurred: ${error.message}`);
    const container = document.getElementById('product-container');
    container.innerHTML += `<p style="color: red;">Failed to load products. Please try again later.</p>`;
}

// Step 7: Call both functions
fetchProductsThen();
fetchProductsAsync();