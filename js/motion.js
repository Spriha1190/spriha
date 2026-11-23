/**
 * Signature Motion & Micro-Interactions:
 * - Pointer Spotlight (--mx, --my) on cards
 * - Subtle 3D Micro-Tilt on cards & arch portrait
 * - Magnetic Hover Pull on primary/secondary buttons & logo
 * - Refined Ambient Cursor Glow Ring (desktop fine pointers only)
 * - Kinetic Hero Role Rotator
 * - Expandable Research Abstract Toggles
 */
(() => {
  const canHoverFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- 1. Pointer Spotlight, Tilt & Magnetic Pull ----------
  if (canHoverFine && !reducedMotion) {
    document.addEventListener('pointermove', (event) => {
      // Card Spotlight & Micro-Tilt
      const spotCard = event.target.closest('.spotlight-card');
      if (spotCard) {
        const rect = spotCard.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        spotCard.style.setProperty('--mx', `${x.toFixed(1)}px`);
        spotCard.style.setProperty('--my', `${y.toFixed(1)}px`);

        if (spotCard.classList.contains('tilt-card')) {
          const nx = (x / rect.width - 0.5) * 2; // -1..1
          const ny = (y / rect.height - 0.5) * 2;
          spotCard.style.setProperty('--rx', `${(-ny * 3.2).toFixed(2)}deg`);
          spotCard.style.setProperty('--ry', `${(nx * 3.2).toFixed(2)}deg`);
        }
      }

      // Portrait Specular Sheen
      const stage = event.target.closest('.portrait-stage');
      if (stage) {
        const rect = stage.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 100;
        const py = ((event.clientY - rect.top) / rect.height) * 100;
        stage.style.setProperty('--px', `${px.toFixed(1)}%`);
        stage.style.setProperty('--py', `${py.toFixed(1)}%`);
      }

      // Magnetic Button Pull (max +-5px)
      const mag = event.target.closest('.magnetic-btn');
      if (mag) {
        const rect = mag.getBoundingClientRect();
        const dx = ((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 4.5;
        const dy = ((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 3.5;
        mag.style.setProperty('--mag-x', `${dx.toFixed(1)}px`);
        mag.style.setProperty('--mag-y', `${dy.toFixed(1)}px`);
      }
    }, { passive: true });

    document.addEventListener('pointerout', (event) => {
      const tilt = event.target.closest('.tilt-card');
      if (tilt && !tilt.contains(event.relatedTarget)) {
        tilt.style.setProperty('--rx', '0deg');
        tilt.style.setProperty('--ry', '0deg');
      }
      const mag = event.target.closest('.magnetic-btn');
      if (mag && !mag.contains(event.relatedTarget)) {
        mag.style.setProperty('--mag-x', '0px');
        mag.style.setProperty('--mag-y', '0px');
      }
    });

    // ---------- 2. Refined Ambient Cursor Glow Ring ----------
    const aura = document.createElement('div');
    aura.className = 'cursor-aura';
    aura.setAttribute('aria-hidden', 'true');
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.append(aura, dot);

    let cx = -100;
    let cy = -100;
    let ax = -100;
    let ay = -100;
    let visible = false;
    let cursorRaf = null;

    const tickCursor = () => {
      if (!visible) {
        cursorRaf = null;
        return;
      }
      ax += (cx - ax) * 0.18;
      ay += (cy - ay) * 0.18;
      aura.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0)`;
      dot.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      cursorRaf = requestAnimationFrame(tickCursor);
    };

    window.addEventListener('pointermove', (event) => {
      cx = event.clientX;
      cy = event.clientY;
      if (!visible) {
        visible = true;
        ax = cx;
        ay = cy;
        aura.classList.add('is-visible');
        dot.classList.add('is-visible');
        if (cursorRaf === null) cursorRaf = requestAnimationFrame(tickCursor);
      }
      const interactive = Boolean(event.target.closest('a, button, input, select, textarea, .project-card, .media-card'));
      aura.classList.toggle('is-interactive', interactive);
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      visible = false;
      aura.classList.remove('is-visible');
      dot.classList.remove('is-visible');
    });
  }

  // ---------- 3. Kinetic Hero Role Rotator ----------
  const roleEl = document.getElementById('kinetic-role-text');
  if (roleEl && !reducedMotion) {
    const roles = [
      'Software & Web Systems Builder',
      'AI, Machine Learning & Graphics Enthusiast',
      'B.Sc. in CSE · Daffodil International University',
      'Creative Technologist & UI Craftsperson'
    ];
    let idx = 0;
    let paused = false;

    roleEl.parentElement?.addEventListener('mouseenter', () => { paused = true; });
    roleEl.parentElement?.addEventListener('mouseleave', () => { paused = false; });

    setInterval(() => {
      if (paused || document.hidden) return;
      roleEl.classList.add('is-swapping');
      setTimeout(() => {
        idx = (idx + 1) % roles.length;
        roleEl.textContent = roles[idx];
        roleEl.classList.remove('is-swapping');
      }, 260);
    }, 3400);
  }

  // ---------- 4. Research Abstract Expand / Collapse Toggles ----------
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-abstract-toggle]');
    if (!btn) return;
    const panelId = btn.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    panel.hidden = isExpanded;
    btn.textContent = isExpanded ? 'Read Research Abstract' : 'Hide Research Abstract';
  });
})();
