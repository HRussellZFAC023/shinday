// Utility helpers extracted from main.js
// Provides mikuIcon renderer and basic DOM shortcuts.
(function () {
  const getIcons = () => (window.SITE_CONTENT?.images?.mikuIcons) || {};

  function mikuIcon(iconName, alt = "", className = "miku-icon") {
    const icons = getIcons();
    if (icons[iconName]) {
      return `<img src="${icons[iconName]}" alt="${alt}" class="${className}" style="width:24px;height:24px;display:inline-block;vertical-align:middle;margin:0 2px;">`;
    }
    return `<span class="emoji-fallback">${alt}</span>`;
  }

  const byId = (id) => document.getElementById(id);

  window.mikuIcon = mikuIcon;
  window.$ = byId;
  window.byId = byId;
})();

