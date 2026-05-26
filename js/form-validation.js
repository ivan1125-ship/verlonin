/* ============================================
   VELRON - Form Validation
   ============================================ */

'use strict';

// ============================================
// VALIDATORS
// ============================================
const validators = {
  required: (val) => val.trim() !== '',
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  minLength: (len) => (val) => val.length >= len,
  phone: (val) => /^[6-9]\d{9}$/.test(val.replace(/\s/g, '')),
  name: (val) => val.trim().length >= 2
};

// ============================================
// FIELD VALIDATION
// ============================================
function validateField(input) {
  const rules = input.getAttribute('data-validate')?.split(',') || [];
  const value = input.value;
  const errorEl = input.closest('.form-group')?.querySelector('.form-error');

  let isValid = true;
  let errorMessage = '';

  for (const rule of rules) {
    const [type, ...params] = rule.trim().split(':');
    let passes = true;

    switch(type) {
      case 'required':
        passes = validators.required(value);
        errorMessage = 'This field is required';
        break;
      case 'email':
        passes = validators.email(value);
        errorMessage = 'Please enter a valid email address';
        break;
      case 'minLength':
        passes = validators.minLength(parseInt(params[0]))(value);
        errorMessage = `Minimum ${params[0]} characters required`;
        break;
      case 'phone':
        passes = validators.phone(value);
        errorMessage = 'Please enter a valid 10-digit phone number';
        break;
      case 'name':
        passes = validators.name(value);
        errorMessage = 'Please enter a valid name';
        break;
      case 'match':
        const matchEl = document.querySelector(`[name="${params[0]}"]`);
        passes = matchEl ? value === matchEl.value : true;
        errorMessage = 'Passwords do not match';
        break;
    }

    if (!passes) {
      isValid = false;
      break;
    }
  }

  input.classList.toggle('error', !isValid);

  if (errorEl) {
    errorEl.textContent = isValid ? '' : errorMessage;
    errorEl.classList.toggle('visible', !isValid);
  }

  return isValid;
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation(formSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  const inputs = form.querySelectorAll('[data-validate]');

  // Real-time validation on blur
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  // Submit validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) isFormValid = false;
    });

    if (isFormValid) {
      handleFormSubmit(form);
    }
  });
}

function handleFormSubmit(form) {
  const formType = form.getAttribute('data-form-type');
  const submitBtn = form.querySelector('[type="submit"]');

  if (submitBtn) {
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Please wait...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      switch(formType) {
        case 'login':
          if (window.VELRON?.showToast) window.VELRON.showToast('Welcome back to VELRON!');
          setTimeout(() => { window.location.href = 'index.html'; }, 1500);
          break;
        case 'register':
          if (window.VELRON?.showToast) window.VELRON.showToast('Account created! Welcome to VELRON');
          setTimeout(() => { window.location.href = 'index.html'; }, 1500);
          break;
        case 'contact':
          if (window.VELRON?.showToast) window.VELRON.showToast('Message sent! We\'ll respond within 24 hours.');
          form.reset();
          break;
        default:
          if (window.VELRON?.showToast) window.VELRON.showToast('Submitted successfully!');
      }
    }, 1200);
  }
}

// ============================================
// AUTH TABS (Login / Register)
// ============================================
function initAuthTabs() {
  const tabs = document.querySelectorAll('.auth-tab-btn');
  const loginForm = document.querySelector('.login-form');
  const registerForm = document.querySelector('.register-form');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-auth');
      if (loginForm) loginForm.style.display = target === 'login' ? 'block' : 'none';
      if (registerForm) registerForm.style.display = target === 'register' ? 'block' : 'none';
    });
  });

  // Handle auth switch links
  document.querySelectorAll('[data-switch-auth]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-switch-auth');
      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-auth') === target);
      });
      if (loginForm) loginForm.style.display = target === 'login' ? 'block' : 'none';
      if (registerForm) registerForm.style.display = target === 'register' ? 'block' : 'none';
    });
  });
}

// ============================================
// PASSWORD TOGGLE
// ============================================
function initPasswordToggle() {
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.innerHTML = isText
        ? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    });
  });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initAuthTabs();
  initPasswordToggle();

  // Init specific forms
  initFormValidation('#login-form');
  initFormValidation('#register-form');
  initFormValidation('#contact-form');
});
