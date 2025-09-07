// Navigation module - clean and simple
window.navi = (function () {
  function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    let prev = null;
    sections.forEach((sec) => {
      const currentId = sec.id || sec.getAttribute("data-section");
      if (!sec.classList.contains("hidden")) prev = currentId;
      const show =
        currentId === sectionId ||
        currentId?.toLowerCase() === sectionId?.toLowerCase();
      sec.classList.toggle("hidden", !show);
    });
    // Presentation hooks
    if (sectionId === "Home") window._presentationControl?.onShow?.();
    else window._presentationControl?.onHide?.();
    // Wish cleanup when leaving
    if (prev === "Wish") window.__resetWish && window.__resetWish();
  }

  function initNavigation() {
    const links = document.querySelectorAll("#navbar a[data-section]");
    if (!links.length) return;
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("data-section");
        showSection(id);
        // Active link styling
        links.forEach((l) => l.classList.toggle("active", l === link));
      }),
    );
  }
  return {
    initNavigation: initNavigation,
  };
})();
