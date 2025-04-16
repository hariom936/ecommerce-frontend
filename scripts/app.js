document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
  });

  // Fetch and display products
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
      const productGrid = document.getElementById('productGrid');
      productGrid.innerHTML = '';
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart">Add to Cart</button>
        `;
        productGrid.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading products:', err);
    });
});
