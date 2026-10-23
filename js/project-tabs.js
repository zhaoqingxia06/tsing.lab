/* Each product owns an introduction panel and a shareable URL fragment. */
(() => {
  const tablist = document.querySelector('[data-product-tabs]');
  if (!tablist) return;

  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const firstProduct = tabs[0].dataset.product;

  function activate(product, focus = false) {
    const selected = tabs.find(tab => tab.dataset.product === product) || tabs[0];
    tabs.forEach(tab => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) selected.focus();
  }

  function choose(tab, focus = false) {
    activate(tab.dataset.product, focus);
    if (location.hash.slice(1) !== tab.dataset.product) {
      location.hash = tab.dataset.product;
    }
  }

  tablist.addEventListener('click', event => {
    const tab = event.target.closest('[role="tab"]');
    if (tab && tablist.contains(tab)) choose(tab);
  });

  tablist.addEventListener('keydown', event => {
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

  window.addEventListener('hashchange', () => activate(location.hash.slice(1) || firstProduct));
  activate(location.hash.slice(1) || firstProduct);
})();
