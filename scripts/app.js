// scripts/app.js
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const productGrid = document.getElementById('productGrid');
  const loadingMessage = document.getElementById('loadingMessage');
  const errorMessage = document.getElementById('errorMessage');
  const cartBadge = document.querySelector('.cart-icon .badge');

  hamburger.addEventListener('click', () => {
    mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
  });

  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartBadge.textContent = cart.length;
  }

  function displayProducts(products) {
    loadingMessage.style.display = 'none';
    products.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
        <a href="product.html?id=${product.id}" class="product-link">
          <img class="product-image" src="${product.image}" alt="${product.title}" loading="lazy" />
          <div class="product-details">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
          </div>
        </a>
        <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
      `;

      productGrid.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('data-id');
        const title = e.target.getAttribute('data-title');
        const price = parseFloat(e.target.getAttribute('data-price'));
        const image = e.target.getAttribute('data-image');
        addToCart({ id: parseInt(productId), title, price, image });
      });
    });
  }

  function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch products.');
        return response.json();
      })
      .then((data) => {
        displayProducts(data);
      })
      .catch((error) => {
        loadingMessage.style.display = 'none';
        errorMessage.textContent = `Error loading products: ${error.message}`;
      });
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // You might want to increase the quantity here if implementing that feature on the main page
      console.log('Product already in cart');
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartBadge();
      console.log('Product added to cart');
    }
  }

  updateCartBadge();
  fetchProducts();
});