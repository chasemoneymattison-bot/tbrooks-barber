/* =============================================
   T. BROOKS QUALITY CUTS - SCRIPTS
   ============================================= */

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1500);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Floating particles in hero
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

createParticles();

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// Trigger counter when about section is visible
const aboutSection = document.getElementById('about');
let counterTriggered = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterTriggered) {
      counterTriggered = true;
      animateCounters();
    }
  });
}, { threshold: 0.3 });

if (aboutSection) {
  counterObserver.observe(aboutSection);
}

// Parallax effect on hero
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = scrolled * 0.4 + 'px';
  }
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Before & After sliders
document.querySelectorAll('[data-ba]').forEach(slider => {
  const beforeEl = slider.querySelector('.ba-before');
  const handle = slider.querySelector('.ba-handle');
  let isDragging = false;

  function setPosition(x) {
    const rect = slider.getBoundingClientRect();
    let percent = ((x - rect.left) / rect.width) * 100;
    percent = Math.max(2, Math.min(98, percent));
    beforeEl.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    handle.style.left = percent + '%';
  }

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    slider.classList.add('dragging');
    setPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    slider.classList.add('dragging');
    setPosition(e.touches[0].clientX);
  }, { passive: true });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setPosition(e.touches[0].clientX);
  }, { passive: true });

  slider.addEventListener('touchend', () => {
    isDragging = false;
    slider.classList.remove('dragging');
  });
});


// =============================================
// Booking Modal
// =============================================
const bookingOverlay = document.getElementById('bookingOverlay');
const bookingModal = document.getElementById('bookingModal');
const bookingClose = document.getElementById('bookingClose');
const progressBar = document.getElementById('bookingProgress');

const step1 = document.getElementById('bookingStep1');
const step2 = document.getElementById('bookingStep2');
const step3 = document.getElementById('bookingStep3');
const step4 = document.getElementById('bookingStep4');

const toStep2Btn = document.getElementById('toStep2');
const toStep3Btn = document.getElementById('toStep3');
const submitBtn = document.getElementById('submitBooking');
const backTo1Btn = document.getElementById('backTo1');
const backTo2Btn = document.getElementById('backTo2');

let selectedService = '';

function openBooking() {
  bookingOverlay.classList.add('active');
  bookingModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  showStep(1);
}

function closeBooking() {
  bookingOverlay.classList.remove('active');
  bookingModal.classList.remove('active');
  document.body.style.overflow = '';
}

function showStep(num) {
  [step1, step2, step3, step4].forEach(s => s.classList.add('hidden'));
  [step1, step2, step3, step4][num - 1].classList.remove('hidden');
  progressBar.style.width = (num * 25) + '%';
  bookingModal.scrollTop = 0;
}

// Open modal from any [data-booking] link
document.querySelectorAll('[data-booking]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openBooking();
  });
});

// Close
bookingClose.addEventListener('click', closeBooking);
bookingOverlay.addEventListener('click', closeBooking);

// Step 1: Service selection
document.querySelectorAll('input[name="service"]').forEach(radio => {
  radio.addEventListener('change', () => {
    selectedService = radio.value;
    toStep2Btn.disabled = false;
  });
});

toStep2Btn.addEventListener('click', () => {
  if (!selectedService) return;
  // Set min date to today
  const dateInput = document.getElementById('bookDate');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
  showStep(2);
});

// Step 2: Date & Time
const bookDate = document.getElementById('bookDate');
const bookTime = document.getElementById('bookTime');

function checkStep2() {
  toStep3Btn.disabled = !(bookDate.value && bookTime.value);
}

bookDate.addEventListener('change', checkStep2);
bookTime.addEventListener('change', checkStep2);

toStep3Btn.addEventListener('click', () => {
  showStep(3);
});

// Back buttons
backTo1Btn.addEventListener('click', () => showStep(1));
backTo2Btn.addEventListener('click', () => showStep(2));

// Step 3: Submit
submitBtn.addEventListener('click', () => {
  const name = document.getElementById('bookName').value.trim();
  const phone = document.getElementById('bookPhone').value.trim();
  const notes = document.getElementById('bookNotes').value.trim();

  if (!name || !phone) {
    // Simple highlight
    if (!name) document.getElementById('bookName').style.borderColor = '#e74c3c';
    if (!phone) document.getElementById('bookPhone').style.borderColor = '#e74c3c';
    return;
  }

  // Format date nicely
  const dateObj = new Date(bookDate.value + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  // Show confirmation
  const summary = document.getElementById('bookingSummary');
  summary.innerHTML = `
    <strong>Service:</strong> ${selectedService}<br>
    <strong>Date:</strong> ${formattedDate}<br>
    <strong>Time:</strong> ${bookTime.value}<br>
    <strong>Name:</strong> ${name}<br>
    <strong>Phone:</strong> ${phone}
    ${notes ? '<br><strong>Notes:</strong> ' + notes : ''}
  `;

  showStep(4);
  progressBar.style.width = '100%';
});
