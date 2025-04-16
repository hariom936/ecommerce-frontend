document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
  });

  const productGrid = document.getElementById('productGrid');
  const loadingMessage = document.getElementById('loadingMessage');
  const errorMessage = document.getElementById('errorMessage');
  const cartBadge = document.querySelector('.cart-icon .badge');

  // Fetch products from API
  fetch('https://fakestoreapi.com/products')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch products.');
      return response.json();
    })
    .then((products) => {
      loadingMessage.style.display = 'none';
      products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
          <img class="product-image" src="${product.image}" alt="${product.title}" loading="lazy" />
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
      });

      // Add event listener for "Add to Cart" buttons
      document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', (e) => {
          const productId = e.target.getAttribute('data-id');
          addToCart(productId);
        });
      });
    })
    .catch((error) => {
      loadingMessage.style.display = 'none';
      errorMessage.textContent = `Error loading products: ${error.message}`;
    });

  // Add to Cart function
  function addToCart(productId) {
    // Retrieve existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fetch product details based on ID
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch product data.');
        return response.json();
      })
      .then((product) => {
        const productData = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        };

        // Add product to the cart if not already present
        if (!cart.some((item) => item.id === productData.id)) {
          cart.push(productData);
          localStorage.setItem('cart', JSON.stringify(cart));

          // Update cart count
          cartBadge.textContent = cart.length;
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  }
});
