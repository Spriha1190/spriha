/**
 * Theme Toggle Controller — Midnight Velvet Dark is the explicit default theme;
 * clicking the toggle switches cleanly to Atelier Ivory Light and persists via localStorage.
 */
(() => {
  const STORAGE_KEY = 'spriha-theme';
  const metaEl = document.querySelector('meta[name="color-scheme"]');

  const readStoredScheme = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
    } catch {
      return metaEl?.content === 'light' ? 'light' : 'dark';
    }
  };

  const applyMeta = (scheme) => {
    if (!metaEl) return;
    metaEl.content = scheme === 'light' ? 'light' : 'dark';
  };

  const toggleScheme = () => {
    const next = readStoredScheme() === 'light' ? 'dark' : 'light';
    try {
      if (next === 'light') {
        localStorage.setItem(STORAGE_KEY, 'light');
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore blocked storage; apply for current page session
    }
    applyMeta(next);
  };

  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-theme-toggle]');
    if (!btn) return;
    toggleScheme();
  });

  // Stay in sync across open tabs
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    applyMeta(event.newValue === 'light' ? 'light' : 'dark');
  });
})();
