/* =============================================================
   Badri Vishal Kasuba — Portfolio interactions
   ============================================================= */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById('themeToggle');
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    if (themeToggle) themeToggle.setAttribute('aria-pressed', t === 'dark');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0b0d14' : '#4f46e5');
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- Mobile nav ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  }
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Nav scrolled state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scrollspy ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navItems.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { spy.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (prefersReduced) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
      revObs.observe(el);
    });
  }

  /* ---------- Typed roles ---------- */
  var typed = document.getElementById('typed');
  var roles = [
    'Senior Compiler Engineer @ Quadric',
    'Deep Learning Compiler Engineer',
    'MS by Research @ IIT Bombay',
    'Document AI & OCR Researcher',
    'Ex-SDE @ Amazon'
  ];
  if (typed && !prefersReduced) {
    var ri = 0, ci = 0, deleting = false;
    var tick = function () {
      var word = roles[ri];
      typed.textContent = word.substring(0, ci);
      if (!deleting && ci < word.length) { ci++; setTimeout(tick, 70); }
      else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1800); }
      else if (deleting && ci > 0) { ci--; setTimeout(tick, 35); }
      else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 350); }
    };
    setTimeout(tick, 900);
  }

  /* ---------- Stat counters ---------- */
  var statObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if (prefersReduced) { el.textContent = target + suffix; statObs.unobserve(el); return; }
      var start = null, dur = 1400;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      statObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-num').forEach(function (el) { statObs.observe(el); });

  /* ---------- Project filtering ---------- */
  var filterBar = document.getElementById('filters');
  var projects = Array.prototype.slice.call(document.querySelectorAll('#projGrid .proj'));
  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      projects.forEach(function (p) {
        var show = f === 'all' || p.getAttribute('data-cat') === f;
        p.classList.toggle('hide', !show);
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
