document.addEventListener('DOMContentLoaded', () => {
    const mainProductImage = document.getElementById('mainProductImage');
    const productTitle = document.getElementById('productTitle');
    const productDescription = document.getElementById('productDescription');
    const productPrice = document.getElementById('productPrice');
    const quantityInput = document.getElementById('quantity');
    const quantityMinusBtn = document.querySelector('.quantity-selector .minus');
    const quantityPlusBtn = document.querySelector('.quantity-selector .plus');
    const addTocartBtn = document.getElementById('addTocartBtn');
    const addTocartMessage = document.getElementById('addTocartMessage');
    const errorMessage = document.getElementById('errorMessage');
    const cartBadge = document.querySelector('.cart-icon .badge');
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.getElementById('hamburger');

    hamburger.addEventListener('click', () => {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });

    function updatecartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartBadge.textContent = cart.length;
    }

    function getProductIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function fetchProductDetails(productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(product => {
                displayProductDetails(product);
                // Attach event listener for adding to cart after product details are loaded
                addTocartBtn.addEventListener('click', () => {
                    addTocart(product);
                });
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                errorMessage.textContent = 'Failed to load product details.';
            });
    }

    function displayProductDetails(product) {
        mainProductImage.src = product.image;
        mainProductImage.alt = product.title;
        productTitle.textContent = product.title;
        productDescription.textContent = product.description;
        productPrice.textContent = product.price.toFixed(2);
    }

    function addTocart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);
        const quantity = parseInt(quantityInput.value);

        if (existingItem) {
            // Update quantity if the item is already in the cart
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updatecartBadge();
        addTocartMessage.textContent = `${product.title} added to cart!`;
        addTocartMessage.classList.add('show');
        setTimeout(() => {
            addTocartMessage.classList.remove('show');
        }, 3000);
    }

    const productId = getProductIdFromUrl();
    if (productId) {
        fetchProductDetails(productId);
    } else {
        errorMessage.textContent = 'Invalid product ID.';
    }

    quantityMinusBtn.addEventListener('click', () => {
        quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
    });

    quantityPlusBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    updatecartBadge(); // Initial update of the cart badge
});