/**
 * Responsive Navigation (modern-web-guidance: navbar), Command Palette (Ctrl+K),
 * and Scroll Progress Indicator JS fallback.
 */
(() => {
  // Conditionally load popover polyfill ONLY when native popover support is absent
  if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
    import('https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js').catch(() => {});
  }

  // Shared light-dismiss fallback for browsers without <dialog closedby="any">
  window.attachDialogLightDismiss = (dialog) => {
    if (!dialog || dialog.dataset.lightDismissBound === '1') return;
    dialog.dataset.lightDismissBound = '1';

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isInside =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isInside) dialog.close();
      });
    }
  };

  // ---------- 1. ResizeObserver-Driven Responsive Navbar ----------
  const header = document.querySelector('.site-header');
  const headerInner = header?.querySelector('.header-inner');
  const siteMenu = document.getElementById('site-menu');

  if (header && headerInner && siteMenu) {
    let lastHeaderWidth = header.getBoundingClientRect().width;
    let isWideCurrent = false;

    const updateNavLayout = (force = false) => {
      const currentWidth = header.getBoundingClientRect().width;
      // When collapsed, only remeasure if the header grew (or forced on initial load)
      if (!force && !isWideCurrent && currentWidth <= lastHeaderWidth) {
        return;
      }
      lastHeaderWidth = currentWidth;

      const wasOpen =
        siteMenu.hasAttribute('popover') &&
        (siteMenu.matches(':popover-open') || siteMenu.classList.contains(':popover-open'));

      header.classList.add('is-measuring');
      header.classList.add('is-wide');
      siteMenu.removeAttribute('popover');

      const fits = headerInner.scrollWidth <= headerInner.clientWidth + 1;

      if (fits) {
        isWideCurrent = true;
        header.classList.add('is-wide');
        siteMenu.removeAttribute('popover');
      } else {
        isWideCurrent = false;
        header.classList.remove('is-wide');
        siteMenu.setAttribute('popover', 'auto');
        if (wasOpen && typeof siteMenu.showPopover === 'function') {
          try {
            siteMenu.showPopover();
          } catch {
            // Ignore if already transitioning
          }
        }
      }

      requestAnimationFrame(() => {
        header.classList.remove('is-measuring');
      });
    };

    updateNavLayout(true);

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => updateNavLayout(false));
      ro.observe(header);
      ro.observe(siteMenu);
    } else {
      window.addEventListener('resize', () => updateNavLayout(true));
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updateNavLayout(true)).catch(() => {});
    }

    // Close collapsed popover menu when clicking a navigation link
    siteMenu.addEventListener('click', (event) => {
      if (event.target.closest('a') && !isWideCurrent && typeof siteMenu.hidePopover === 'function') {
        try {
          siteMenu.hidePopover();
        } catch {
          // Ignore if closed
        }
      }
    });
  }

  // ---------- 2. Command Palette (Ctrl+K / Cmd+K) ----------
  const cmdDialog = document.getElementById('cmd-dialog');
  const cmdInput = document.getElementById('cmd-input');
  const cmdList = document.getElementById('cmd-list');

  if (cmdDialog && cmdInput && cmdList && window.SPRIHA_DATA) {
    window.attachDialogLightDismiss(cmdDialog);
    let filtered = [...window.SPRIHA_DATA.commands];
    let activeIdx = 0;

    const executeCommand = (item) => {
      if (!item) return;
      cmdDialog.close();
      if (item.action === 'navigate') {
        window.location.href = item.target;
      } else if (item.action === 'theme') {
        const themeBtn = document.querySelector('[data-theme-toggle]');
        if (themeBtn) themeBtn.click();
      } else if (item.action === 'copy') {
        navigator.clipboard?.writeText(item.target).then(() => {
          window.showToast?.(`Copied: ${item.target}`);
        }).catch(() => {});
      }
    };

    const renderCommands = () => {
      cmdList.innerHTML = '';
      if (!filtered.length) {
        const li = document.createElement('li');
        li.className = 'cmd-item-meta';
        li.style.padding = '0.85rem';
        li.textContent = 'No matching pages or actions found.';
        cmdList.appendChild(li);
        return;
      }

      filtered.forEach((item, idx) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cmd-item-btn';
        btn.setAttribute('aria-selected', idx === activeIdx ? 'true' : 'false');

        const labelSpan = document.createElement('span');
        labelSpan.textContent = item.label;
        const metaSpan = document.createElement('span');
        metaSpan.className = 'cmd-item-meta';
        metaSpan.textContent = item.hint;

        btn.append(labelSpan, metaSpan);
        btn.addEventListener('click', () => executeCommand(item));
        btn.addEventListener('mouseenter', () => {
          activeIdx = idx;
          cmdList.querySelectorAll('.cmd-item-btn').forEach((b, i) => {
            b.setAttribute('aria-selected', i === activeIdx ? 'true' : 'false');
          });
        });

        li.appendChild(btn);
        cmdList.appendChild(li);
      });
    };

    const openPalette = () => {
      filtered = [...window.SPRIHA_DATA.commands];
      activeIdx = 0;
      cmdInput.value = '';
      renderCommands();
      if (!cmdDialog.open) cmdDialog.showModal();
      cmdInput.focus();
    };

    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-open-cmd]')) openPalette();
    });

    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (cmdDialog.open) cmdDialog.close();
        else openPalette();
      }
    });

    cmdInput.addEventListener('input', () => {
      const q = cmdInput.value.trim().toLowerCase();
      filtered = window.SPRIHA_DATA.commands.filter((c) =>
        `${c.label} ${c.hint}`.toLowerCase().includes(q)
      );
      activeIdx = 0;
      renderCommands();
    });

    cmdInput.addEventListener('keydown', (event) => {
      if (!filtered.length) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        activeIdx = (activeIdx + 1) % filtered.length;
        renderCommands();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        activeIdx = (activeIdx - 1 + filtered.length) % filtered.length;
        renderCommands();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        executeCommand(filtered[activeIdx]);
      }
    });
  }

  // ---------- 3. Scroll Progress Indicator JS Fallback ----------
  const progressBar = document.getElementById('scroll-progress');
  if (
    progressBar &&
    !CSS.supports('animation-timeline', 'scroll()') &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  ) {
    const syncProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progressBar.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', syncProgress, { passive: true });
    window.addEventListener('resize', syncProgress, { passive: true });
    syncProgress();
  }
})();
