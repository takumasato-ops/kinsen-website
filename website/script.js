/* ============================================
   株式会社琴線 — Main Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation scroll behavior ---
  const navHeader = document.getElementById('navHeader');
  function updateNav() {
    if (!navHeader) return;
    if (window.scrollY > 60) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }

  // --- Hamburger menu ---
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 72;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll animations (Intersection Observer) ---
  const animElements = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach(el => observer.observe(el));

  // --- Combined scroll handler ---
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial calls
  updateNav();

  // --- Hero background slideshow ---
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentHero = 0;
    setInterval(() => {
      heroSlides[currentHero].classList.remove('active');
      currentHero = (currentHero + 1) % heroSlides.length;
      heroSlides[currentHero].classList.add('active');
    }, 6000);
  }

  // --- Contact form handling ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value;
      const email = contactForm.querySelector('[name="email"]').value;
      const phone = contactForm.querySelector('[name="phone"]').value;
      const category = contactForm.querySelector('[name="category"]').value;
      const message = contactForm.querySelector('[name="message"]').value;

      const subject = encodeURIComponent(`【お問い合わせ】${category} - ${name}様`);
      const body = encodeURIComponent(
        `お名前: ${name}\nメールアドレス: ${email}\n電話番号: ${phone}\nお問い合わせ種別: ${category}\n\n${message}`
      );
      window.location.href = `mailto:office@kinsen-info.com?subject=${subject}&body=${body}`;
    });
  }
});
