// 🎮 Ultimate Miku Gacha Experience - Advanced Physics & Animations
class UltimateMikuGacha {
  constructor() {
    this.isAnimating = false;
    this.mikuPool = window.MIKU_IMAGES || [];
    this.currentResults = [];
    this.previousResults = []; // Store previous results for clearing
    this.animationSequence = {
      centerCrazy: 3000,      // Center -> Left/Right random crazy (3s)
      slowDescent: 4000,      // Slow descent with cable stretch (4s)
      grab: 1000,             // Grab Miku plushie (1s)
      slowAscent: 4000,       // Slow ascent with cable contract (4s)
      slowRight: 3000,        // Slow move right (3s)
      extremeDrop: 2000       // Extreme Miku drop (2s)
    };
    
    this.sounds = {
      ambient: null,
      clawMove: null,
      clawDrop: null,
      clawGrab: null,
      mikuDrop: null,
      cardReveal: null,
      legendary: null
    };
    
    this.init();
  }

  init() {
    this.setupSounds();
    this.ensureElements();
    this.wireEvents();
    this.startBackgroundMikus();
    this.setupJoystickCursor();
    this.setupClearPreviousResults();
    console.log('🎮 Ultimate Miku Gacha initialized with advanced physics');
  }

  setupSounds() {
    try {
      if (window.SFX) {
        this.sounds.ambient = () => window.SFX.play('bgm');
        this.sounds.clawMove = () => window.SFX.play('Wish.claw_move');
        this.sounds.clawDrop = () => window.SFX.play('Wish.claw_down');
        this.sounds.clawGrab = () => window.SFX.play('Wish.claw_grab');
        this.sounds.mikuDrop = () => window.SFX.play('Wish.miku_drop');
        this.sounds.cardReveal = () => window.SFX.play('Wish.reveal');
        this.sounds.legendary = () => window.SFX.play('extra.thanks');
      }
    } catch (error) {
      console.warn('Sound system not available:', error);
    }
  }

  ensureElements() {
    const container = document.querySelector('.claw-machine-container');
    if (!container) return;

    // Create status bar with LCD inside (pinned to machine)
    if (!container.querySelector('.cm-status-bar')) {
      const statusBar = document.createElement('div');
      statusBar.className = 'cm-status-bar';
      statusBar.innerHTML = `
        <div class="cm-lcd-marquee">
          <div class="cm-lcd-screen">
            <div class="cm-lcd-track">
              <div class="cm-lcd-text">✨ Ultimate Miku Arcade Experience ✨ Advanced Physics & Bright Colors!</div>
            </div>
          </div>
        </div>
        <div class="cm-status-info">
          <div class="cm-status-tokens" id="WishTokens">3</div>
        </div>
      `;
      container.insertBefore(statusBar, container.firstChild);
    }

    // Create enhanced cabinet with advanced physics system
    if (!container.querySelector('.cm-cabinet')) {
      const cabinet = document.createElement('div');
      cabinet.className = 'cm-cabinet';
      cabinet.innerHTML = `
        <div class="cm-window">
          <div class="cm-claw-system">
            <div class="cm-claw" id="clawElement">
              <div class="cm-claw-cable" id="clawCable"></div>
              <div class="cm-claw-body"></div>
              <div class="cm-claw-arms">
                <div class="cm-claw-arm"></div>
                <div class="cm-claw-arm"></div>
              </div>
            </div>
          </div>
          <div class="cm-preview-rotation" id="WishRotation">
            <div class="cm-preview-subtle">
              <div class="preview-glow"></div>
              <img class="preview-image" alt="Miku preview" />
            </div>
          </div>
        </div>
        <div class="cm-results-container" id="WishResults" hidden>
          <div class="cm-miku-background" id="mikuBackground"></div>
          <div class="cm-results-grid"></div>
        </div>
      `;
      
      // Find controls and add them to cabinet
      const controls = container.querySelector('.cm-controls');
      if (controls) {
        cabinet.appendChild(controls);
      }
      
      container.appendChild(cabinet);
    }
  }

  setupJoystickCursor() {
    const container = document.querySelector('.claw-machine-container');
    if (!container) return;

    // Enhanced cursor system integration
    container.addEventListener('mouseenter', () => {
      if (typeof window.setGameCursor === 'function') window.setGameCursor('alternate');
    });

    container.addEventListener('mouseleave', () => {
      if (typeof window.setGameCursor === 'function') window.setGameCursor(null);
    });

    // Enhanced cursor on interactive elements
    const interactiveElements = container.querySelectorAll('button, .cm-claw, .Wish-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        container.classList.add('cm-joystick-active');
      });
      el.addEventListener('mouseleave', () => {
        container.classList.remove('cm-joystick-active');
      });
    });

    // Claw cursor during animations
    const clawElement = container.querySelector('.cm-claw');
    if (clawElement) {
      clawElement.addEventListener('mouseenter', () => {
        if (!this.isAnimating) {
          container.classList.add('cm-claw-active');
        }
      });
      clawElement.addEventListener('mouseleave', () => {
        container.classList.remove('cm-claw-active');
      });
    }
  }

  setupClearPreviousResults() {
    // Clear previous results when new ticket is inserted
    const pullButtons = document.querySelectorAll('#WishPull1, #WishPull10, #WishDaily');
    pullButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.clearPreviousResults();
      });
    });
  }

  clearPreviousResults() {
    const resultsContainer = document.getElementById('WishResults');
    const resultsGrid = resultsContainer?.querySelector('.cm-results-grid');
    
    if (resultsContainer && resultsGrid) {
      // Smooth fade out animation
      resultsContainer.style.transition = 'opacity 0.5s ease';
      resultsContainer.style.opacity = '0';
      
      setTimeout(() => {
        resultsGrid.innerHTML = '';
        resultsContainer.hidden = true;
        resultsContainer.style.opacity = '1';
        resultsContainer.style.transition = '';
      }, 500);
    }
    
    // Clear any floating text effects
    document.querySelectorAll('.cm-floating-text').forEach(el => el.remove());
    
    // Clear any grabbed mikus
    document.querySelectorAll('.cm-grabbed-miku').forEach(el => el.remove());
  }

  startBackgroundMikus() {
    const background = document.getElementById('mikuBackground');
    if (!background || !this.mikuPool.length) return;

    // Create 5 rows of scrolling Mikus
    for (let row = 0; row < 5; row++) {
      const mikuRow = document.createElement('div');
      mikuRow.className = 'cm-miku-row';
      
      // Add random Mikus to each row (more for better coverage)
      for (let i = 0; i < 25; i++) {
        const mikuSprite = document.createElement('img');
        mikuSprite.className = 'cm-miku-bg-sprite';
        mikuSprite.src = this.mikuPool[Math.floor(Math.random() * this.mikuPool.length)];
        mikuSprite.alt = 'Background Miku';
        mikuRow.appendChild(mikuSprite);
      }
      
      background.appendChild(mikuRow);
    }

    // Refresh background periodically
    setInterval(() => {
      this.refreshBackgroundMikus();
    }, 25000);
  }

  refreshBackgroundMikus() {
    const sprites = document.querySelectorAll('.cm-miku-bg-sprite');
    sprites.forEach(sprite => {
      if (Math.random() < 0.2) { // 20% chance to change
        sprite.src = this.mikuPool[Math.floor(Math.random() * this.mikuPool.length)];
      }
    });
  }

  showFloatingText(text, type = 'default') {
    const container = document.querySelector('.claw-machine-container');
    if (!container) return;

    const floatingText = document.createElement('div');
    floatingText.className = `cm-floating-text ${type}`;
    floatingText.textContent = text;
    floatingText.style.top = `${Math.random() * 40 + 20}%`;
    floatingText.style.left = `${Math.random() * 60 + 20}%`;
    
    container.appendChild(floatingText);
    
    // Remove after animation completes
    setTimeout(() => floatingText.remove(), 3000);
  }

  async triggerUltimatePhysicsAnimation(pullType, cards, options = {}) {
    if (this.isAnimating) return false;
    this.isAnimating = true;
    this.currentResults = cards;

    try {
      console.log('🎯 Starting ultimate physics animation sequence...');
      
      // Phase 1: CENTER -> LEFT RIGHT RANDOM CRAZY (3s)
      await this.animateCenterToCrazy();
      
      // Phase 2: SLOW DESCENT with cable stretch (4s)
      await this.animateSlowDescentWithStretch();
      
      // Phase 3: GRAB MIKU PLUSHIE (1s)
      await this.animateAdvancedGrab();
      
      // Phase 4: SLOW ASCENT with cable contract (4s)
      await this.animateSlowAscentWithContract();
      
      // Phase 5: SLOW RIGHT (3s)
      await this.animateSlowRight();
      
      // Phase 6: EXTREME DROP MIKU (2s)
      await this.animateExtremeMikuDrop();
      
      // Phase 7: Show results with enhanced effects (unless external UI will handle it)
      if (!options.skipShow) {
        await this.showEnhancedResults(cards, pullType);
      }
      
      return true;
    } catch (error) {
      console.error('Ultimate animation failed:', error);
      return false;
    } finally {
      this.isAnimating = false;
    }
  }

  async animateCenterToCrazy() {
    const claw = document.getElementById('clawElement');
    if (!claw) return;

    console.log('🎪 Phase 1: Center to crazy movement');
    this.showFloatingText('SELECTING...', 'default');
    this.sounds.clawMove?.();
    
    claw.style.setProperty('--crazy-duration', `${this.animationSequence.centerCrazy}ms`);
    claw.classList.add('cm-physics-center-crazy');
    
    return new Promise(resolve => {
      setTimeout(() => {
        claw.classList.remove('cm-physics-center-crazy');
        this.showFloatingText('TARGET ACQUIRED!', 'get');
        resolve();
      }, this.animationSequence.centerCrazy);
    });
  }

  async animateSlowDescentWithStretch() {
    const claw = document.getElementById('clawElement');
    const cable = document.getElementById('clawCable');
    if (!claw || !cable) return;

    console.log('⬇️ Phase 2: Slow descent with cable stretch');
    this.showFloatingText('DESCENDING...', 'default');
    this.sounds.clawDrop?.();
    
    const descentDistance = 250;
    const cableStretchHeight = 300;
    
    claw.style.setProperty('--descent-duration', `${this.animationSequence.slowDescent}ms`);
    claw.style.setProperty('--descent-distance', `${descentDistance}px`);
    cable.style.setProperty('--stretch-duration', `${this.animationSequence.slowDescent}ms`);
    cable.style.setProperty('--cable-stretch-height', `${cableStretchHeight}px`);
    
    claw.classList.add('cm-physics-slow-descent');
    cable.classList.add('cm-cable-stretch');
    
    return new Promise(resolve => {
      setTimeout(() => {
        claw.classList.remove('cm-physics-slow-descent');
        cable.classList.remove('cm-cable-stretch');
        resolve();
      }, this.animationSequence.slowDescent);
    });
  }

  async animateAdvancedGrab() {
    const claw = document.getElementById('clawElement');
    if (!claw) return;

    console.log('🤏 Phase 3: Advanced grab with Miku attachment');
    this.showFloatingText('GRAB!', 'lucky');
    this.sounds.clawGrab?.();
    
    claw.classList.add('grabbing');
    
    // Show the picked Miku attached to claw (ensure it's the same as wish result)
    if (this.currentResults.length > 0) {
      const pickedMiku = document.createElement('img');
      pickedMiku.className = 'cm-grabbed-miku';
      pickedMiku.src = this.currentResults[0].url; // First result is the picked one
      pickedMiku.style.cssText = `
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
        width: 45px;
        height: 45px;
        object-fit: contain;
        image-rendering: pixelated;
        z-index: 70;
        opacity: 0.95;
        animation: miku-grabbed-enhanced 0.8s ease-out;
        box-shadow: 0 0 15px var(--miku-pink);
      `;
      claw.appendChild(pickedMiku);
    }
    
    return new Promise(resolve => setTimeout(resolve, this.animationSequence.grab));
  }

  async animateSlowAscentWithContract() {
    const claw = document.getElementById('clawElement');
    const cable = document.getElementById('clawCable');
    if (!claw || !cable) return;

    console.log('⬆️ Phase 4: Slow ascent with cable contract');
    this.showFloatingText('LIFTING...', 'default');
    this.sounds.clawMove?.();
    
    const descentDistance = 250;
    const cableStretchHeight = 300;
    
    claw.style.setProperty('--ascent-duration', `${this.animationSequence.slowAscent}ms`);
    claw.style.setProperty('--descent-distance', `${descentDistance}px`);
    cable.style.setProperty('--contract-duration', `${this.animationSequence.slowAscent}ms`);
    cable.style.setProperty('--cable-stretch-height', `${cableStretchHeight}px`);
    
    claw.classList.add('cm-physics-slow-ascent');
    cable.classList.add('cm-cable-contract');
    
    return new Promise(resolve => {
      setTimeout(() => {
        claw.classList.remove('cm-physics-slow-ascent');
        cable.classList.remove('cm-cable-contract');
        resolve();
      }, this.animationSequence.slowAscent);
    });
  }

  async animateSlowRight() {
    const claw = document.getElementById('clawElement');
    if (!claw) return;

    console.log('➡️ Phase 5: Slow move right');
    this.showFloatingText('TRANSPORTING...', 'default');
    this.sounds.clawMove?.();
    
    claw.style.setProperty('--move-duration', `${this.animationSequence.slowRight}ms`);
    claw.classList.add('cm-physics-slow-right');
    
    return new Promise(resolve => {
      setTimeout(() => {
        claw.classList.remove('cm-physics-slow-right');
        resolve();
      }, this.animationSequence.slowRight);
    });
  }

  async animateExtremeMikuDrop() {
    const grabbedMiku = document.querySelector('.cm-grabbed-miku');
    const claw = document.getElementById('clawElement');
    if (!grabbedMiku || !claw) return;

    console.log('💫 Phase 6: Extreme Miku drop');
    this.showFloatingText('GET!', 'amazing');
    this.sounds.mikuDrop?.();
    
    // Release claw arms
    claw.classList.remove('grabbing');
    
    grabbedMiku.style.setProperty('--extreme-drop-duration', `${this.animationSequence.extremeDrop}ms`);
    grabbedMiku.classList.add('cm-physics-extreme-miku-drop');
    
    return new Promise(resolve => {
      setTimeout(() => {
        grabbedMiku.remove();
        this.showFloatingText('LUCKY!', 'lucky');
        resolve();
      }, this.animationSequence.extremeDrop);
    });
  }

  async showEnhancedResults(cards, pullType) {
    const resultsContainer = document.getElementById('WishResults');
    const resultsGrid = resultsContainer?.querySelector('.cm-results-grid');
    if (!resultsContainer || !resultsGrid) return;

    console.log('✨ Phase 7: Enhanced results display');

    // Set pull type for styling on both container and grid
    resultsContainer.setAttribute('data-pull-type', pullType);
    resultsGrid.setAttribute('data-pull-type', pullType);
    
    // Also set on the main claw machine container for CSS specificity
    const clawMachine = document.querySelector('.ClawMachine, .claw-machine-container');
    if (clawMachine) {
      clawMachine.setAttribute('data-pull-type', pullType);
    }
    
    // Generate enhanced card HTML
    const cardHTMLs = cards.map((card, index) => {
      const isNew = this.addToCollection(card);
      const isPicked = index === 0; // First card is the picked one
      const newBadge = isNew ? '<div class="Wish-new">NEW!</div>' : '';
      const pickedClass = isPicked ? 'cm-picked-miku' : '';
      
      return `
        <div class="Wish-card revealing rarity-${card.rarity} ${pickedClass}">
          <div class="Wish-stars">${'★'.repeat(card.rarity)}</div>
          ${newBadge}
          <img src="${card.url}" alt="Miku card" class="reveal-image"/>
        </div>
      `;
    });

    resultsGrid.innerHTML = cardHTMLs.join('');
    resultsContainer.hidden = false;
    
    // Enhanced reveal effects
    this.sounds.cardReveal?.();
    
    const maxRarity = Math.max(...cards.map(c => c.rarity));
    if (maxRarity >= 5) {
      this.sounds.legendary?.();
      this.triggerLegendaryEffects();
      this.showFloatingText('LEGENDARY!', 'amazing');
    }

    // Animate cards in sequence with enhanced timing
    const cardElements = resultsGrid.querySelectorAll('.Wish-card');
    cardElements.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateZ(10px)';
        
        // Special effect for picked card
        if (card.classList.contains('cm-picked-miku')) {
          setTimeout(() => {
            this.showFloatingText('PICKED!', 'get');
          }, 300);
        }
      }, index * 150);
    });

    // Return claw to center after showing results
    setTimeout(() => {
      this.returnClawToCenter();
    }, 1000);
  }

  async returnClawToCenter() {
    const claw = document.getElementById('clawElement');
    if (!claw) return;

    console.log('🏠 Returning claw to center position');
    
    claw.style.transform = '';
    claw.style.transition = 'transform 2s ease-in-out';
    
    setTimeout(() => {
      claw.style.transition = '';
    }, 2000);
  }

  triggerLegendaryEffects() {
    // Create enhanced particle effects
    const container = document.querySelector('.claw-machine-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        width: 8px;
        height: 8px;
        background: var(--hologram);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1001;
        animation: particle-burst-enhanced 3s ease-out forwards;
      `;
      container.appendChild(particle);
      
      setTimeout(() => particle.remove(), 3000);
    }
  }

  addToCollection(card) {
    // Integration with existing collection system
    if (window.Wish && typeof window.Wish.addToCollection === 'function') {
      return window.Wish.addToCollection(card);
    }
    
    // Fallback collection logic
    const collection = JSON.parse(localStorage.getItem('Wish.collection') || '{}');
    const isNew = !collection[card.url];
    
    if (!collection[card.url]) {
      collection[card.url] = { count: 0 };
    }
    collection[card.url].count += 1;
    
    localStorage.setItem('Wish.collection', JSON.stringify(collection));
    return isNew;
  }

  wireEvents() {
    // Integration with existing wish system
    const pull1Button = document.getElementById('WishPull1');
    const pull10Button = document.getElementById('WishPull10');
    const dailyButton = document.getElementById('WishDaily');
    
    if (pull1Button) {
      pull1Button.addEventListener('click', () => this.handlePull(1));
    }
    
    if (pull10Button) {
      pull10Button.addEventListener('click', () => this.handlePull(10));
    }

    if (dailyButton) {
      dailyButton.addEventListener('click', () => this.handleDaily());
    }
  }

  async handlePull(count) {
    if (this.isAnimating) return;
    
    // Check tokens
    const tokens = parseInt(localStorage.getItem('Wish.tokens') || '3');
    if (tokens < count) {
      this.sounds.clawMove?.(); // Error sound
      this.showFloatingText('NOT ENOUGH TOKENS!', 'default');
      return;
    }
    
    // Spend tokens
    localStorage.setItem('Wish.tokens', String(tokens - count));
    this.updateTokenDisplay();
    
    // Generate cards
    const cards = this.generateCards(count);
    
    // Trigger ultimate animation
    const pullType = count > 1 ? 'multi' : 'single';
    await this.triggerUltimatePhysicsAnimation(pullType, cards);
  }

  handleDaily() {
    const lastDaily = parseInt(localStorage.getItem('Wish.lastDaily') || '0');
    const now = Date.now();
    const timeDiff = now - lastDaily;
    const dailyCooldown = 1000 * 60 * 60 * 20; // 20 hours

    if (timeDiff > dailyCooldown) {
      localStorage.setItem('Wish.lastDaily', String(now));
      const currentTokens = parseInt(localStorage.getItem('Wish.tokens') || '3');
      localStorage.setItem('Wish.tokens', String(currentTokens + 1));
      this.updateTokenDisplay();
      this.showFloatingText('DAILY BONUS!', 'lucky');
      this.sounds.cardReveal?.();
    } else {
      this.showFloatingText('COME BACK LATER!', 'default');
      this.sounds.clawMove?.();
    }
  }

  generateCards(count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      const url = this.mikuPool[Math.floor(Math.random() * this.mikuPool.length)];
      const rarity = this.calculateRarity(url);
      cards.push({ url, rarity });
    }
    return cards;
  }

  calculateRarity(url) {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = (hash << 5) - hash + url.charCodeAt(i);
      hash |= 0;
    }
    const r = (hash >>> 0) % 100;
    if (r < 12) return 1;
    if (r < 30) return 2;
    if (r < 60) return 3;
    if (r < 85) return 4;
    return 5;
  }

  updateTokenDisplay() {
    const tokenDisplay = document.getElementById('WishTokens');
    if (tokenDisplay) {
      tokenDisplay.textContent = localStorage.getItem('Wish.tokens') || '3';
    }
  }
}

// Add enhanced CSS animations
const enhancedStyles = `
@keyframes miku-grabbed-enhanced {
  0% { 
    transform: translateX(-50%) scale(0) rotateZ(-45deg); 
    opacity: 0; 
  }
  50% {
    transform: translateX(-50%) scale(1.2) rotateZ(0deg);
    opacity: 0.8;
  }
  100% { 
    transform: translateX(-50%) scale(1) rotateZ(0deg); 
    opacity: 0.95; 
  }
}

@keyframes particle-burst-enhanced {
  0% { 
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  30% {
    transform: scale(2) rotate(120deg);
    opacity: 0.9;
  }
  60% {
    transform: scale(1.5) rotate(240deg);
    opacity: 0.6;
  }
  100% { 
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
}
`;

// Inject enhanced styles
const enhancedStyleSheet = document.createElement('style');
enhancedStyleSheet.textContent = enhancedStyles;
document.head.appendChild(enhancedStyleSheet);

// Initialize the ultimate system
let ultimateGacha;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ultimateGacha = new UltimateMikuGacha();
  });
} else {
  ultimateGacha = new UltimateMikuGacha();
}

// Global access
window.UltimateMikuGacha = UltimateMikuGacha;
window.ultimateGacha = ultimateGacha;
