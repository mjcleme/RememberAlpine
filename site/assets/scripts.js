// ── TAB SWITCHING ──────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  const panel = document.getElementById('tab-' + name);
  const tab   = document.querySelector('[data-tab="' + name + '"]');
  if (panel) panel.classList.add('active');
  if (tab)   tab.classList.add('active');

  // Hide floating donate when already on donate tab
  const floatBtn = document.getElementById('float-donate');
  if (floatBtn) {
    if (name === 'donate') floatBtn.classList.remove('visible');
  }

  const nav = document.getElementById('site-nav');
  if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── COUNTDOWN ──────────────────────────────────────────
// Target: April 19, 2027 at 10:00 AM MT
function updateCountdown() {
  const target = new Date('2027-04-19T10:00:00-06:00');
  const now    = new Date();
  const diff   = target - now;

  if (diff <= 0) {
    document.querySelectorAll('.countdown-num').forEach(el => el.textContent = '0');
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent  = days;
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── STICKY NAV SHADOW + FLOATING DONATE ───────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('site-nav');
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
  } else {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  }

  // Show floating donate after scrolling past the hero
  const floatBtn = document.getElementById('float-donate');
  if (floatBtn) {
    if (window.scrollY > window.innerHeight * 0.6) {
      floatBtn.classList.add('visible');
    } else {
      floatBtn.classList.remove('visible');
    }
  }
});

// ── DONATION AMOUNT BUTTONS ────────────────────────────
function selectAmount(btn, value) {
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('amount-btn-active'));
  btn.classList.add('amount-btn-active');
  document.getElementById('d-amount').value = value;
  document.getElementById('d-custom').value = '';
}
function clearAmountBtns() {
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('amount-btn-active'));
}

// ── NOTIFY FORM ────────────────────────────────────────
function handleNotify(e) {
  e.preventDefault();
  const confirm = document.getElementById('notify-confirm');
  if (confirm) {
    confirm.classList.remove('hidden');
    e.target.style.display = 'none';
  }
}

// ── VOLUNTEER FORM ─────────────────────────────────────
function handleVolunteer(e) {
  e.preventDefault();
  const confirm = document.getElementById('volunteer-confirm');
  if (confirm) {
    confirm.classList.remove('hidden');
    e.target.style.display = 'none';
    confirm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ── DONATE FORM ────────────────────────────────────────
function handleDonate(e) {
  e.preventDefault();
  // Capture custom amount if filled
  const custom = document.getElementById('d-custom').value;
  if (custom) document.getElementById('d-amount').value = custom;

  const confirm = document.getElementById('donate-confirm');
  if (confirm) {
    confirm.classList.remove('hidden');
    e.target.style.display = 'none';
    confirm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ── INTERSECTION OBSERVER — animate timeline on scroll ─
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Animate timeline eras
  document.querySelectorAll('.timeline-era').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(el);
  });

  // Animate cards
  document.querySelectorAll('.why-card, .impact-card, .schedule-day').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.4s ease ${(i % 4) * 0.1}s, transform 0.4s ease ${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
});
