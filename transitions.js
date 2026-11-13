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
      ], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' });
    });
  };
  window.addEventListener('mintlify:navigate', enterPage);
  document.addEventListener('click', event => {
    if (reducedMotion.matches || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    const target = new URL(link.href, location.href);
    if (target.origin !== location.origin || target.pathname === location.pathname) return;
    activeAnimation?.cancel();
    const content = document.getElementById('content-area');
    activeAnimation = content?.animate([{opacity:1},{opacity:.7}], {duration:130,easing:'ease-out'});
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) activeAnimation?.cancel();
  });
})();
