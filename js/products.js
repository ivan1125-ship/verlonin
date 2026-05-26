/* ============================================
   VELRON - Products Data & Filtering
   ============================================ */

'use strict';

// ============================================
// PRODUCTS DATABASE
// ============================================
const PRODUCTS = [
  {
    id: 'p001',
    name: 'Speed Mode On - White Oversized Tee',
    category: 'T-Shirts',
    price: 799,
    originalPrice: 999,
    badge: 'bestseller',
    image: 'assets/images/4DC547EF-5581-4846-805F-71607DD4D612.jpeg',
    imageHover: 'assets/images/82D4E5C3-1EDD-43B3-8CA2-C92C1679E8BB.png',
    colors: ['#ffffff', '#1a1a1a'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 124,
    tags: ['oversized', 'graphic', 'premium'],
    description: 'Built for speed. Made for legacy. Our signature oversized tee featuring the iconic Speed Mode On graphic. Crafted from 100% premium cotton for maximum comfort and a bold statement.',
    features: ['100% Premium Cotton', 'Oversized Regular Fit', 'Ultra Soft Feel', 'Pre-shrunk Fabric', 'Ribbed collar']
  },
  {
    id: 'p002',
    name: 'Ferrari Formula 1 Scuderia Tee',
    category: 'T-Shirts',
    price: 899,
    originalPrice: 1099,
    badge: 'new',
    image: 'assets/images/661791F6-72DC-4521-86FB-F8A357F9A507.jpeg',
    imageHover: 'assets/images/661791F6-72DC-4521-86FB-F8A357F9A507.jpeg',
    colors: ['#ffffff'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 87,
    tags: ['formula1', 'ferrari', 'graphic'],
    description: 'Speed. Style. Legacy. Fueled by passion, driven by legends. Our Ferrari Formula 1 Scuderia tee pays tribute to the greatest racing legacy in history.',
    features: ['100% Premium Cotton', 'Regular Fit', 'Ultra Soft Feel', 'Detailed back print', 'Ribbed collar']
  },
  {
    id: 'p003',
    name: 'Speed Mode On - Black Oversized Tee',
    category: 'T-Shirts',
    price: 799,
    originalPrice: 999,
    badge: 'bestseller',
    image: 'assets/images/82D4E5C3-1EDD-43B3-8CA2-C92C1679E8BB.png',
    imageHover: 'assets/images/4DC547EF-5581-4846-805F-71607DD4D612.jpeg',
    colors: ['#1a1a1a', '#ffffff'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 156,
    tags: ['oversized', 'graphic', 'premium', 'black'],
    description: 'The dark side of speed. Our signature Speed Mode On graphic on a premium black oversized tee. Built to make a statement wherever you go.',
    features: ['100% Premium Cotton', 'Oversized Regular Fit', 'Ultra Soft Feel', 'Built to Last', 'Pre-shrunk Fabric']
  },
  {
    id: 'p004',
    name: 'Ford Mustang Mach 1 Heritage Tee',
    category: 'T-Shirts',
    price: 849,
    originalPrice: 1049,
    badge: 'new',
    image: 'assets/images/IMG_4627.png',
    imageHover: 'assets/images/IMG_4627.png',
    colors: ['#1a1a1a'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 63,
    tags: ['mustang', 'ford', 'graphic', 'black'],
    description: 'Engineered for performance. The Ford Mustang Mach 1 Heritage tee celebrates the iconic muscle car with a bold graphic print on premium black cotton.',
    features: ['100% Premium Cotton', 'Regular Fit', 'Ultra Soft Feel', 'Bold Heritage Print', 'Ribbed collar']
  },
  {
    id: 'p005',
    name: 'Performance Division EST. 2026 Tee',
    category: 'T-Shirts',
    price: 849,
    originalPrice: 1049,
    badge: 'new',
    image: 'assets/images/8C7E5EAD-81B7-4BC6-B781-96B1C743CF7F.png',
    imageHover: 'assets/images/8C7E5EAD-81B7-4BC6-B781-96B1C743CF7F.png',
    colors: ['#1a1a1a'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 41,
    tags: ['performance', 'division', 'racing', 'black'],
    description: 'Fueled by passion. Driven by legends. The Performance Division tee marks the founding of a new era in men\'s fashion — EST. 2026. Vertical racing stripes meet bold typography.',
    features: ['100% Premium Cotton', 'Regular Fit', 'Ultra Soft Feel', 'Racing Stripe Design', 'Built to Last']
  }
];

// ============================================
// PRODUCT CARD HTML GENERATOR
// ============================================
function createProductCard(product) {
  const badgeMap = {
    new: '<span class="product-badge badge-new">New</span>',
    sale: '<span class="product-badge badge-sale">Sale</span>',
    bestseller: '<span class="product-badge badge-bestseller">Best Seller</span>'
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const colorDots = product.colors.map((c, i) =>
    `<span class="color-dot ${i === 0 ? 'active' : ''}" style="background:${c}" title="${c}"></span>`
  ).join('');

  return `
    <div class="product-card reveal" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
      <div class="product-card-image">
        ${product.badge ? badgeMap[product.badge] || '' : ''}
        <img class="product-card-img" src="${product.image}" alt="${product.name}" loading="lazy">
        <img class="product-card-img-hover" src="${product.imageHover}" alt="${product.name}" loading="lazy">
        <div class="product-card-actions">
          <button class="product-card-add">Add to Cart</button>
          <button class="product-card-wish" aria-label="Add to wishlist">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-card-info">
        <div class="product-card-category">${product.category}</div>
        <a href="product.html?id=${product.id}">
          <div class="product-card-name">${product.name}</div>
        </a>
        <div class="product-card-price">
          <span class="price-current">₹${product.price}</span>
          ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice}</span>` : ''}
          ${discount ? `<span style="font-size:0.75rem;color:#c0392b;font-weight:700">${discount}% off</span>` : ''}
        </div>
        <div class="product-card-colors">${colorDots}</div>
      </div>
    </div>
  `;
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(container, products, limit) {
  if (!container) return;
  const items = limit ? products.slice(0, limit) : products;
  container.innerHTML = items.map(createProductCard).join('');

  // Re-init cart buttons & wishlist for new cards
  if (window.VELRON?.addToCart) {
    document.querySelectorAll('.product-card-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest('.product-card');
        if (!card) return;
        const id = card.getAttribute('data-id');
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
          window.VELRON.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            size: 'M',
            color: 'Default'
          });
        }
        btn.textContent = 'Added!';
        setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1500);
      });
    });
  }

  // Re-init scroll reveal
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  if (window.IntersectionObserver) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    container.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }
}

// ============================================
// SHOP PAGE FILTERING & SORTING
// ============================================
function initShopPage() {
  const grid = document.querySelector('.shop-products-grid');
  if (!grid) return;

  let filteredProducts = [...PRODUCTS];
  let activeFilters = {
    categories: [],
    sizes: [],
    minPrice: 0,
    maxPrice: 10000
  };

  renderProducts(grid, filteredProducts);
  updateProductCount(filteredProducts.length);

  // Category filter
  document.querySelectorAll('.filter-option').forEach(option => {
    option.addEventListener('click', () => {
      const checkbox = option.querySelector('.filter-checkbox');
      if (!checkbox) return;
      checkbox.classList.toggle('checked');

      const category = option.querySelector('.filter-option-label')?.textContent;
      if (!category) return;

      if (checkbox.classList.contains('checked')) {
        activeFilters.categories.push(category);
      } else {
        activeFilters.categories = activeFilters.categories.filter(c => c !== category);
      }
      applyFilters();
    });
  });

  // Size filter
  document.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const size = btn.textContent.trim();
      if (btn.classList.contains('active')) {
        activeFilters.sizes.push(size);
      } else {
        activeFilters.sizes = activeFilters.sizes.filter(s => s !== size);
      }
      applyFilters();
    });
  });

  // Sort
  const sortSelect = document.querySelector('.sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applyFilters();
    });
  }

  // Clear filters
  const clearBtn = document.querySelector('.sidebar-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeFilters = { categories: [], sizes: [], minPrice: 0, maxPrice: 10000 };
      document.querySelectorAll('.filter-checkbox').forEach(cb => cb.classList.remove('checked'));
      document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('active'));
      applyFilters();
    });
  }

  // View toggle
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-view');
      grid.className = `shop-products-grid ${view === 'list' ? 'grid-list' : view === '4' ? 'grid-4' : ''}`;
    });
  });

  // Filter sidebar toggle (mobile)
  const filterToggle = document.querySelector('.filter-toggle');
  const sidebar = document.querySelector('.shop-sidebar');
  if (filterToggle && sidebar) {
    filterToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  function applyFilters() {
    filteredProducts = PRODUCTS.filter(p => {
      if (activeFilters.categories.length && !activeFilters.categories.includes(p.category)) return false;
      if (activeFilters.sizes.length && !p.sizes.some(s => activeFilters.sizes.includes(s))) return false;
      if (p.price < activeFilters.minPrice || p.price > activeFilters.maxPrice) return false;
      return true;
    });

    const sortVal = document.querySelector('.sort-select')?.value;
    if (sortVal === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
    else if (sortVal === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
    else if (sortVal === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);
    else if (sortVal === 'newest') filteredProducts.sort((a, b) => (b.badge === 'new') - (a.badge === 'new'));

    renderProducts(grid, filteredProducts);
    updateProductCount(filteredProducts.length);
  }

  function updateProductCount(count) {
    const countEl = document.querySelector('.products-count');
    if (countEl) countEl.textContent = `${count} Product${count !== 1 ? 's' : ''}`;
  }
}

// ============================================
// PRODUCT DETAIL PAGE
// ============================================
function initProductPage() {
  const mainImage = document.querySelector('.product-main-img');
  if (!mainImage) return;

  // Get product from URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = productId ? PRODUCTS.find(p => p.id === productId) : PRODUCTS[0];

  if (!product) return;

  // Populate product details
  const nameEl = document.querySelector('.product-info-name');
  const priceEl = document.querySelector('.product-price-current');
  const origPriceEl = document.querySelector('.product-price-original');
  const categoryEl = document.querySelector('.product-info-category');
  const ratingCountEl = document.querySelector('.rating-count');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = `₹${product.price}`;
  if (origPriceEl && product.originalPrice) origPriceEl.textContent = `₹${product.originalPrice}`;
  if (categoryEl) categoryEl.textContent = product.category;
  if (ratingCountEl) ratingCountEl.textContent = `(${product.reviews} reviews)`;

  // Main image
  mainImage.src = product.image;
  mainImage.alt = product.name;

  // Thumbnails
  const thumbs = document.querySelectorAll('.product-thumb');
  thumbs.forEach((thumb, i) => {
    const imgSrc = i === 0 ? product.image : (product.imageHover || product.image);
    const img = thumb.querySelector('img');
    if (img) img.src = imgSrc;

    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImage.src = imgSrc;
    });
  });

  // Size selector
  const sizeBtns = document.querySelectorAll('.product-size-btn');
  let selectedSize = '';
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.textContent.trim();
    });
  });

  // Quantity
  let qty = 1;
  const qtyValue = document.querySelector('.qty-value');
  const qtyMinus = document.querySelector('.qty-btn.minus');
  const qtyPlus = document.querySelector('.qty-btn.plus');

  if (qtyValue && qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', () => {
      if (qty > 1) { qty--; qtyValue.textContent = qty; }
    });
    qtyPlus.addEventListener('click', () => {
      if (qty < 10) { qty++; qtyValue.textContent = qty; }
    });
  }

  // Add to cart
  const addToCartBtn = document.querySelector('.product-add-to-cart');
  if (addToCartBtn && window.VELRON?.addToCart) {
    addToCartBtn.addEventListener('click', () => {
      if (!selectedSize) {
        window.VELRON.showToast('Please select a size');
        return;
      }
      window.VELRON.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: selectedSize,
        color: 'Default',
        qty
      });
    });
  }

  // Buy Now
  const buyNowBtn = document.querySelector('.product-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      if (!selectedSize) {
        if (window.VELRON?.showToast) window.VELRON.showToast('Please select a size');
        return;
      }
      if (window.VELRON?.addToCart) {
        window.VELRON.addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          size: selectedSize,
          color: 'Default',
          qty
        });
      }
      window.location.href = 'cart.html';
    });
  }
}

// ============================================
// HOME PAGE PRODUCTS
// ============================================
function initHomeProducts() {
  const newArrivalsGrid = document.querySelector('.new-arrivals-grid');
  if (newArrivalsGrid) {
    renderProducts(newArrivalsGrid, PRODUCTS, 4);
  }

  const bestSellersGrid = document.querySelector('.best-sellers-grid');
  if (bestSellersGrid) {
    const bestSellers = PRODUCTS.filter(p => p.badge === 'bestseller');
    renderProducts(bestSellersGrid, bestSellers);
  }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHomeProducts();
  initShopPage();
  initProductPage();
});

window.VELRON = window.VELRON || {};
window.VELRON.PRODUCTS = PRODUCTS;
window.VELRON.createProductCard = createProductCard;
