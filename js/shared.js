/* ============================================================
   HODOKI — shared.js
   Nav + Footer injection, Lang toggle, Hamburger
   ============================================================ */

(function () {
  'use strict';

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  let lang = localStorage.getItem('hodoki-lang') || 'pt';

  /* ── Nav HTML ───────────────────────────────────────────── */
  function navLink(href, pt, en) {
    const active = currentPage === href ? 'style="color:var(--cyan)"' : '';
    return `<li><a href="${href}" ${active} data-pt="${pt}" data-en="${en}">${pt}</a></li>`;
  }

  const topBarHTML = `
    <div class="top-bar">
      <span data-pt="🎓 Plataforma e-learning →&nbsp;" data-en="🎓 E-learning platform →&nbsp;">🎓 Plataforma e-learning →&nbsp;</span>
      <a href="https://study.hodoki.pt" target="_blank" rel="noopener noreferrer">study.hodoki.pt</a>
    </div>`;

  const navHTML = `
    <div class="nav-wrapper">
      <nav role="navigation" aria-label="Navegação principal">
        <div class="nav-logo">
          <a href="index.html" aria-label="Hodoki — página inicial">
            <img src="imgs/logos/Hodoki Logo_white.png" alt="Hodoki" />
          </a>
        </div>
        <ul class="nav-links">
          ${navLink('index.html',      'Início',         'Home')}
          ${navLink('software.html',   'Software',       'Software')}
          ${navLink('formacao.html',   'Formação',       'Training')}
          ${navLink('consultoria.html','Consultoria AI', 'AI Consulting')}
          ${navLink('tres-d.html',     '3D & ArchViz',   '3D & ArchViz')}
        </ul>
        <div class="nav-actions">
          <div class="lang-toggle" role="group" aria-label="Selecionar idioma">
            <button class="lang-btn" data-lang="pt" aria-label="Português">PT</button>
            <button class="lang-btn" data-lang="en" aria-label="English">EN</button>
          </div>
          <a href="index.html#contacto" class="btn btn-primary nav-cta"
             data-pt="Falar Connosco" data-en="Get in Touch">Falar Connosco</a>
          <button class="hamburger" aria-label="Abrir menu" aria-expanded="false">
            <span></span><span></span>
          </button>
        </div>
      </nav>
    </div>
    <div class="mobile-menu" role="dialog" aria-label="Menu de navegação">
      <a href="index.html"       data-pt="Início"         data-en="Home">Início</a>
      <a href="software.html"    data-pt="Software"       data-en="Software">Software</a>
      <a href="formacao.html"    data-pt="Formação"       data-en="Training">Formação</a>
      <a href="consultoria.html" data-pt="Consultoria AI" data-en="AI Consulting">Consultoria AI</a>
      <a href="tres-d.html"      data-pt="3D &amp; ArchViz" data-en="3D &amp; ArchViz">3D &amp; ArchViz</a>
      <a href="index.html#contacto" data-pt="Contacto"   data-en="Contact">Contacto</a>
    </div>`;

  const footerHTML = `
    <footer>
      <div class="container">
        <div class="footer-inner">
          <div class="footer-brand">
            <img src="imgs/logos/Hodoki Logo_white.png" alt="Hodoki" />
            <p data-pt="Inteligência Aplicada — Software, formação em AI e 3D, e consultoria com servidores on-premise conformes com o RGPD. Gondomar, Portugal."
               data-en="Applied Intelligence — Software, AI and 3D training, and consulting with GDPR-compliant on-premise servers. Gondomar, Portugal.">
              Inteligência Aplicada — Software, formação em AI e 3D, e consultoria com servidores on-premise conformes com o RGPD. Gondomar, Portugal.
            </p>
          </div>
          <div class="footer-col">
            <h5 data-pt="Serviços" data-en="Services">Serviços</h5>
            <ul class="footer-links">
              <li><a href="software.html"    data-pt="Software &amp; Websites" data-en="Software &amp; Websites">Software &amp; Websites</a></li>
              <li><a href="formacao.html"    data-pt="Formação"                data-en="Training">Formação</a></li>
              <li><a href="consultoria.html" data-pt="Consultoria AI"          data-en="AI Consulting">Consultoria AI</a></li>
              <li><a href="tres-d.html"      data-pt="3D &amp; ArchViz"        data-en="3D &amp; ArchViz">3D &amp; ArchViz</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5 data-pt="Empresa" data-en="Company">Empresa</h5>
            <ul class="footer-links">
              <li><a href="https://study.hodoki.pt" target="_blank" rel="noopener noreferrer">study.hodoki.pt</a></li>
              <li><a href="index.html#contacto" data-pt="Contacto" data-en="Contact">Contacto</a></li>
              <li><a href="privacy-policy.html"  data-pt="Política de Privacidade" data-en="Privacy Policy">Política de Privacidade</a></li>
              <li><a href="privacy-policy.html#rgpd" data-pt="RGPD" data-en="GDPR">RGPD</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p data-pt="© 2025 Hodoki — Inteligência Aplicada. Todos os direitos reservados."
             data-en="© 2025 Hodoki — Applied Intelligence. All rights reserved.">
            © 2025 Hodoki — Inteligência Aplicada. Todos os direitos reservados.
          </p>
          <a href="privacy-policy.html" data-pt="Política de Privacidade &amp; RGPD" data-en="Privacy Policy &amp; GDPR">Política de Privacidade &amp; RGPD</a>
        </div>
      </div>
    </footer>`;

  /* ── Inject ─────────────────────────────────────────────── */
  const topBarEl  = document.getElementById('top-bar-ph');
  const navEl     = document.getElementById('nav-ph');
  const footerEl  = document.getElementById('footer-ph');

  if (topBarEl) topBarEl.outerHTML = topBarHTML;
  if (navEl)    navEl.outerHTML    = navHTML;
  if (footerEl) footerEl.outerHTML = footerHTML;

  /* ── Hamburger ──────────────────────────────────────────── */
  function initHamburger() {
    const hb   = document.querySelector('.hamburger');
    const menu = document.querySelector('.mobile-menu');
    if (!hb || !menu) return;
    hb.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      hb.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        hb.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Language ───────────────────────────────────────────── */
  function applyLang(l) {
    lang = l;
    localStorage.setItem('hodoki-lang', l);
    document.querySelectorAll('[data-pt]').forEach(el => {
      el.innerHTML = l === 'pt' ? el.dataset.pt : (el.dataset.en || el.dataset.pt);
    });
    document.querySelectorAll('[data-pt-placeholder]').forEach(el => {
      el.placeholder = l === 'pt' ? el.dataset.ptPlaceholder : (el.dataset.enPlaceholder || el.dataset.ptPlaceholder);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === l);
    });
    document.documentElement.lang = l === 'pt' ? 'pt-PT' : 'en';
  }

  function initLang() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
    applyLang(lang);
  }

  /* ── Init (after DOM ready) ─────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { initHamburger(); initLang(); });
  } else {
    initHamburger(); initLang();
  }

  window.hodokiLang = () => lang;
})();
