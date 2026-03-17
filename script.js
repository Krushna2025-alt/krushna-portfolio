/* ══ KRUSHNA THAKARE · FABLAB PORTFOLIO · script.js ══ */

// ── LOADER ────────────────────────────────────
window.addEventListener('load', () => {
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  const loader = document.getElementById('loader');
  let v = 0;
  const iv = setInterval(() => {
    v += Math.random() * 14 + 2;
    if (v >= 100) {
      v = 100;
      clearInterval(iv);
      setTimeout(() => loader.classList.add('gone'), 500);
    }
    bar.style.width = v + '%';
    pct.textContent = Math.floor(v) + '%';
  }, 55);
});

// ── CUSTOM CURSOR ─────────────────────────────
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function trackRing() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(trackRing);
})();

const hoverEls = 'a, button, .mod-card.active-mod, .proj-card, .contact-card, .day-img-wrap, .orb-chip';
document.querySelectorAll(hoverEls).forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── ANIMATED CANVAS BACKGROUND ────────────────
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Lines / web
const DOTS = 80;
const dots = Array.from({ length: DOTS }, () => ({
  x: Math.random() * 1920,
  y: Math.random() * 1080,
  vx: (Math.random() - .5) * .35,
  vy: (Math.random() - .5) * .35,
  r: Math.random() * 1.8 + .5,
}));

// Mouse influence
let mouseX = W / 2, mouseY = H / 2;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

function drawBg() {
  ctx.clearRect(0, 0, W, H);

  // Update positions
  dots.forEach(d => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > W) d.vx *= -1;
    if (d.y < 0 || d.y > H) d.vy *= -1;

    // Subtle mouse attraction
    const dx = mouseX - d.x, dy = mouseY - d.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200) {
      d.vx += dx / dist * 0.005;
      d.vy += dy / dist * 0.005;
    }
    // Clamp speed
    const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
    if (spd > 0.6) { d.vx = (d.vx / spd) * 0.6; d.vy = (d.vy / spd) * 0.6; }
  });

  // Draw connections
  for (let i = 0; i < DOTS; i++) {
    for (let j = i + 1; j < DOTS; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        const alpha = (1 - d / 130) * 0.18;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
  }

  // Draw dots
  dots.forEach(d => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = Math.random() > .6 ? 'rgba(56,189,248,0.5)' : 'rgba(99,102,241,0.4)';
    ctx.fill();
  });

  // Floating orbs (large, very subtle)
  const t = Date.now() * 0.0004;
  const orbs = [
    { x: W * .15, y: H * .25, r: 180, c: '56,189,248', a: .025 },
    { x: W * .85, y: H * .6,  r: 220, c: '99,102,241', a: .02  },
    { x: W * .5,  y: H * .8,  r: 160, c: '168,85,247', a: .018 },
  ];
  orbs.forEach((o, i) => {
    const ox = o.x + Math.sin(t + i) * 40;
    const oy = o.y + Math.cos(t + i * 1.3) * 30;
    const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
    g.addColorStop(0, `rgba(${o.c},${o.a})`);
    g.addColorStop(1, `rgba(${o.c},0)`);
    ctx.beginPath();
    ctx.arc(ox, oy, o.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
  });

  requestAnimationFrame(drawBg);
}
drawBg();

// ── NAVBAR ────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('stuck', window.scrollY > 60);
});

// ── HAMBURGER ─────────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobMenu').classList.toggle('open');
});
function closeMob() {
  document.getElementById('mobMenu').classList.remove('open');
}

// ── MODULE OPEN / CLOSE ───────────────────────
function openMod() {
  const sec = document.getElementById('webdet');
  sec.classList.add('open');
  setTimeout(() => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}
function closeMod() {
  document.getElementById('webdet').classList.remove('open');
  document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
}

// ── LIGHTBOX ──────────────────────────────────
function openLB(src) {
  document.getElementById('lbImg').src = src;
  document.getElementById('lightbox').classList.add('open');
  event.stopPropagation();
}
function closeLB() {
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

// ── SCROLL REVEAL ─────────────────────────────
const ro = new IntersectionObserver((entries) => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('visible'), i * 70);
      ro.unobserve(en.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Trigger reveals inside webdet when it opens
const modObserver = new MutationObserver(() => {
  document.querySelectorAll('.webdet.open .reveal').forEach(el => {
    ro.observe(el);
  });
});
modObserver.observe(document.getElementById('webdet'), { attributes: true });

// ── PROGRESS BAR ANIMATE ──────────────────────
const progObserver = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.querySelectorAll('.prog-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => bar.style.width = w, 100);
      });
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.mod-card.active-mod, .det-prog').forEach(el => progObserver.observe(el));

// ── HERO NAME GLITCH ──────────────────────────
document.querySelectorAll('.title-row').forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.letterSpacing = '6px';
    row.style.transition = 'letter-spacing .2s';
    setTimeout(() => row.style.letterSpacing = '4px', 200);
  });
});

// ── RIPPLE EFFECT ON BUTTONS ──────────────────
document.querySelectorAll('.btn-glow, .btn-outline').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = document.createElement('span');
    const rect = this.getBoundingClientRect();
    r.style.cssText = `
      position:absolute;
      border-radius:50%;
      background:rgba(255,255,255,0.25);
      transform:scale(0);
      animation:ripple .5s ease;
      left:${e.clientX - rect.left}px;
      top:${e.clientY - rect.top}px;
      width:60px; height:60px;
      margin:-30px;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(r);
    setTimeout(() => r.remove(), 500);
  });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(style);

// ── TILT EFFECT ON CARDS ──────────────────────
document.querySelectorAll('.proj-card, .contact-card, .edu-card, .about-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - .5;
    const y = (e.clientY - rect.top)  / rect.height - .5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
