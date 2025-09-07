// Navigation module - handles section switching and related cleanup
window.navi = (function () {
  function showSection(sectionId) {
    const sections = document.querySelectorAll("section.content-section");
    if (!sections.length) return;
    let prev = null;
    sections.forEach((sec) => {
      const currentId = sec.id || sec.getAttribute("data-section");
      if (sec.classList.contains("active")) prev = currentId;
      const match =
        currentId === sectionId ||
        currentId?.toLowerCase() === sectionId?.toLowerCase();
      sec.classList.toggle("active", match);
      sec.classList.remove("hidden");
      if (match) sec.style.animation = "fadeInUp 0.5s ease-out";
    });

    const links = document.querySelectorAll("#navbar a[data-section]");
    links.forEach((l) => {
      const id = l.getAttribute("data-section");
      l.classList.toggle(
        "active",
        id === sectionId || id?.toLowerCase() === sectionId?.toLowerCase(),
      );
    });

    if (sectionId?.toLowerCase() === "home")
      window._presentationControl?.onShow?.();
    else window._presentationControl?.onHide?.();

    if (prev === "games") window.__memoryStop && window.__memoryStop();
    if (prev === "study") {
      window.__vocabStop && window.__vocabStop();
      window.__kanjiStop && window.__kanjiStop();
      typeof window.__resetStudy === "function" && window.__resetStudy();
    }
    if (prev === "Wish" || sectionId === "Wish")
      window.__resetWish && window.__resetWish();

    window.SFX?.play("ui.change");
    if (Math.random() < 0.15) window.SFX?.play("extra.fx2");
  }

  function initNavigation() {
    const links = document.querySelectorAll("#navbar a[data-section]");
    if (!links.length) return;
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("data-section");
        showSection(id);
      }),
    );
    if (links[0]) links[0].classList.add("active");
  }
  return { initNavigation, showSection };
})();
