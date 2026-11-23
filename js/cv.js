/**
 * Curriculum Vitae (CV) Controls: Print PDF, Editorial/ATS Style Toggle & Personal Info Toggle
 */
(() => {
  const printBtn = document.getElementById('cv-print-btn');
  const styleBtn = document.getElementById('cv-style-toggle');
  const personalBtn = document.getElementById('cv-personal-toggle');
  const personalBlock = document.getElementById('cv-personal-block');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (styleBtn) {
    styleBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-cv-style') || 'editorial';
      const next = current === 'editorial' ? 'ats' : 'editorial';
      document.body.setAttribute('data-cv-style', next);
      styleBtn.setAttribute('aria-pressed', next === 'ats' ? 'true' : 'false');
      styleBtn.textContent = next === 'ats' ? 'Switch to Editorial Design' : 'Switch to Classic ATS Layout';
    });
  }

  if (personalBtn && personalBlock) {
    personalBtn.addEventListener('click', () => {
      const isHidden = personalBlock.hidden;
      personalBlock.hidden = !isHidden;
      personalBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      personalBtn.textContent = isHidden ? 'Hide Personal Details' : 'Show Personal Details';
    });
  }
})();
