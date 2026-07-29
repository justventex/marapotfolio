/* ==========================================
   MARA DOBBELFELD — PORTFOLIO
   ========================================== */
let clickX = window.innerWidth / 2;
let clickY = window.innerHeight / 2;

function createTransitionOverlay() {
  if (document.querySelector('.circle-overlay')) return;
  const overlay = document.createElement('div');
  overlay.classList.add('circle-overlay');
  document.body.appendChild(overlay);
}

function getMaxRadius(x, y) {
  const maxX = Math.max(x, window.innerWidth - x);
  const maxY = Math.max(y, window.innerHeight - y);
  return Math.ceil(Math.sqrt(maxX * maxX + maxY * maxY));
}

function initInteractions(container = document) {
  // --- Mobile Navigation ---
  const hamburger = container.querySelector('.hamburger');
  const navbarNav = container.querySelector('.navbar__nav');

  if (hamburger && navbarNav) {
    const navbar = hamburger.closest('.navbar');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      navbarNav.classList.toggle('is-open');
      if (navbar) navbar.classList.toggle('is-menu-open');
    });

    // Close menu when a link is clicked
    const navLinks = navbarNav.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navbarNav.classList.remove('is-open');
        if (navbar) navbar.classList.remove('is-menu-open');
      });
    });
  }

  // --- Category Filter (Work page) ---
  const filterBtns = container.querySelectorAll('.filters__btn');
  const projectCards = container.querySelectorAll('.project-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  container.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Fade-in on scroll (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  container.querySelectorAll('.intro, .my-work, .about-intro, .timeline-section, .work-experience, .skills, .inspiration, .project-card').forEach(el => {
    el.classList.add('fade-target');
    fadeObserver.observe(el);
  });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  createTransitionOverlay();

  // Track click position for the circle transition origin
  document.addEventListener('click', (e) => {
    clickX = e.clientX;
    clickY = e.clientY;
  });

  if (typeof barba !== 'undefined') {
    
    // Catch any Barba errors that might cause hard reloads
    barba.hooks.before((data) => {
      console.log('Barba starting transition to:', data.next.url.path);
    });
    
    barba.hooks.after((data) => {
      console.log('Barba transition finished');
    });

    barba.init({
      debug: true, // Output debug info to console
      transitions: [{
        name: 'circle-reveal',
        once({ next }) {
          initInteractions(next.container);
        },
        leave({ current }) {
          return new Promise((resolve) => {
            const overlay = document.querySelector('.circle-overlay');
            const radius = getMaxRadius(clickX, clickY) * 2; // Needs to be diameter

            // Phase 1 Setup: Solid white circle expands to cover screen
            overlay.style.backgroundColor = '#FFFFFF';
            overlay.style.boxShadow = 'none';
            overlay.style.left = clickX + 'px';
            overlay.style.top = clickY + 'px';
            overlay.style.width = '0px';
            overlay.style.height = '0px';
            overlay.style.display = 'block';

            console.log('Leave hook starting (solid circle expanding)');
            
            // Phase 1: Expand solid white circle
            gsap.to(overlay, {
              width: radius,
              height: radius,
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: () => {
                console.log('Leave animation finished');
                if (current && current.container) {
                  current.container.style.display = 'none'; // Force hide old page
                }
                // Hold for 0.5s on solid white
                gsap.delayedCall(0.5, resolve);
              }
            });
          });
        },
        enter({ next }) {
          return new Promise((resolve) => {
            console.log('Enter hook starting (hole expanding in white shadow)');
            window.scrollTo(0, 0);
            initInteractions(next.container);

            const overlay = document.querySelector('.circle-overlay');
            const radius = getMaxRadius(clickX, clickY) * 2; // Needs to be diameter
            
            // Phase 2 Setup: The screen is currently covered by the white div.
            // We instantly swap it so the div is transparent, but it has a massive white shadow.
            // Because the width/height are still 0, the hole is 0, so the shadow covers the screen perfectly.
            // This swap is invisible to the human eye.
            overlay.style.backgroundColor = 'transparent';
            overlay.style.boxShadow = '0 0 0 150vmax #FFFFFF';
            overlay.style.width = '0px';
            overlay.style.height = '0px';
            
            // Phase 2: Expand the transparent hole, pushing the white shadow away to reveal the new page
            gsap.to(overlay, {
              width: radius,
              height: radius,
              duration: 0.6,
              ease: 'power3.inOut',
              onComplete: () => {
                console.log('Enter animation finished');
                overlay.style.display = 'none';
                resolve();
              }
            });
          });
        }
      }]
    });
  } else {
    initInteractions(document);
  }
});
