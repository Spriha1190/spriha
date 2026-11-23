/**
 * Shared Interactive Behaviors:
 * - Accessible Toast Notifications
 * - Copy-to-Clipboard triggers
 * - Dual-view Skills Cards / Spec Table toggle
 * - Creative Media Lightbox Modal (about.html)
 */
(() => {
  // ---------- 1. Accessible Toast ----------
  const shelf = document.createElement('div');
  shelf.className = 'toast-shelf';
  shelf.setAttribute('aria-live', 'polite');
  shelf.setAttribute('role', 'status');
  document.body.appendChild(shelf);

  window.showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    shelf.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2600);
  };

  // ---------- 2. Copy-to-Clipboard ----------
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-copy-text]');
    if (!btn) return;
    const text = btn.getAttribute('data-copy-text');
    const label = btn.getAttribute('data-copy-label') || text;
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => window.showToast(`Copied ${label} to clipboard`))
        .catch(() => window.showToast(text));
    } else {
      window.showToast(text);
    }
  });

  // ---------- 3. Skills Cards vs Spec Table Toggle ----------
  const skillsCardsPanel = document.getElementById('skills-cards-panel');
  const skillsTablePanel = document.getElementById('skills-table-panel');
  const skillsViewButtons = document.querySelectorAll('[data-skills-view]');

  if (skillsCardsPanel && skillsTablePanel && skillsViewButtons.length) {
    skillsViewButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-skills-view');
        skillsViewButtons.forEach((b) => {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        if (mode === 'table') {
          skillsCardsPanel.hidden = true;
          skillsTablePanel.hidden = false;
        } else {
          skillsCardsPanel.hidden = false;
          skillsTablePanel.hidden = true;
        }
      });
    });
  }

  // ---------- 4. Media Lightbox Dialog (about.html) ----------
  const mediaDialog = document.getElementById('media-dialog');
  if (mediaDialog && window.SPRIHA_DATA) {
    window.attachDialogLightDismiss?.(mediaDialog);
    const imgEl = document.getElementById('media-dialog-img');
    const titleEl = document.getElementById('media-dialog-title');
    const subEl = document.getElementById('media-dialog-subtitle');
    const capEl = document.getElementById('media-dialog-caption');

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-media-id]');
      if (!trigger) return;
      const item = window.SPRIHA_DATA.mediaGallery.find(
        (m) => m.id === trigger.getAttribute('data-media-id')
      );
      if (!item) return;

      imgEl.src = item.image;
      imgEl.alt = item.alt;
      titleEl.textContent = item.title;
      subEl.textContent = item.subtitle;
      capEl.textContent = item.caption;
      mediaDialog.showModal();
    });
  }
})();
