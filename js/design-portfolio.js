/* One directory, one visible product; fragments also work on refresh and Back. */
(() => {
  const directory = document.querySelector('.design-tabs');
  const content = document.querySelector('.design-content');
  if (!directory || !content) return;
  const tabs = [...directory.querySelectorAll('[role="tab"]')];

  function activate(project, focus = false, reveal = false) {
    const selected = tabs.find(tab => tab.dataset.project === project) || tabs[0];
    tabs.forEach(tab => {
      const active = tab === selected;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panel.hidden = !active;
      if (active) panel.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    });
    if (focus) selected.focus({ preventScroll: true });
    // A switch from deep in a product should reveal the new product's beginning.
    if (reveal) {
      const top = content.getBoundingClientRect().top + window.scrollY - directory.offsetHeight;
      if (window.scrollY > top) window.scrollTo({ top, behavior: 'instant' });
    }
  }

  function choose(tab, focus = false) {
    if (location.hash.slice(1) !== tab.dataset.project) {
      history.pushState(null, '', `#${tab.dataset.project}`);
    }
    activate(tab.dataset.project, focus, true);
  }

  directory.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (tab && directory.contains(tab)) choose(tab);
  });
  directory.addEventListener('keydown', event => {
    const index = tabs.indexOf(event.target);
    if (index < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    choose(tabs[next], true);
  });
  window.addEventListener('hashchange', () => activate(location.hash.slice(1), false, true));
  window.addEventListener('popstate', () => activate(location.hash.slice(1), false, true));
  activate(location.hash.slice(1));
})();
