document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const emptycartMessage = document.getElementById('empty-cart');
    const cartBadge = document.querySelector('.cart-icon .badge');
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.getElementById('hamburger');

    hamburger.addEventListener('click', () => {
        mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });

    function updatecartBadge() {
        const cart = getcartItems();
        cartBadge.textContent = cart.length;
    }

    function getcartItems() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function updatecartDisplay() {
        const cartItems = getcartItems();
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let total = 0;

        if (cartItems.length === 0) {
            emptycartMessage.style.display = 'block';
            cartTotalElement.textContent = '0.00';
        } else {
            emptycartMessage.style.display = 'none';
            cartItems.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                total += item.price * item.quantity;

                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="item-details">
                        <h4>${item.title}</h4>
                        <p class="item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">&#10006;</button>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
            cartTotalElement.textContent = total.toFixed(2);
        }
        updatecartBadge();
    }

    function removeItemFromcart(productId) {
        let cart = getcartItems();
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updatecartDisplay();
    }

    function changeItemQuantity(productId, change) {
        let cart = getcartItems();
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity < 1) {
                removeItemFromcart(productId);
                return;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updatecartDisplay();
        }
    }

    // Event listeners for quantity changes and item removal
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            removeItemFromcart(productId);
        } else if (event.target.classList.contains('quantity-btn')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const change = event.target.classList.contains('plus') ? 1 : -1;
            changeItemQuantity(productId, change);
        }
    });

    updatecartDisplay();
});