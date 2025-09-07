// Belle Presentation - minimal, modular, MIKU style
(function(){
  function initBellePresentation(){
    const slides = document.querySelectorAll('.presentation-slide');
    if (!slides.length) return;
    let index = 0;
    const progress = document.querySelector('.presentation-progress .bar');
    const setActive = (i)=>{
      slides.forEach((s, n)=> s.classList.toggle('active', n===i));
      if (progress){
        const pct = Math.round(((i+1)/slides.length)*100);
        progress.style.width = pct+'%';
      }
    };
    const go = (dir)=>{
      index = (index + dir + slides.length) % slides.length;
      setActive(index);
    };
    document.querySelectorAll('.presentation-btn.prev-slide').forEach(b=>b.addEventListener('click', ()=>go(-1)));
    document.querySelectorAll('.presentation-btn.next-slide').forEach(b=>b.addEventListener('click', ()=>go(1)));
    setActive(index);
    // Auto control for nav integration
    window._presentationControl = {
      onShow(){ /* could resume */ },
      onHide(){ /* could pause */ }
    };
  }
  window.initBellePresentation = initBellePresentation;
})();
