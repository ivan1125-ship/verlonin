/* ============================================
   VELRON - Slider / Carousel System
   ============================================ */

'use strict';

// ============================================
// HERO SLIDER
// ============================================
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let autoplayInterval;
  let isPaused = false;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() {
    goTo(current + 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(next, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      goTo(i);
      startAutoplay();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      stopAutoplay();
      goTo(diff > 0 ? current + 1 : current - 1);
      startAutoplay();
    }
  }, { passive: true });

  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    isPaused = true;
    stopAutoplay();
  });

  slider.addEventListener('mouseleave', () => {
    isPaused = false;
    startAutoplay();
  });

  // Initialize
  goTo(0);
  startAutoplay();
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================
function initTestimonialsSlider() {
  const sliderEl = document.querySelector('.testimonials-slider');
  if (!sliderEl) return;

  const track = sliderEl.querySelector('.testimonials-track');
  const cards = sliderEl.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  if (!cards.length) return;

  let current = 0;
  let autoplay;

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(autoplay); next(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(autoplay); prev(); startAutoplay(); });

  // Touch
  let touchStart = 0;
  sliderEl.addEventListener('touchstart', (e) => { touchStart = e.touches[0].clientX; }, { passive: true });
  sliderEl.addEventListener('touchend', (e) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      clearInterval(autoplay);
      diff > 0 ? next() : prev();
      startAutoplay();
    }
  }, { passive: true });

  function startAutoplay() {
    autoplay = setInterval(next, 4500);
  }

  goTo(0);
  startAutoplay();
}

// ============================================
// PRODUCT IMAGE ZOOM (Product page)
// ============================================
function initImageZoom() {
  const mainImg = document.querySelector('.product-main-img');
  const mainWrapper = document.querySelector('.product-main-image');
  if (!mainImg || !mainWrapper) return;

  mainWrapper.addEventListener('mousemove', (e) => {
    const rect = mainWrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mainImg.style.transformOrigin = `${x}% ${y}%`;
    mainImg.style.transform = 'scale(1.5)';
  });

  mainWrapper.addEventListener('mouseleave', () => {
    mainImg.style.transform = 'scale(1)';
    mainImg.style.transformOrigin = 'center center';
  });
}

// ============================================
// MARQUEE TICKER
// ============================================
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;

  const clone = track.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.parentNode.appendChild(clone);
}

// ============================================
// RELATED PRODUCTS SLIDER
// ============================================
function initRelatedSlider() {
  const container = document.querySelector('.related-products-slider');
  if (!container) return;

  const track = container.querySelector('.related-track');
  const prevBtn = container.querySelector('.related-prev');
  const nextBtn = container.querySelector('.related-next');
  if (!track) return;

  const cardWidth = track.querySelector('.product-card')?.offsetWidth || 280;
  const gap = 24;
  let offset = 0;

  const visibleCount = Math.floor(container.offsetWidth / (cardWidth + gap));
  const totalCards = track.children.length;
  const maxOffset = Math.max(0, (totalCards - visibleCount) * (cardWidth + gap));

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      offset = Math.min(offset + cardWidth + gap, maxOffset);
      track.style.transform = `translateX(-${offset}px)`;
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      offset = Math.max(0, offset - cardWidth - gap);
      track.style.transform = `translateX(-${offset}px)`;
    });
  }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initTestimonialsSlider();
  initImageZoom();
  initMarquee();
  initRelatedSlider();
});
