'use strict';

/* ── 1. Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('nav-scrolled');
  } else {
    navbar.classList.remove('nav-scrolled');
  }
}, { passive: true });

/* ── 2. Mobile hamburger menu ── */
const menuBtn  = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamLines = document.querySelectorAll('.ham-line');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', !menuOpen);

  // Animate to X
  if (menuOpen) {
    hamLines[0].style.transform = 'translateY(8px) rotate(45deg)';
    hamLines[1].style.opacity   = '0';
    hamLines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  } else {
    hamLines[0].style.transform = '';
    hamLines[1].style.opacity   = '1';
    hamLines[2].style.transform = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    hamLines[0].style.transform = '';
    hamLines[1].style.opacity   = '1';
    hamLines[2].style.transform = '';
  });
});

/* ── 3. Typing animation (hero) ── */
const roles = [
  'full-stack apps.',
  'REST APIs.',
  'desktop tools.',
  'clean code.',
  'real-world solutions.',
];
const typingEl = document.getElementById('typing-text');
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const TYPING_SPEED  = 75;
const DELETING_SPEED = 45;
const PAUSE_AFTER    = 1800;
const PAUSE_BEFORE   = 500;

function type() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, PAUSE_AFTER);
      return;
    }
    setTimeout(type, TYPING_SPEED);
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
      setTimeout(type, PAUSE_BEFORE);
      return;
    }
    setTimeout(type, DELETING_SPEED);
  }
}

// Start typing after a small delay
setTimeout(type, 800);

/* ── 4. Scroll reveal (Intersection Observer) ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay for sibling elements
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx      = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ── 5. Active nav link highlight on scroll ── */
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-text-primary');
            link.classList.remove('text-text-muted');
          } else {
            link.classList.remove('text-text-primary');
            link.classList.add('text-text-muted');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── 6. Profile image fallback ── */
const profileImg = document.getElementById('profile-img');
profileImg.addEventListener('error', () => {
  // Generate initials avatar as a fallback
  profileImg.style.display = 'none';
  const canvas = document.createElement('canvas');
  canvas.width  = 252;
  canvas.height = 252;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 252, 252);
  grad.addColorStop(0,   '#7C3AED');
  grad.addColorStop(0.5, '#06B6D4');
  grad.addColorStop(1,   '#EC4899');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 252, 252);
  ctx.fillStyle   = 'white';
  ctx.font        = 'bold 80px Inter, sans-serif';
  ctx.textAlign   = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('KI', 126, 126);
  profileImg.src   = canvas.toDataURL();
  profileImg.style.display = '';
});

/* ── 7. Smooth parallax on ambient orbs ── */
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.3;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
}, { passive: true });

/* ── 8. Year auto-update in footer ── */
const yearEl = document.querySelector('.footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
