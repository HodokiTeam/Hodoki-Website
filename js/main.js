/* ============================================================
   HODOKI — main.js  (page-specific interactions only)
   Nav/lang/hamburger handled by shared.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Scroll Reveal ────────────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  function initReveals() {
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  }

  /* ── Video Tab Switcher ───────────────────────────────────── */
  function initVideoTabs() {
    document.querySelectorAll('.video-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.video-frame').forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        const f = document.getElementById(tab.dataset.target);
        if (f) f.classList.add('active');
      });
    });
  }

  /* ── YouTube Thumbnail Click-to-Load ─────────────────────── */
  function initYouTube() {
    document.querySelectorAll('.yt-thumb-player').forEach(player => {
      player.addEventListener('click', () => {
        const id    = player.dataset.videoId;
        const frame = player.closest('.video-frame');
        const el    = document.createElement('iframe');
        el.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
        el.title = 'YouTube video player';
        el.allow = 'autoplay; encrypted-media; picture-in-picture';
        el.allowFullscreen = true;
        el.style.cssText = 'width:100%;height:100%;border:none;position:absolute;inset:0;';
        frame.classList.add('loaded');
        frame.appendChild(el);
      });
    });
  }

  /* ── Archviz Lightbox ─────────────────────────────────────── */
  function initLightbox() {
    const lb    = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    if (!lb) return;

    document.querySelectorAll('.archviz-item img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.closest('.lightbox-close')) {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.classList.contains('open')) {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Active Nav on Scroll (homepage sections) ────────────── */
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => {
            a.style.color = '';
            if (a.getAttribute('href') === '#' + e.target.id ||
                a.getAttribute('href') === window.location.pathname.split('/').pop() + '#' + e.target.id) {
              a.style.color = 'var(--cyan)';
            }
          });
        }
      });
    }, { threshold: 0.45 });
    sections.forEach(s => obs.observe(s));
  }

  /* ── Init ─────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initReveals();
    initVideoTabs();
    initYouTube();
    initLightbox();
    initNavHighlight();
  }
})();
