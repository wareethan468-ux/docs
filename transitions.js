(() => {
  if (window.__zoneDocsMotion) return;
  window.__zoneDocsMotion = true;
  let pendingFrame;
  let activeAnimation;
  let lastPath = location.pathname;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const enterPage = () => {
    if (location.pathname === lastPath) return;
    lastPath = location.pathname;
    cancelAnimationFrame(pendingFrame);
    activeAnimation?.cancel();
    if (reducedMotion.matches) return;
    pendingFrame = requestAnimationFrame(() => {
      const content = document.getElementById('content-area');
      if (!content) return;
      activeAnimation = content.animate([
        { opacity: 0, transform: 'translateY(6px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 280, easing: 'cubic-bezier(.22,1,.36,1)' });
    });
  };
  window.addEventListener('mintlify:navigate', enterPage);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) activeAnimation?.cancel();
  });
})();
