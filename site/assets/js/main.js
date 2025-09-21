/* TechTron main.js — nav fixes + theme + helpers */

(function() {
  // ----- CONFIG / BASE -------------------------------------------------------
  const META = document.querySelector('meta[name="site-base"]');
  const SITE_BASE = (META && META.content) || 'https://calcifergtp-glitch.github.io/techtron-blog/';

  // Map common nav labels -> page paths inside /site
  const NAV_MAP = {
    'home': 'index.html',
    'projects': 'projects.html',
    'about': 'about.html',
    'search': 'search.html',
    'contact': 'contact.html'
  };

  // Ensure a URL points at the right place under GitHub Pages subpath
  function toSiteUrl(path) {
    if (/^https?:\/\//i.test(path)) return path; // leave external links
    try {
      const u = new URL(path, SITE_BASE);
      return u.href;
    } catch {
      return SITE_BASE;
    }
  }

  // Fix all top nav links & logo no matter where we are (posts/projects)
  function fixNavLinks() {
    const anchors = [
      ...document.querySelectorAll('.site-nav a'),
      ...document.querySelectorAll('.logo, .logo-link, a.nav-home')
    ];

    anchors.forEach(a => {
      const raw = (a.getAttribute('data-href') || a.getAttribute('href') || '').trim();
      if (!raw) return;

      // If a "data-href" exists, trust it, otherwise map by link text
      let path = raw;
      if (!a.hasAttribute('data-href')) {
        const label = (a.textContent || '').toLowerCase().trim();
        if (NAV_MAP[label]) path = NAV_MAP[label];
      }

      a.setAttribute('href', toSiteUrl(path));
    });

    // Make sure any "back-home" helpers point to the site root
    document.querySelectorAll('.back-home, .nav-home').forEach(a => {
      a.setAttribute('href', toSiteUrl('index.html'));
    });
  }

  // ----- THEME ---------------------------------------------------------------
  function initTheme() {
    const key = 'tt-theme';
    const stored = localStorage.getItem(key);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;

    const btn = document.querySelector('[data-toggle-theme]');
    if (btn) {
      btn.addEventListener('click', () => {
        const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        localStorage.setItem(key, next);
      });
    }
  }

  // ----- INIT ----------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    fixNavLinks();
  });
})();