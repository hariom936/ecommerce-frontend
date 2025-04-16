// scripts/product.js
document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    const mainProductImage = document.getElementById('mainProductImage');
    const productTitle = document.getElementById('productTitle');
    const productDescription = document.getElementById('productDescription');
    const productPrice = document.getElementById('productPrice');
    const quantityInput = document.getElementById('quantity');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const addToCartMessage = document.getElementById('addToCartMessage');
    const errorMessage = document.getElementById('errorMessage');
    const cartBadge = document.querySelector('.cart-icon .badge');
    const quantityPlusBtn = document.querySelector('.quantity-selector .plus');
    const quantityMinusBtn = document.querySelector('.quantity-selector .minus');
  
    function updateCartBadge() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartBadge.textContent = cart.length;
    }
  
    function fetchProductDetails(id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch product details.');
          return response.json();
        })
        .then((product) => {
          displayProductDetails(product);
        })
        .catch((error) => {
          errorMessage.textContent = `Error loading product details: ${error.message}`;
        });
    }
  
    function displayProductDetails(product) {
      mainProductImage.src = product.image;
      mainProductImage.alt = product.title;
      productTitle.textContent = product.title;
      productDescription.textContent = product.description;
      productPrice.textContent = product.price.toFixed(2);
    }
  
    function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const quantity = parseInt(quantityInput.value);
      const existingItem = cart.find(item => item.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartBadge();
      addToCartMessage.textContent = `${quantity} item(s) of "${product.title}" added to cart!`;
      setTimeout(() => {
        addToCartMessage.textContent = '';
      }, 3000);
    }
  
    if (productId) {
      fetchProductDetails(productId);
    } else {
      errorMessage.textContent = 'No product ID specified.';
    }
  
    addToCartBtn.addEventListener('click', () => {
      if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
          .then(response => response.json())
          .then(productData => {
            addToCart(productData);
          })
          .catch(error => {
            errorMessage.textContent = `Error adding to cart: ${error.message}`;
          });
      }
    });
  
    quantityPlusBtn.addEventListener('click', () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });
  
    quantityMinusBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  
    updateCartBadge();
  });