/* ==========================================================================
   Veloce Motors — Main Application Script
   ========================================================================== */

// Global App State
const state = {
  theme: 'dark',
  reservedVehicle: null,
  scrollToMap: false,
  // Active inventory listings
  cars: {
    'electra-s':      { id: 'electra-s',      name: 'Veloce Electra S',      price: 189900, img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80', hp: '1,020 HP', accel: '1.99s', motor: 'Electric' },
    'roadster-gt':    { id: 'roadster-gt',    name: 'Apex Roadster GT',       price: 345000, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', hp: '720 HP',   accel: '2.8s',  motor: 'V8 Twin Turbo' },
    'veloce-classic': { id: 'veloce-classic', name: 'Chronos Veloce 1968',    price: 520000, img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80', hp: '450 HP',   accel: '4.5s',  motor: 'V12 Petrol' },
    'amg-hyper':      { id: 'amg-hyper',      name: 'Mercedes AMG Hyper',     price: 275000, img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80', hp: '680 HP',   accel: '3.1s',  motor: 'V8 Petrol' },
    'defender-custom':{ id: 'defender-custom',name: 'Veloce Defender Custom', price: 145000, img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80', hp: '525 HP',   accel: '5.2s',  motor: 'Supercharged V8' },
    'sovereign-suv':  { id: 'sovereign-suv',  name: 'Sovereign SUV Edition',  price: 215000, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80', hp: '600 HP',   accel: '4.8s',  motor: 'V8 Twin Turbo' }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initRouter();
  initStickyHeader();
  initMobileMenu();
  initBackToTop();
  initNewsletter();
  initHeroSlider();
  initStatsCounter();
  initGalleryFilter();
  initLightbox();
  initFaqAccordion();
  initFaqSearch();
  initContactForm();
  initEmiCalculator();
  initReservationForm();
  initErrorCanvas();
});

/* ==========================================================================
   Page Loader
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    }, 800);
  });
}

/* ==========================================================================
   Dark / Light Theme Toggle
   ========================================================================== */
function initTheme() {
  const toggleBtn       = document.getElementById('theme-toggle');
  const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
  state.theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);

  const applyTheme = () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: state.theme } }));
  };

  if (toggleBtn)       toggleBtn.addEventListener('click', applyTheme);
  if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', applyTheme);
}

/* ==========================================================================
   SPA Hash Router
   ========================================================================== */
function initRouter() {
  const routes = {
    '':          'home-section',
    '#home':     'home-section',
    '#about':    'about-section',
    '#services': 'services-section',
    '#gallery':  'gallery-section',
    '#team':     'team-section',
    '#finance':  'finance-section',
    '#reviews':  'reviews-section',
    '#faq':      'faq-section',
    '#contact':  'contact-section',
    '#checkout': 'cart-section'
  };

  const handleRoute = () => {
    const hash          = window.location.hash || '#home';
    const targetSection = routes[hash] || 'error-section';

    document.querySelectorAll('.spa-section').forEach(s => {
      s.classList.remove('active');
      s.querySelectorAll('[data-aos]').forEach(el => el.classList.remove('aos-animate'));
    });

    const active = document.getElementById(targetSection);
    if (active) {
      active.classList.add('active');
      active.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
    } else {
      const err = document.getElementById('error-section');
      if (err) {
        err.classList.add('active');
        err.querySelectorAll('[data-aos]').forEach(el => el.classList.add('aos-animate'));
      }
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkHash = link.getAttribute('href');
      link.classList.toggle('active',
        (linkHash === '#home' && (hash === '#home' || hash === '')) ||
        (linkHash === hash && hash !== '#home' && hash !== '')
      );
    });

    // Close mobile menu
    const hamburger = document.getElementById('hamburger-toggle');
    const navMenu   = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
    if (typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 150);

    // Scroll to map if flagged
    if (state.scrollToMap) {
      state.scrollToMap = false;
      setTimeout(() => {
        const mapEl = document.querySelector('.map-container');
        if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

/* ==========================================================================
   Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
  onScroll();
  window.addEventListener('scroll', onScroll);
}

/* ==========================================================================
   Mobile Nav Drawer
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu   = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

/* ==========================================================================
   Back-To-Top Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 300));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==========================================================================
   Toast Notifications
   ========================================================================== */
window.showToast = function (message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast     = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon      = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};

/* ==========================================================================
   Newsletter Form
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const email = input.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      window.showToast('Please enter a valid email address.', 'error');
      return;
    }

    const btn      = form.querySelector('button');
    const origText = btn.innerHTML;
    btn.disabled   = true;
    btn.innerHTML  = '<i class="fa-solid fa-spinner fa-spin"></i>';

    setTimeout(() => {
      window.showToast('Successfully subscribed to the insider circle!', 'success');
      input.value   = '';
      btn.disabled  = false;
      btn.innerHTML = origText;
    }, 1200);
  });
}

/* ==========================================================================
   Hero Slider
   ========================================================================== */
function initHeroSlider() {
  const slides        = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slider-dots');
  const prevBtn       = document.getElementById('slider-prev');
  const nextBtn       = document.getElementById('slider-next');
  if (slides.length === 0) return;

  let current  = 0;
  let interval;

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => { goTo(i); reset(); });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.slider-dot');

  function goTo(idx) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); reset(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); reset(); });

  function start() { interval = setInterval(() => goTo(current + 1), 6000); }
  function reset() { clearInterval(interval); start(); }
  start();
}

/* ==========================================================================
   Stats Count-Up Animation
   ========================================================================== */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target, parseInt(entry.target.getAttribute('data-target'), 10));
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  stats.forEach(s => observer.observe(s));

  function animateCounter(el, target) {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / 2000, 1);
      const eased    = progress * (2 - progress);
      let suffix = '';
      if (el.id === 'stat-experience')  suffix = '+';
      if (el.id === 'stat-satisfaction') suffix = '%';
      if (el.id === 'stat-sold' || el.id === 'stat-showroom') suffix = '+';
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    };
    requestAnimationFrame(step);
  }
}

/* ==========================================================================
   Gallery Filter
   ========================================================================== */
function initGalleryFilter() {
  const btns  = document.querySelectorAll('.gallery-filter-btn');
  const cards = document.querySelectorAll('.gallery-grid .car-card');
  if (btns.length === 0) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        card.style.display =
          (filter === 'all' || card.getAttribute('data-category') === filter) ? 'flex' : 'none';
      });
      if (typeof AOS !== 'undefined') AOS.refresh();
    });
  });
}

/* ==========================================================================
   Image Lightbox
   ========================================================================== */
function initLightbox() {
  const triggers = document.querySelectorAll('.car-image-container');
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || triggers.length === 0) return;

  const lbImg     = lightbox.querySelector('img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn  = lightbox.querySelector('.lightbox-close');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (e.target.closest('.car-badge')) return;
      const img   = trigger.querySelector('img');
      const card  = trigger.closest('.car-card');
      const title = card.querySelector('.car-title').textContent;
      const price = card.querySelector('.car-price').textContent;
      if (img && lbImg) {
        lbImg.src         = img.src;
        lbImg.alt         = img.alt;
        lbCaption.textContent = `${title} (${price})`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const close = () => { lightbox.classList.remove('active'); document.body.style.overflow = ''; };
  if (closeBtn) closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) close();
  });
}

/* ==========================================================================
   FAQ Accordion & Search
   ========================================================================== */
function initFaqAccordion() {
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const item     = header.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function initFaqSearch() {
  const input = document.getElementById('faq-search');
  const items = document.querySelectorAll('.faq-item');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    items.forEach(item => {
      const q_text = item.querySelector('.faq-question').textContent.toLowerCase();
      const a_text = item.querySelector('.faq-answer').textContent.toLowerCase();
      if (q_text.includes(q) || a_text.includes(q)) {
        item.style.display = '';
        item.style.borderColor = q ? 'var(--accent-focus)' : '';
      } else {
        item.style.display = 'none';
        item.classList.remove('active');
      }
    });
  });
}

/* ==========================================================================
   Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl    = document.getElementById('contact-name');
    const emailEl   = document.getElementById('contact-email');
    const subjectEl = document.getElementById('contact-subject');
    const msgEl     = document.getElementById('contact-message');

    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const subject = subjectEl.value.trim();
    const message = msgEl.value.trim();

    if (!name || name.length < 2)                             { window.showToast('Please enter your name.', 'error');          nameEl.focus();    return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { window.showToast('Please enter a valid email.', 'error');       emailEl.focus();   return; }
    if (!subject || subject.length < 3)                       { window.showToast('Please enter a subject.', 'error');           subjectEl.focus(); return; }
    if (!message || message.length < 10)                      { window.showToast('Please write a longer message.', 'error');    msgEl.focus();     return; }

    const btn  = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled  = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

    setTimeout(() => {
      window.showToast('Sales request sent! A representative will connect shortly.', 'success');
      form.reset();
      btn.disabled  = false;
      btn.innerHTML = orig;
    }, 1500);
  });
}

/* ==========================================================================
   Vehicle Reservation System
   ========================================================================== */
window.reserveVehicle = function (carId) {
  const car = state.cars[carId];
  if (!car) return;
  state.reservedVehicle = car;
  renderReservationVehicle();
  window.location.hash = '#checkout';
  window.showToast(`${car.name} selected — complete your reservation below.`, 'success');
};

function renderReservationVehicle() {
  const display  = document.getElementById('reservation-vehicle-display');
  const carInput = document.getElementById('res-vehicle');
  if (!display) return;

  const car = state.reservedVehicle;

  if (!car) {
    display.innerHTML = `
      <div class="reservation-empty">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>No vehicle selected. Browse our <a href="#gallery">Fleet Gallery</a> and click <strong>Reserve Now</strong>.</p>
      </div>`;
    if (carInput) carInput.value = '';
    return;
  }

  display.innerHTML = `
    <div class="reservation-car-preview">
      <img src="${car.img}" alt="${car.name}">
      <div class="reservation-car-info">
        <div class="reservation-car-name">${car.name}</div>
        <div class="reservation-car-price">$${car.price.toLocaleString()}</div>
        <div class="reservation-car-specs">
          <span><i class="fa-solid fa-gauge"></i> ${car.hp}</span>
          <span><i class="fa-solid fa-stopwatch"></i> ${car.accel} 0-60</span>
          <span><i class="fa-solid fa-gas-pump"></i> ${car.motor}</span>
        </div>
        <button class="btn btn-secondary" style="margin-top:16px;font-size:0.8rem;padding:8px 16px;"
          onclick="state.reservedVehicle=null;renderReservationVehicle();">
          <i class="fa-solid fa-xmark"></i> Change Vehicle
        </button>
      </div>
    </div>`;

  if (carInput) carInput.value = car.name;
}

function initReservationForm() {
  renderReservationVehicle();

  const form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('res-name').value.trim();
    const email   = document.getElementById('res-email').value.trim();
    const phone   = document.getElementById('res-phone').value.trim();
    const vehicle = document.getElementById('res-vehicle').value.trim();

    if (!name  || name.length  < 2)                           { window.showToast('Please enter your full name.', 'error');     document.getElementById('res-name').focus();  return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { window.showToast('Please enter a valid email.', 'error');       document.getElementById('res-email').focus(); return; }
    if (!phone || phone.length < 7)                           { window.showToast('Please enter a valid phone number.', 'error'); document.getElementById('res-phone').focus(); return; }

    const btn  = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled  = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

    setTimeout(() => {
      window.showToast(
        `Reservation submitted${vehicle ? ' for ' + vehicle : ''}! Our team will contact you within 24 hours.`,
        'success'
      );
      state.reservedVehicle = null;
      renderReservationVehicle();
      form.reset();
      btn.disabled  = false;
      btn.innerHTML = orig;
      window.location.hash = '#home';
    }, 1600);
  });
}

window.bookTestDrive = function (carId) {
  const car = state.cars[carId];
  if (!car) return;
  const subjectEl = document.getElementById('contact-subject');
  const msgEl     = document.getElementById('contact-message');
  if (subjectEl && msgEl) {
    subjectEl.value = `VIP Test Drive Booking: ${car.name}`;
    msgEl.value     = `Hello Veloce Sales Team,\n\nI would like to schedule a private viewing and test drive for the ${car.name}. Please let me know available booking hours.`;
    window.location.hash = '#contact';
    window.showToast('Form pre-filled. Submit details to schedule your drive.', 'success');
  }
};

/* ==========================================================================
   EMI Financing Calculator
   ========================================================================== */
function initEmiCalculator() {
  const carSelect    = document.getElementById('emi-car-select');
  const customPrice  = document.getElementById('emi-custom-price');
  const downSlider   = document.getElementById('emi-down-payment');
  const downPctVal   = document.getElementById('emi-down-percent-val');
  const downAmtVal   = document.getElementById('emi-down-amount-val');
  if (!carSelect || !downSlider) return;

  // Populate vehicle dropdown
  carSelect.innerHTML = '<option value="custom">-- Custom Price --</option>';
  Object.keys(state.cars).forEach(key => {
    const car = state.cars[key];
    const opt = document.createElement('option');
    opt.value       = car.id;
    opt.textContent = `${car.name} ($${car.price.toLocaleString()})`;
    if (key === 'electra-s') opt.selected = true;
    carSelect.appendChild(opt);
  });

  const update = () => {
    let price = 0;
    if (carSelect.value === 'custom') {
      customPrice.style.display = 'block';
      price = Math.max(0, parseFloat(customPrice.value) || 0);
    } else {
      customPrice.style.display = 'none';
      const car = state.cars[carSelect.value];
      price = car ? car.price : 0;
    }

    const pct    = parseInt(downSlider.value, 10);
    const down   = price * (pct / 100);
    const loan   = price - down;

    if (downPctVal) downPctVal.textContent = `${pct}%`;
    if (downAmtVal) downAmtVal.textContent  = `$${Math.round(down).toLocaleString()}`;

    const rate = 0.045 / 12;
    const emi  = (months) => {
      if (loan <= 0) return 0;
      return Math.round((loan * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1));
    };

    document.getElementById('emi-12-val').textContent = `$${emi(12).toLocaleString()} / mo`;
    document.getElementById('emi-24-val').textContent = `$${emi(24).toLocaleString()} / mo`;
    document.getElementById('emi-36-val').textContent = `$${emi(36).toLocaleString()} / mo`;
  };

  carSelect.addEventListener('change', update);
  customPrice.addEventListener('input', update);
  downSlider.addEventListener('input', update);
  update();
}

/* ==========================================================================
   404 Error Canvas Particles
   ========================================================================== */
function initErrorCanvas() {
  const canvas = document.getElementById('error-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width  = canvas.width  = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x      = Math.random() * width;
      this.y      = Math.random() * height;
      this.size   = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.color  = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00f0ff';
      this.alpha  = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle   = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 50 }, () => new Particle());

  window.addEventListener('themeChanged', () => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    particles.forEach(p => { p.color = accent; });
  });

  (function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  })();
}

/* ==========================================================================
   AOS Init
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }
});
