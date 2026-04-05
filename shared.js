/* shared.js — injects nav + footer, handles scroll + FAQ + mobile menu */
(function () {
  /* ── helpers ── */
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /* ── active page ── */
  const path = location.pathname.replace(/\/$/, '') || '/';
  const navLinks = {
    '/':            'Home',
    '/work':        'Work',
    '/pricing':     'Pricing',
    '/how-it-works':'How It Works',
    '/about':       'About',
    '/contact':     'Contact',
  };

  /* ── resolve href: relative on file://, clean on http ── */
  const isFile = location.protocol === 'file:';
  function pageHref(slug) {
    // slug is like '/work' or '/'
    if (slug === '/') return isFile ? 'index.html' : '/';
    const name = slug.replace(/^\//, ''); // 'work'
    return isFile ? name + '.html' : '/' + name;
  }

  function navHTML() {
    return Object.entries(navLinks).map(([href, label]) => {
      const active = (path === href || (href !== '/' && path.startsWith(href))) ? 'class="active"' : '';
      return `<a href="${pageHref(href)}" ${active}>${label}</a>`;
    }).join('');
  }

  const freeReviewHref = isFile ? 'free-review.html' : '/free-review';
  const contactHref    = isFile ? 'contact.html'     : '/contact';

  /* ── inject header ── */
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="announce">
      Transparent pricing. Ongoing support. No agency fluff.&nbsp;&nbsp;<a href="${freeReviewHref}">Get a free review →</a>
    </div>
    <header id="hdr">
      <div class="wrap">
        <nav class="nav">
          <a href="${pageHref('/')}" class="logo">
            <div class="logo-mark">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            Local<span>Lift</span>
          </a>
          <div class="nav-links">${navHTML()}</div>
          <div class="nav-right">
            <a href="${freeReviewHref}" class="btn btn-primary" style="height:42px;padding:0 18px;font-size:14px">Get a free review</a>
            <button class="hamburger" id="ham" aria-label="Open menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
    <div class="mobile-menu" id="mob">
      <button class="mobile-menu-close" id="mob-close" aria-label="Close menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      ${Object.entries(navLinks).map(([href,label]) => `<a href="${pageHref(href)}">${label}</a>`).join('')}
      <a href="${contactHref}" style="margin-top:16px" class="btn btn-primary">Get in touch</a>
    </div>
  `);

  /* ── inject footer ── */
  document.body.insertAdjacentHTML('beforeend', `
    <footer id="ftr">
      <div class="wrap">
        <div class="ftr-grid">
          <div class="ftr-brand">
            <a href="${pageHref('/')}" class="logo">
              <div class="logo-mark">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
              </div>
              Local<span>Lift</span>
            </a>
            <p>Affordable websites for local businesses that need more trust online. We build clean, mobile-friendly websites and keep them updated monthly.</p>
            <div class="ftr-contact">
              <a href="mailto:localliftstudio@gmail.com">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                localliftstudio@gmail.com
              </a>
              <span style="font-size:13px;color:#64748b;display:flex;align-items:center;gap:6px">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Downingtown, Pennsylvania
              </span>
            </div>
          </div>
          <div class="ftr-col">
            <h5>Company</h5>
            <a href="${pageHref('/')}">Home</a>
            <a href="${pageHref('/work')}">Work</a>
            <a href="${pageHref('/pricing')}">Pricing</a>
            <a href="${pageHref('/how-it-works')}">How It Works</a>
            <a href="${pageHref('/about')}">About</a>
            <a href="${pageHref('/contact')}">Contact</a>
          </div>
          <div class="ftr-col">
            <h5>Legal</h5>
            <a href="${isFile ? 'privacy.html' : '/privacy'}">Privacy Policy</a>
            <a href="${isFile ? 'terms.html' : '/terms'}">Terms of Service</a>
            <a href="${isFile ? 'cookie-policy.html' : '/cookie-policy'}">Cookie Notice</a>
          </div>
        </div>
        <div class="ftr-bottom">
          <p>© 2026 LocalLift. All rights reserved.</p>
          <div class="ftr-legal">
            <a href="${isFile ? 'privacy.html' : '/privacy'}">Privacy</a>
            <a href="${isFile ? 'terms.html' : '/terms'}">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  `);

  /* ── sticky header ── */
  const hdr = document.getElementById('hdr');
  window.addEventListener('scroll', () => {
    hdr.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── mobile menu ── */
  document.getElementById('ham').onclick = () => document.getElementById('mob').classList.add('open');
  document.getElementById('mob-close').onclick = () => document.getElementById('mob').classList.remove('open');

  /* ── scroll reveal ── */
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.children].filter(el => el.classList.contains('reveal'));
      const i = siblings.indexOf(e.target);
      setTimeout(() => e.target.classList.add('in'), i * 65);
      ro.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  /* ── FAQ ── */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();