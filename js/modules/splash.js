// 🎌 MIKU UI SYSTEM - SPLASH + EFFECTS + ENHANCED MAGIC! 🎌
window.MikuUI = (function(){
  
  // ========== SPLASH SCREEN SYSTEM ==========
  function initializeSplash(){
    const splash = document.getElementById('splash');
    const enterButton = document.getElementById('enterSite');
    const mainSite = document.getElementById('mainSite');
    
    if (!splash || !enterButton || !mainSite) return;
    if (splash.dataset.wired === '1') return;
    
    splash.dataset.wired = '1';
    
    const enterSite = () => {
      if (window.__entered) return;
      window.__entered = true;
      
      enterButton.disabled = true;
      splash.style.display = 'none';
      mainSite.classList.remove('hidden');
      
      // Initialize site properly
      const initFunction = window.initSite || (() => {});
      initFunction();
    };
    
    enterButton.addEventListener('click', enterSite, { once: true });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') enterSite();
    }, { capture: true });
    
    // Failsafe auto-enter after 6 seconds
    setTimeout(() => {
      if (splash.style.display !== 'none') enterSite();
    }, 6000);
  }

  // ========== KAWAII EFFECTS SYSTEM ==========
  function createToast(message, type = 'success'){
    const toast = document.createElement('div');
    toast.textContent = message;
    
    const colors = {
      success: { bg: '#e8f5e8', border: '#4caf50', text: '#1b5e20' },
      error: { bg: '#ffebee', border: '#f44336', text: '#c62828' },
      info: { bg: '#e3f2fd', border: '#2196f3', text: '#0d47a1' },
      miku: { bg: '#f0f8ff', border: '#00bcd4', text: '#006064' }
    };
    
    const color = colors[type] || colors.success;
    
    toast.style.cssText = `
      position: fixed; left: 50%; top: 24px; transform: translateX(-50%);
      background: ${color.bg}; border: 2px solid ${color.border}; color: ${color.text};
      border-radius: 12px; padding: 12px 20px; font-weight: 700;
      z-index: 99999; box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      font-family: 'Nunito', sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    // Kawaii animation
    toast.animate([
      { opacity: 0, transform: 'translate(-50%, -20px) scale(0.8)' },
      { opacity: 1, transform: 'translate(-50%, 0) scale(1)' },
      { opacity: 0, transform: 'translate(-50%, -20px) scale(0.8)' }
    ], {
      duration: 2000,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    });
    
    setTimeout(() => toast.remove(), 2100);
  }

  function createConfetti(count = 80){
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed; left: 0; top: 0; right: 0; bottom: 0;
      pointer-events: none; z-index: 99998;
    `;
    
    const mikuColors = ['#00bcd4', '#ff4081', '#4caf50', '#ffeb3b', '#e91e63', '#9c27b0'];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = 4 + Math.random() * 8;
      const color = mikuColors[Math.floor(Math.random() * mikuColors.length)];
      
      particle.style.cssText = `
        position: absolute; left: ${Math.random() * 100}vw; top: -20px;
        width: ${size}px; height: ${size}px; background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        opacity: 0.9;
      `;
      
      container.appendChild(particle);
      
      const endX = (Math.random() - 0.5) * 400;
      const endY = 200 + Math.random() * 400;
      const rotation = Math.random() * 720;
      
      particle.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${endX}px, ${endY}px) rotate(${rotation}deg)`, opacity: 0 }
      ], {
        duration: 1200 + Math.random() * 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      setTimeout(() => particle.remove(), 2200);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 2500);
  }

  // ========== BADGE SYSTEM ==========
  const BADGE_STORAGE_KEY = 'miku.badges';
  
  function getBadges(){
    const stored = localStorage.getItem(BADGE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  
  function hasBadge(badgeId){
    return getBadges().includes(badgeId);
  }
  
  function unlockBadge(badgeId, badgeName){
    if (hasBadge(badgeId)) return false;
    
    const badges = getBadges();
    badges.push(badgeId);
    localStorage.setItem(BADGE_STORAGE_KEY, JSON.stringify(badges));
    
    createToast(`🏆 Badge Unlocked: ${badgeName}`, 'miku');
    createConfetti(60);
    
    // Play achievement sound
    if (window.SFX?.play) window.SFX.play('hearts.milestone');
    
    return true;
  }

  // ========== ENHANCED UI MAGIC ==========
  function addMikuIconsEverywhere(){
    // Auto-add icons to headings
    const headings = document.querySelectorAll('h2:not([data-miku-icon]), h3:not([data-miku-icon])');
    const icons = ['star uwu', 'jumping with music notes', 'vibing', 'cheering', 'love letter'];
    
    headings.forEach((heading, index) => {
      if (window.mikuIcon) {
        const iconName = icons[index % icons.length];
        heading.innerHTML = `${window.mikuIcon(iconName, '✨')} ${heading.innerHTML}`;
        heading.setAttribute('data-miku-icon', 'true');
      }
    });

    // Auto-add icons to buttons
    const buttons = document.querySelectorAll('.pixel-btn:not([data-miku-icon])');
    const buttonIcons = ['ok hands', 'thumbs up', 'pow!', 'love', 'jumping with stars'];
    
    buttons.forEach((button, index) => {
      if (window.mikuIcon && !button.querySelector('.miku-icon')) {
        const iconName = buttonIcons[index % buttonIcons.length];
        button.innerHTML = `${window.mikuIcon(iconName, '✨')} ${button.textContent}`;
        button.setAttribute('data-miku-icon', 'true');
      }
    });
  }

  function enhanceWidgets(){
    const widgets = document.querySelectorAll('.widget:not([data-enhanced])');
    
    widgets.forEach((widget, index) => {
      widget.style.setProperty('--widget-index', index);
      
      if (!widget.querySelector('.widget-sparkle')) {
        const sparkle = document.createElement('div');
        sparkle.className = 'widget-sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
          position: absolute; top: -8px; right: -8px; font-size: 14px;
          animation: sparkleFloat 3s ease-in-out infinite; z-index: 1;
          pointer-events: none;
        `;
        widget.style.position = 'relative';
        widget.appendChild(sparkle);
      }
      
      widget.setAttribute('data-enhanced', 'true');
    });
  }

  // ========== DIVA FEEDBACK SYSTEM ==========
  function showDivaFeedback(elementId, message, isCorrect = true){
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = message;
    element.className = `diva-feedback-enhanced ${isCorrect ? 'correct' : 'incorrect'}`;
    element.style.display = 'block';
    element.style.opacity = '1';
    element.setAttribute('data-persistent', 'true');
  }

  function clearDivaFeedback(elementId){
    const element = document.getElementById(elementId);
    if (element?.getAttribute('data-persistent') === 'true') {
      element.style.opacity = '0';
      setTimeout(() => {
        element.textContent = '';
        element.style.display = 'none';
        element.removeAttribute('data-persistent');
      }, 300);
    }
  }

  // ========== AUTO-ENHANCEMENT OBSERVER ==========
  function startAutoEnhancement(){
    const observer = new MutationObserver(() => {
      // Debounce the enhancement calls
      clearTimeout(window._enhancementTimeout);
      window._enhancementTimeout = setTimeout(() => {
        addMikuIconsEverywhere();
        enhanceWidgets();
      }, 100);
    });
    
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
      observer.observe(mainContent, { childList: true, subtree: true });
    }
  }

  // ========== INITIALIZATION ==========
  function initialize(){
    // Initialize splash system
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeSplash);
    } else {
      initializeSplash();
    }
    
    // Enhance existing UI
    addMikuIconsEverywhere();
    enhanceWidgets();
    startAutoEnhancement();
  }

  // Start immediately
  initialize();

  // Public API
  return {
    splash: { initialize: initializeSplash },
    effects: { toast: createToast, confetti: createConfetti },
    badges: { get: getBadges, has: hasBadge, unlock: unlockBadge },
    feedback: { show: showDivaFeedback, clear: clearDivaFeedback },
    enhance: { icons: addMikuIconsEverywhere, widgets: enhanceWidgets }
  };
})();

// Legacy compatibility exports
window.showDivaFeedback = window.MikuUI.feedback.show;
window.clearDivaFeedback = window.MikuUI.feedback.clear;
window.Effects = { unlockBadge: window.MikuUI.badges.unlock, hasBadge: window.MikuUI.badges.has };
window.EnhancedUI = { 
  init: () => {}, 
  addMikuIconsEverywhere: window.MikuUI.enhance.icons,
  enhanceStatusOverlay: () => {}
};
