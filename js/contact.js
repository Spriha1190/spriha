/**
 * Accessible Form Validation After Interaction
 * Follows modern-web-guidance: validate-input-after-interaction & accessible-error-announcement
 */
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // One polite live region for the page announces errors after blur/change
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.classList.add('visually-hidden');
  document.body.append(announcer);

  let announceTimer;
  let announcedField;
  const flagged = new WeakSet();
  const announced = new WeakSet();
  const supportsUserInvalid = CSS.supports('selector(:user-invalid)');
  const fallbackDirtyState = new WeakMap();

  const spokenText = (node) => {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
      n.replaceWith(`${n.getAttribute('aria-label')}: `);
    });
    return copy.textContent.replace(/\s+/g, ' ').trim();
  };

  const linkError = (el, shown) => {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
    else el.removeAttribute('aria-describedby');
  };

  const announceError = (el) => {
    const error = document.getElementById(el.dataset.error);
    if (!error) return;
    const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : '';
    clearTimeout(announceTimer);
    announcer.textContent = '';
    announcedField = el;
    announceTimer = setTimeout(() => {
      announcer.textContent = label + spokenText(error);
    }, 500);
  };

  const isControlUserInvalid = (el) => {
    if (supportsUserInvalid) return el.matches(':user-invalid');
    const st = fallbackDirtyState.get(el);
    return Boolean(st && st.hasInteracted && st.hasBlurred && !el.validity.valid);
  };

  const syncAria = (el, announce = false) => {
    if (!el.matches?.('input.control, select.control, textarea.control')) return;
    const invalid = isControlUserInvalid(el);

    if (!supportsUserInvalid) {
      const st = fallbackDirtyState.get(el);
      const show = Boolean(st && st.hasInteracted && st.hasBlurred);
      el.classList.toggle('user-invalid-fallback', show && !el.validity.valid);
      el.classList.toggle('user-valid-fallback', show && el.validity.valid);
    }

    if (invalid) {
      if (announce && !announced.has(el)) {
        announceError(el);
        announced.add(el);
      }
      el.setAttribute('aria-invalid', 'true');
      linkError(el, true);
      flagged.add(el);
    } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
      el.setAttribute('aria-invalid', 'false');
      linkError(el, false);
      flagged.delete(el);
      announced.delete(el);
      if (announcedField === el) {
        clearTimeout(announceTimer);
        announcer.textContent = '';
      }
    }
  };

  // Start every field at aria-invalid="false"
  form.querySelectorAll('input.control, select.control, textarea.control').forEach((el) => syncAria(el));

  form.addEventListener(
    'blur',
    (e) => {
      if (!supportsUserInvalid && e.target.matches?.('input.control, select.control, textarea.control')) {
        const st = fallbackDirtyState.get(e.target) || { hasInteracted: false, hasBlurred: false };
        st.hasBlurred = true;
        fallbackDirtyState.set(e.target, st);
      }
      syncAria(e.target, true);
    },
    true
  );

  form.addEventListener('input', (e) => {
    if (!supportsUserInvalid && e.target.matches?.('input.control, select.control, textarea.control')) {
      const st = fallbackDirtyState.get(e.target) || { hasInteracted: false, hasBlurred: false };
      st.hasInteracted = true;
      fallbackDirtyState.set(e.target, st);
    }
    if (e.target.hasAttribute('aria-invalid')) syncAria(e.target, false);
  });

  form.addEventListener(
    'change',
    (e) => {
      if (!supportsUserInvalid && e.target.matches?.('input.control, select.control, textarea.control')) {
        const st = fallbackDirtyState.get(e.target) || { hasInteracted: false, hasBlurred: false };
        st.hasInteracted = true;
        st.hasBlurred = true;
        fallbackDirtyState.set(e.target, st);
      }
      syncAria(e.target, true);
    },
    true
  );

  form.addEventListener(
    'invalid',
    (e) => {
      if (!supportsUserInvalid) {
        fallbackDirtyState.set(e.target, { hasInteracted: true, hasBlurred: true });
      }
      announced.add(e.target);
      syncAria(e.target, false);
    },
    true
  );

  form.addEventListener(
    'reset',
    () => {
      setTimeout(() => {
        form.querySelectorAll('input.control, select.control, textarea.control').forEach((el) => {
          fallbackDirtyState.delete(el);
          el.classList.remove('user-invalid-fallback', 'user-valid-fallback');
          syncAria(el, false);
        });
      });
    },
    true
  );

  const successBox = document.getElementById('contact-success');
  const mailtoBtn = document.getElementById('contact-mailto-link');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const subject = form.elements.subject.value;
    const inquiry = form.querySelector('input[name="inquiryType"]:checked')?.value || 'General';
    const message = form.elements.message.value.trim();

    if (mailtoBtn) {
      const bodyText = `Hi Spriha,\n\nName: ${name}\nEmail: ${email}\nType: ${inquiry}\n\n${message}`;
      mailtoBtn.href = `mailto:puja23105101302@gmail.com?subject=${encodeURIComponent(`[Portfolio - ${inquiry}] ${subject}`)}&body=${encodeURIComponent(bodyText)}`;
    }

    if (successBox) {
      successBox.hidden = false;
      successBox.focus?.();
    }
    announcer.textContent = 'Message prepared! You can send it via your email app or copy Spriha’s email.';
    window.showToast?.('Message validated and ready!');
  });
})();
