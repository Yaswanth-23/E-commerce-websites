document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartLink = document.getElementById('cart-link');
    const closeModal = document.querySelector('.close');
    const cartItems = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-button');

    // Fetch products from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error fetching products:', error));

    function displayProducts(products) {
        const productsContainer = document.getElementById('products');
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button data-id="${product.id}">Add to Cart</button>
            `;
            productsContainer.appendChild(productElement);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.product button').forEach(button => {
            button.addEventListener('click', () => addToCart(button.dataset.id));
        });
    }

    function addToCart(productId) {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    cart.push(product);
                    cartCount.innerText = cart.length;
                }
            })
            .catch(error => console.error('Error adding to cart:', error));
    }

    cartLink.onclick = function() {
        displayCart();
        cartModal.style.display = "block";
    };

    closeModal.onclick = function() {
        cartModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = "none";
        }
    };

    function displayCart() {
        cartItems.innerHTML = '';
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `<p>${product.name} - ${product.price}</p>`;
            cartItems.appendChild(cartItem);
        });
    }

    checkoutButton.onclick = function() {
        alert('Checkout functionality not implemented');
    };
});