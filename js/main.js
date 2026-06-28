/* ============================================================
   Aidan Tracy — Portfolio interactions
   Theme toggle · mobile nav · scroll reveal · contact form
   ============================================================ */

(function () {
  'use strict';

  /* -------------------- Theme toggle -------------------- */
  // Note: in-memory + system preference only (no storage APIs).
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  function setTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  // Respect the OS preference on first load.
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(prefersLight ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isLight = root.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  /* -------------------- Mobile nav -------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close the menu after tapping a link.
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------------------- Footer year -------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------- Toast -------------------- */
  const toast = document.getElementById('toast');
  function showToast(message, isError) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.toggle('error', !!isError);
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3500);
  }

  /* -------------------- Scroll reveal -------------------- */
  const revealEls = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* -------------------- Contact form (Formspree) -------------------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Lightweight validation.
      let valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        const group = field.closest('.form-group');
        const ok = field.value.trim() !== '' &&
          (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
        if (group) group.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        showToast('Please fill in all fields correctly.', true);
        return;
      }

      // If the Formspree endpoint hasn't been configured yet, fail gracefully.
      const action = form.getAttribute('action') || '';
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        showToast('Contact form not configured yet — email me directly.', true);
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (response.ok) {
          form.reset();
          showToast("Thanks! Your message has been sent.");
        } else {
          showToast('Something went wrong. Please email me instead.', true);
        }
      } catch (err) {
        showToast('Network error. Please email me instead.', true);
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
      }
    });
  }
})();
