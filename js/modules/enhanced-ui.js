// Enhanced UI module for Project DIVA-style feedback and cute animations
(function() {
  // Enhanced feedback system with persistent DIVA styling
  function enhanceFeedback() {
    const feedbackElements = [
      'vocabFeedback', 
      'kanjiFeedback', 
      'kotobaFeedback',
      'typingFeedback'
    ];
    
    feedbackElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.add('diva-feedback-enhanced');
        element.style.position = 'absolute';
        element.style.zIndex = '9999';
        element.style.pointerEvents = 'none';
      }
    });
  }

  // Add Miku icons throughout the interface
  function addMikuIconsEverywhere() {
    // Add icons to section headings
    const headings = document.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      if (!heading.querySelector('.miku-icon') && window.mikuIcon) {
        const icons = ['star uwu', 'jumping with music notes', 'vibing', 'cheering', 'love letter'];
        const iconName = icons[index % icons.length];
        heading.innerHTML = `${mikuIcon(iconName, '✨')} ${heading.innerHTML}`;
      }
    });

    // Add icons to buttons that don't have them
    const buttons = document.querySelectorAll('.pixel-btn:not([data-has-icon])');
    buttons.forEach((btn, index) => {
      if (window.mikuIcon && !btn.querySelector('.miku-icon')) {
        const icons = ['ok hands', 'thumbs up', 'pow!', 'love', 'jumping with stars'];
        const iconName = icons[index % icons.length];
        btn.setAttribute('data-has-icon', 'true');
        btn.innerHTML = `${mikuIcon(iconName, '✨')} ${btn.textContent}`;
      }
    });

    // Add floating icons to widgets
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach((widget, index) => {
      widget.style.setProperty('--widget-index', index);
      if (!widget.querySelector('.widget-sparkle')) {
        const sparkle = document.createElement('div');
        sparkle.className = 'widget-sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
          position: absolute;
          top: -8px;
          right: -8px;
          font-size: 12px;
          animation: sparkleFloat 3s ease-in-out infinite;
          z-index: 1;
        `;
        widget.style.position = 'relative';
        widget.appendChild(sparkle);
      }
    });
  }

  // Enhance status overlay behavior
  function enhanceStatusOverlay() {
    const overlay = document.getElementById('itemsStatusOverlay');
    if (overlay) {
      // Initially hide the overlay
      overlay.style.display = 'none';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';

      // Show overlay when items are active
      window.showStatusOverlay = function() {
        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = '1', 10);
      };

      // Hide overlay when no items are active
      window.hideStatusOverlay = function() {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 300);
      };
    }
  }

  // Enhanced DIVA-style feedback that persists
  window.showDivaFeedback = function(elementId, message, isCorrect = true) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = message;
    element.className = `diva-feedback-enhanced ${isCorrect ? 'correct' : 'incorrect'}`;
    element.style.display = 'block';
    element.style.opacity = '1';
    
    // Don't auto-hide - let the next question clear it
    element.setAttribute('data-persistent', 'true');
  };

  // Clear feedback only when starting new question
  window.clearDivaFeedback = function(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.getAttribute('data-persistent') === 'true') {
      element.style.opacity = '0';
      setTimeout(() => {
        element.textContent = '';
        element.style.display = 'none';
        element.removeAttribute('data-persistent');
      }, 300);
    }
  };

  // Initialize enhancements
  function init() {
    enhanceFeedback();
    addMikuIconsEverywhere();
    enhanceStatusOverlay();
    // Auto-enhance future DOM changes
    const mainContent = document.getElementById('mainContent') || document.body;
    if (window._enhanceObserver) return; // idempotent
    const observer = new MutationObserver(()=>{
      clearTimeout(window._enhanceDebounce);
      window._enhanceDebounce = setTimeout(()=>{
        addMikuIconsEverywhere();
      }, 60);
    });
    window._enhanceObserver = observer;
    observer.observe(mainContent, { childList: true, subtree: true });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose module
  window.EnhancedUI = {
    enhanceFeedback,
    addMikuIconsEverywhere,
    enhanceStatusOverlay,
    init
  };
})();
