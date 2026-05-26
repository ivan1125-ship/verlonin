/* ============================================
   VELRON - Cart System
   ============================================ */

'use strict';

const VELRON_CART_KEY = 'velron_cart';

// ============================================
// CART STATE
// ============================================
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(VELRON_CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(VELRON_CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  updateCartCount();
}

function addToCart(product) {
  const cart = getCart();
  const key = `${product.id}-${product.size}-${product.color}`;
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.qty = Math.min(existing.qty + (product.qty || 1), 10);
  } else {
    cart.push({ ...product, key, qty: product.qty || 1 });
  }
  saveCart(cart);
  if (window.VELRON?.showToast) {
    window.VELRON.showToast('Added to cart');
  }
}

function removeFromCart(key) {
  const cart = getCart().filter(item => item.key !== key);
  saveCart(cart);
  renderCartPage();
}

function updateQty(key, qty) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (item) {
    if (qty <= 0) {
      removeFromCart(key);
      return;
    }
    item.qty = Math.min(qty, 10);
    saveCart(cart);
    renderCartPage();
  }
}

function clearCart() {
  saveCart([]);
  renderCartPage();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// ============================================
// CART BADGE UPDATE
// ============================================
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

// ============================================
// ADD TO CART BUTTONS
// ============================================
function initAddToCartButtons() {
  document.querySelectorAll('.product-card-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest('.product-card');
      if (!card) return;

      const product = {
        id: card.getAttribute('data-id') || Math.random().toString(36).substr(2, 9),
        name: card.querySelector('.product-card-name')?.textContent || 'Product',
        price: parseFloat(card.getAttribute('data-price') || card.querySelector('.price-current')?.textContent?.replace(/[^0-9.]/g, '') || 0),
        image: card.querySelector('.product-card-img')?.src || '',
        category: card.querySelector('.product-card-category')?.textContent || '',
        size: 'M',
        color: 'Default',
        qty: 1
      };

      addToCart(product);

      btn.textContent = 'Added!';
      btn.style.background = '#1a1a1a';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
      }, 1500);
    });
  });
}

// ============================================
// RENDER CART PAGE
// ============================================
function renderCartPage() {
  const cartItemsEl = document.querySelector('.cart-items');
  const cartEmptyEl = document.querySelector('.cart-empty');
  const cartContentEl = document.querySelector('.cart-content');

  if (!cartItemsEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (cartEmptyEl) cartEmptyEl.style.display = 'block';
    if (cartContentEl) cartContentEl.style.display = 'none';
    updateCartSummary();
    return;
  }

  if (cartEmptyEl) cartEmptyEl.style.display = 'none';
  if (cartContentEl) cartContentEl.style.display = 'grid';

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-category">${item.category}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Size: ${item.size} &nbsp;|&nbsp; Color: ${item.color}</div>
        <div class="cart-item-controls">
          <div class="cart-item-qty">
            <button class="cart-qty-btn qty-minus" data-key="${item.key}">−</button>
            <div class="cart-qty-num">${item.qty}</div>
            <button class="cart-qty-btn qty-plus" data-key="${item.key}">+</button>
          </div>
          <div class="cart-item-price">₹${(item.price * item.qty).toFixed(0)}</div>
          <button class="cart-item-remove" data-key="${item.key}">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Bind cart item events
  cartItemsEl.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      const item = getCart().find(i => i.key === key);
      if (item) updateQty(key, item.qty - 1);
    });
  });

  cartItemsEl.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      const item = getCart().find(i => i.key === key);
      if (item) updateQty(key, item.qty + 1);
    });
  });

  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      removeFromCart(key);
    });
  });

  updateCartSummary();
}

function updateCartSummary() {
  const total = getCartTotal();
  const subtotalEl = document.querySelector('.summary-subtotal');
  const totalEl = document.querySelector('.summary-total-value');
  const shippingEl = document.querySelector('.summary-shipping');

  const shipping = total > 999 ? 0 : 99;

  if (subtotalEl) subtotalEl.textContent = `₹${total.toFixed(0)}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  if (totalEl) totalEl.textContent = `₹${(total + shipping).toFixed(0)}`;
}

// Promo code
function initPromoCode() {
  const promoBtn = document.querySelector('.cart-promo-btn');
  if (!promoBtn) return;

  promoBtn.addEventListener('click', () => {
    const input = document.querySelector('.cart-promo-input');
    const code = input?.value.trim().toUpperCase();
    if (code === 'VELRON10') {
      if (window.VELRON?.showToast) window.VELRON.showToast('10% discount applied!');
    } else if (code) {
      if (window.VELRON?.showToast) window.VELRON.showToast('Invalid promo code', false);
    }
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initAddToCartButtons();

  if (document.querySelector('.cart-page')) {
    renderCartPage();
    initPromoCode();
  }
});

// Export
window.VELRON = window.VELRON || {};
window.VELRON.addToCart = addToCart;
window.VELRON.getCart = getCart;
window.VELRON.getCartCount = getCartCount;
