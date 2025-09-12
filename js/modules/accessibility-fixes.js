// Runtime accessibility & progressive enhancement fixes
(function() {
  function addMissingImageAlt() {
    const imgs = document.querySelectorAll('img:not([alt]), img[alt=""]');
    imgs.forEach(img => {
      const file = (img.src || '').split('/').pop().split('?')[0];
      const guess = file.replace(/[-_]/g, ' ').replace(/\.(png|jpe?g|gif|webp|svg)$/i,'');
      img.alt = guess || 'Decorative image';
    });
  }

  function labelFormControls() {
    const controls = document.querySelectorAll('input, select, textarea');
    controls.forEach(ctrl => {
      if (ctrl.type === 'hidden') return;
      const id = ctrl.id;
      const hasLabel = id && document.querySelector(`label[for="${id}"]`);
      const aria = ctrl.getAttribute('aria-label') || ctrl.getAttribute('title');
      if (!hasLabel && !aria) {
        const name = ctrl.name || ctrl.placeholder || 'form field';
        ctrl.setAttribute('aria-label', name);
      }
    });
  }

  function titleIframes() {
    const iframes = document.querySelectorAll('iframe:not([title])');
    let i = 1;
    iframes.forEach(f => {
      f.title = f.src ? `Embedded content ${i++}` : `Embedded frame ${i++}`;
    });
  }

  function addAutocomplete() {
    const mapping = [
      { sel: 'input[type=email]:not([autocomplete])', value: 'email' },
      { sel: 'input[type=search]:not([autocomplete])', value: 'off' },
      { sel: 'input[type=tel]:not([autocomplete])', value: 'tel' },
      { sel: 'input[type=url]:not([autocomplete])', value: 'url' },
      { sel: 'input[name*=name]:not([autocomplete]), input[name*=username]:not([autocomplete])', value: 'name' },
      { sel: 'input[type=password]:not([autocomplete])', value: 'current-password' },
      { sel: 'input[name*=address]:not([autocomplete])', value: 'street-address' }
    ];
    mapping.forEach(m => {
      document.querySelectorAll(m.sel).forEach(el => el.setAttribute('autocomplete', m.value));
    });
  }

  function run() {
    addMissingImageAlt();
    labelFormControls();
    titleIframes();
    addAutocomplete();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();