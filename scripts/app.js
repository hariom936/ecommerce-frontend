document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
  });

  const productGrid = document.getElementById('productGrid');
  const loadingMessage = document.getElementById('loadingMessage');
  const errorMessage = document.getElementById('errorMessage');

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
          <button class="add-to-cart">Add to Cart</button>
        `;

        productGrid.appendChild(productCard);
      });
    })
    .catch((error) => {
      loadingMessage.style.display = 'none';
      errorMessage.textContent = `Error loading products: ${error.message}`;
    });
});
