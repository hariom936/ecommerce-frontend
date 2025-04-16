document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const productGrid = document.getElementById('productGrid');
  const loadingMessage = document.getElementById('loadingMessage');
  const errorMessage = document.getElementById('errorMessage');
  const cartBadge = document.querySelector('.cart-icon .badge');
  const addTocartNotification = document.getElementById('addTocartNotification');

  hamburger.addEventListener('click', () => {
      mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
  });

  function updatecartBadge() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartBadge.textContent = cart.length;
  }

  function displayProducts(products) {
      loadingMessage.style.display = 'none';
      products.forEach((product) => {
          const productcart = document.createElement('div');
          productcart.classList.add('product-cart');

          productcart.innerHTML = `
              <a href="product.html?id=${product.id}" class="product-link">
                  <img class="product-image" src="${product.image}" alt="${product.title}" loading="lazy" />
                  <div class="product-details">
                      <h3 class="product-title">${product.title}</h3>
                      <p class="product-price">$${product.price.toFixed(2)}</p>
                  </div>
              </a>
              <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to cart</button>
          `;

          productGrid.appendChild(productcart);
      });

      document.querySelectorAll('.add-to-cart').forEach((button) => {
          button.addEventListener('click', (e) => {
              const productId = e.target.getAttribute('data-id');
              const title = e.target.getAttribute('data-title');
              const price = parseFloat(e.target.getAttribute('data-price'));
              const image = e.target.getAttribute('data-image');
              addTocart({ id: parseInt(productId), title, price, image });
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

  function showNotification() {
      addTocartNotification.classList.add('show');
      setTimeout(() => {
          addTocartNotification.classList.remove('show');
      }, 3000);
  }

  function addTocart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
          // You might want to increase the quantity here if implementing that feature on the main page
          console.log('Product already in cart');
          showNotification();
      } else {
          cart.push({ ...product, quantity: 1 });
          localStorage.setItem('cart', JSON.stringify(cart));
          updatecartBadge();
          console.log('Product added to cart');
          showNotification();
      }
  }

  updatecartBadge();
  fetchProducts();
});