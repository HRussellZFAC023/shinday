// 🎮 Premium Miku Gacha Experience - Physics Engine & Sound Design
class MikuClawMachine {
  constructor() {
    this.isAnimating = false;
    this.currentPhase = 0;
    this.animationSettings = {
      clawMoveSpeed: 800,
      clawDropSpeed: 1200,
      mikuGrabDuration: 600,
      mikuDropDuration: 1400,
      cardRevealDelay: 200
    };
    
    // Sound system (load .ogg from GitHub raw to bypass host restrictions)
    this.sounds = {
      clawMove: new Audio('https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/assets/SFX/claw-move.ogg'),
      clawDrop: new Audio('https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/assets/SFX/claw-drop.ogg'),
      mikuGrab: new Audio('https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/assets/SFX/miku-grab.ogg'),
      cardReveal: new Audio('https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/assets/SFX/card-reveal.ogg'),
      rareCard: new Audio('https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/assets/SFX/rare-card.ogg'),
      legendaryCard: new Audio('https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/assets/SFX/legendary-card.ogg'),
      success: new Audio('https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/assets/SFX/success.ogg'),
      ambience: new Audio('https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/assets/SFX/arcade-ambience.ogg')
    };
    
    this.setupSounds();
    this.ensureElements();
    this.startAmbience();

    // Prepare capsule pods once the DOM is ready
    try { this.ensurePods(); } catch {}
  }

  setupSounds() {
    // Configure all sounds with fallbacks
    Object.keys(this.sounds).forEach(key => {
      const sound = this.sounds[key];
      sound.volume = 0.3;
      sound.preload = 'auto';
      
      // Fallback if audio file doesn't exist
      sound.addEventListener('error', () => {
        console.log(`Audio file not found: ${key}, using silent mode`);
        this.sounds[key] = { 
          play: () => {}, 
          pause: () => {}, 
          volume: 0 
        };
      });
    });
    
    this.sounds.ambience.volume = 0.1;
    this.sounds.ambience.loop = true;
  }

  startAmbience() {
    if (this.sounds.ambience) {
      this.sounds.ambience.play().catch(() => {
        console.log('Ambience audio requires user interaction');
      });
    }
  }

  ensureElements() {
    this.ensureStageElements();
    this.ensureClawSystem();
    this.ensureLCD();
    this.ensurePreviewSystem();
  }

  ensureStageElements() {
    if (!document.querySelector('.cm-window')) {
      const wishArea = document.querySelector('.Wish-area') || document.body;
      const window = document.createElement('div');
      window.className = 'cm-window';
      wishArea.appendChild(window);
    }

    if (!document.querySelector('.cm-results-panel')) {
      const window = document.querySelector('.cm-window');
      const resultsPanel = document.createElement('div');
      resultsPanel.className = 'cm-results-panel';
      resultsPanel.style.display = 'none';
      
      const container = document.createElement('div');
      container.className = 'cm-results-container';
      resultsPanel.appendChild(container);
      
      window.appendChild(resultsPanel);
    }
  }

  ensureClawSystem() {
    if (!document.querySelector('.cm-claw')) {
      const window = document.querySelector('.cm-window');
      
      // Create claw rail
      const rail = document.createElement('div');
      rail.className = 'cm-claw-rail';
      window.appendChild(rail);
      
      // Create complete claw assembly
      const claw = document.createElement('div');
      claw.className = 'cm-claw';
      
      const cable = document.createElement('div');
      cable.className = 'cm-claw-cable';
      
      const head = document.createElement('div');
      head.className = 'cm-claw-head';
      
      const leftArm = document.createElement('div');
      leftArm.className = 'cm-claw-arm cm-claw-left';
      
      const rightArm = document.createElement('div');
      rightArm.className = 'cm-claw-arm cm-claw-right';
      
      const center = document.createElement('div');
      center.className = 'cm-claw-center';
      
      head.appendChild(leftArm);
      head.appendChild(rightArm);
      head.appendChild(center);
      
      claw.appendChild(cable);
      claw.appendChild(head);
      
      window.appendChild(claw);
    }
  }

  ensureLCD() {
    if (!document.querySelector('.cm-lcd-marquee')) {
      const statusBar = document.querySelector('.cm-status-bar');
      if (statusBar) {
        const marquee = document.createElement('div');
        marquee.className = 'cm-lcd-marquee';
        
        const screen = document.createElement('div');
        screen.className = 'cm-lcd-screen';
        
        const track = document.createElement('div');
        track.className = 'cm-lcd-track';
        
        const text = document.createElement('div');
        text.className = 'cm-lcd-text';
        text.textContent = '✨ Welcome to Premium Miku Gacha Experience ✨ • Pull for rare cards • Collect them all • ';
        
        track.appendChild(text);
        screen.appendChild(track);
        marquee.appendChild(screen);
        
        statusBar.parentNode.insertBefore(marquee, statusBar);
      }
    }
  }

  ensurePreviewSystem() {
    if (!document.querySelector('.cm-preview-rotation')) {
      const window = document.querySelector('.cm-window');
      const preview = document.createElement('div');
      preview.className = 'cm-preview-rotation';
      
      const subtle = document.createElement('div');
      subtle.className = 'cm-preview-subtle';
      
      const glow = document.createElement('div');
      glow.className = 'preview-glow';
      
      const image = document.createElement('img');
      image.className = 'preview-image';
      image.src = 'assets/pixel-miku/001 - Hatsune Miku (Original).png';
      image.alt = 'Preview';
      
      subtle.appendChild(glow);
      subtle.appendChild(image);
      preview.appendChild(subtle);
      window.appendChild(preview);
    }
  }

  floatText(text, type = 'get') {
    const container = document.getElementById('ArcadeTags');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `wish-tag ${type}`;
    el.textContent = text;
    el.style.left = (20 + Math.random() * 60) + '%';
    el.style.top = (35 + Math.random() * 30) + '%';
    container.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }

  // Create colorful circular pods using the global pastel gradient
  ensurePods() {
    const podHost = document.getElementById('pixelCapsules') || document.querySelector('.cm-pixel-capsules');
    if (!podHost) return;
    // Avoid duplicating
    if (podHost.__podsMade) return; 
    podHost.__podsMade = true;
    const pool = (window.MIKU_IMAGES || []);
    const count = Math.max(24, Math.min(60, pool.length || 36));
    for (let i = 0; i < count; i++) {
      const pod = document.createElement('div');
      pod.className = 'cm-pod';
      pod.style.left = Math.random() * 96 + '%';
      pod.style.top = '-20px';
      // Assign a random Miku into the pod
      const url = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
      if (url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'capsule miku';
        pod.dataset.url = url;
        pod.appendChild(img);
      }
      podHost.appendChild(pod);
      // simple gravity to bottom of host
      this.dropPodWithGravity(podHost, pod);
    }
  }

  dropPodWithGravity(host, pod) {
    const hostRect = host.getBoundingClientRect();
    let y = -20;
    let v = 0;
    const g = 1800; // px/s^2
    const size = pod.offsetHeight || 28;
    const floor = hostRect.height - size - 2;
    // tiny lateral drift
    const drift = (Math.random() * 2 - 1) * 8; // total px drift
    let xOffset = 0;
    let last = performance.now();
    let bounces = 0;
    const step = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      v += g * dt;
      y += v * dt;
      if (y >= floor) {
        y = floor;
        if (bounces < 1 && Math.abs(v) > 300) {
          v = -v * 0.25; // gentle bounce
          bounces++;
        } else {
          v = 0; // settle
        }
      }
      xOffset += (drift / 60) * (dt * 60);
      pod.style.transform = `translateX(${xOffset}px)`;
      pod.style.top = y + 'px';
      if (v !== 0 || y < floor) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  findPodFor(url) {
    if (!url) return null;
    const pods = document.querySelectorAll('.cm-pod');
    for (const p of pods) {
      if (p.dataset && p.dataset.url === url) return p;
    }
    return null;
  }

  updateLCDMessage(message) {
    const lcdText = document.querySelector('.cm-lcd-text');
    if (lcdText) {
      lcdText.textContent = message;
    }
  }

  updatePreviewImage(imageSrc) {
    const previewImage = document.querySelector('.preview-image');
    if (previewImage && imageSrc) {
      previewImage.src = imageSrc;
    }
  }

  // Helpers for precise posing with cable length kept attached
  getRailRect() {
    const rail = document.querySelector('.cm-claw-rail');
    return rail ? rail.getBoundingClientRect() : null;
  }

  // xPx is coordinate along rail from its left edge
  poseClaw(xPx, yPx) {
    const claw = document.querySelector('.cm-claw');
    const cable = document.querySelector('.cm-claw-cable');
    const railRect = this.getRailRect();
    if (!claw || !railRect) return;
    // Clamp and convert to center-delta for left:50% translate(-50%) base
    const width = railRect.width;
    const clampedX = Math.max(0, Math.min(width, xPx));
    const delta = clampedX - width / 2; // pixels from center
    claw.style.transform = `translate(-50%, ${yPx}px) translateX(${delta}px)`;
    if (cable) {
      const base = 60;
      const newHeight = Math.max(base, yPx + base);
      cable.style.height = `${newHeight}px`;
    }
  }

  centerX() {
    const r = this.getRailRect();
    if (!r) return 0;
    return r.width / 2; // normalized center of rail
  }

  // 🎯 Premium Physics-Based Animation System (revised fast + crazy route)
  async triggerClawAnimation(pullType = 'single') {
    if (this.isAnimating) return false;
    
    this.isAnimating = true;
    this.currentPhase = 0;
    
    try {
      this.updateLCDMessage('🎯 INITIATING MIKU CAPTURE SEQUENCE... ');
      
      await this.animateTicketInsertBasic();
      await this.phase1_PrepareForCapture();
      await this.phase2a_Center();
      await this.phase2b_CrazySweep();
      await this.phase2c_BackToCenter();
      await this.phase3_SlowDescentStretch();
      await this.phase4_GrabAttach();
      await this.phase5_SlowAscent();
      await this.phase6_SlowRight();
      await this.phase7_DropMiku();
      await this.phase8_RevealCards(pullType);
      
      this.updateLCDMessage('✨ MIKU CAPTURE COMPLETE - LEGENDARY CARDS OBTAINED! ✨ ');
      return true;
      
    } catch (error) {
      console.error('Animation sequence failed:', error);
      this.resetAnimation();
      return false;
    } finally {
      this.isAnimating = false;
    }
  }

  async animateTicketInsertBasic() {
    const ticketWrap = document.getElementById('ticketAnimation');
    if (!ticketWrap) return;
    const ticket = ticketWrap.querySelector('.cm-ticket-flying');
    if (!ticket) return;
    try { SFX.play('Wish.roll'); } catch {}
    ticket.classList.add('inserting');
    await this.wait(420);
    ticket.classList.remove('inserting');
    try { SFX.play('extra.coin'); } catch {}
  }

  async phase1_PrepareForCapture() {
    this.currentPhase = 1;
    this.sounds.clawMove.play();
    
    const claw = document.querySelector('.cm-claw');
    const cable = document.querySelector('.cm-claw-cable');
    const lever = document.querySelector('.cm-lever');
    
    // Add visual feedback
    if (lever) lever.classList.add('pulling');
    
    // Reset claw position and prepare
    if (claw) {
      claw.style.transform = 'translateX(-50%) translateY(0px)';
      claw.classList.remove('close');
    }
    
    if (cable) {
      cable.style.height = '60px';
    }
    
    await this.wait(400);
    if (lever) lever.classList.remove('pulling');
  }

  async phase2a_Center() {
    this.currentPhase = 2;
    this.updateLCDMessage('🎯 CENTERING CLAW...');
    const claw = document.querySelector('.cm-claw');
    const x = this.centerX();
    if (claw) {
      claw.style.transition = 'transform 280ms ease-out';
      this.poseClaw(x, 0);
    }
    try { SFX.play('ui.move'); } catch {}
    await this.wait(280);
  }

  async phase2b_CrazySweep() {
    this.currentPhase = 2.1;
    this.updateLCDMessage('💫 LEFT • RIGHT • TARGETING...');
    const moves = 12; // fast and crazy
    const rail = this.getRailRect();
    if (!rail) return;
    let remaining = moves;
    const width = rail.width;
    await new Promise((resolve) => {
      const hop = () => {
        if (remaining-- <= 0) return resolve();
        const rx = Math.random() * width;
        const ry = Math.random() * 24 - 6;
        const claw = document.querySelector('.cm-claw');
        if (!claw) return resolve();
        claw.style.transition = 'transform 120ms cubic-bezier(0.2, 0.8, 0.2, 1)';
        this.poseClaw(rx, ry);
        try { SFX.play('ui.teleport'); } catch {}
        setTimeout(hop, 95);
      };
      hop();
    });
  }

  async phase2c_BackToCenter() {
    this.currentPhase = 2.2;
    const x = this.centerX();
    const claw = document.querySelector('.cm-claw');
    if (claw) {
      claw.style.transition = 'transform 220ms ease-out';
      this.poseClaw(x, 0);
    }
    await this.wait(220);
  }

  async phase3_SlowDescentStretch() {
    this.currentPhase = 3;
    this.updateLCDMessage('⬇️ SLOW DESCENT...');
    try { SFX.play('ui.se_sy_24'); } catch {}
    const claw = document.querySelector('.cm-claw');
    const cable = document.querySelector('.cm-claw-cable');
    const drop = 150;
    // If a pod exists for the selected Miku, align to it before descending
    let targetX = this.centerX();
    try {
      if (window.currentPickedMiku) {
        let pod = this.findPodFor(window.currentPickedMiku);
        const rail = this.getRailRect();
        if (!pod) {
          // Create a pod for the chosen Miku near the center so we always have a target
          const host = document.getElementById('pixelCapsules') || document.querySelector('.cm-pixel-capsules');
          const newPod = document.createElement('div');
          newPod.className = 'cm-pod';
          newPod.dataset.url = window.currentPickedMiku;
          const img = document.createElement('img');
          img.src = window.currentPickedMiku;
          newPod.appendChild(img);
          newPod.style.position = 'absolute';
          newPod.style.left = '48%';
          newPod.style.top = '70%';
          if (host) host.appendChild(newPod);
          pod = newPod;
        }
        if (pod && rail) {
          const podRect = pod.getBoundingClientRect();
          targetX = podRect.left + podRect.width / 2 - rail.left;
        }
      }
    } catch {}
    if (claw) {
      claw.style.transition = 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)';
      this.poseClaw(targetX, drop);
    }
    if (cable) {
      cable.style.transition = 'height 600ms cubic-bezier(0.25,0.46,0.45,0.94)';
    }
    await this.wait(620);
  }

  async phase4_GrabAttach() {
    this.currentPhase = 4;
    const claw = document.querySelector('.cm-claw');
    if (claw) {
      claw.classList.add('close');
      try { SFX.play('extra.fx2'); } catch {}
    }
    // Attach a visible grabbed Miku under the head using the chosen sprite
    const chosen = this.createMikuRender();
    if (chosen && claw) {
      chosen.style.position = 'absolute';
      chosen.style.top = '150px';
      chosen.style.left = '50%';
      chosen.style.transform = 'translateX(-50%) scale(1)';
      chosen.classList.add('grabbed');
      claw.appendChild(chosen);
      // Make the central orb less obvious and short-lived
      setTimeout(() => { try { chosen.remove(); } catch {} }, 300);
    }
    this.floatText('GRAB!', 'get');
    await this.wait(220);
  }

  async phase5_SlowAscent() {
    this.currentPhase = 5;
    const claw = document.querySelector('.cm-claw');
    const cable = document.querySelector('.cm-claw-cable');
    if (claw) {
      claw.style.transition = 'transform 650ms cubic-bezier(0.25,0.46,0.45,0.94)';
      this.poseClaw(this.centerX(), 20);
    }
    if (cable) {
      cable.style.transition = 'height 650ms cubic-bezier(0.25,0.46,0.45,0.94)';
    }
    try { SFX.play('ui.move'); } catch {}
    await this.wait(680);
  }

  async phase6_SlowRight() {
    this.currentPhase = 6;
    const claw = document.querySelector('.cm-claw');
    const rail = this.getRailRect();
    if (!claw || !rail) return;
    const x = rail.width * 0.78; // move toward right side
    claw.style.transition = 'transform 520ms ease-in-out';
    this.poseClaw(x, 20);
    try { SFX.play('ui.move'); } catch {}
    await this.wait(540);
  }

  async phase7_DropMiku() {
    this.currentPhase = 7;
    const claw = document.querySelector('.cm-claw');
    const grabbed = document.querySelector('.cm-miku-render');
    if (claw) claw.classList.remove('close');
    if (grabbed) {
      // Simulate dropping the capsule into the prize chute
      const win = document.querySelector('.cm-window');
      const chute = document.querySelector('.cm-prize-chute');
      const clawRect = grabbed.getBoundingClientRect();
      const winRect = win ? win.getBoundingClientRect() : null;
      const chuteRect = chute ? chute.getBoundingClientRect() : null;
      const pod = document.createElement('div');
      pod.className = 'cm-pod';
      pod.style.position = 'absolute';
      pod.style.zIndex = '160';
      pod.style.width = '22px';
      pod.style.height = '22px';
      const img = document.createElement('img');
      try { img.src = window.currentPickedMiku || ''; } catch {}
      pod.appendChild(img);
      if (win && winRect) {
        const startX = clawRect.left + clawRect.width / 2 - winRect.left - 11;
        const startY = clawRect.top + clawRect.height / 2 - winRect.top - 11;
        pod.style.left = `${startX}px`;
        pod.style.top = `${startY}px`;
        win.appendChild(pod);
        const endX = chuteRect ? (chuteRect.left + chuteRect.width/2 - winRect.left - 11) : startX;
        const endY = chuteRect ? (chuteRect.top + chuteRect.height/2 - winRect.top - 11) : startY + 140;
        pod.style.transition = 'transform 600ms cubic-bezier(.2,.8,.2,1)';
        // force reflow
        void pod.offsetWidth;
        pod.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
        try { SFX.play('extra.fx1'); } catch {}
        setTimeout(() => pod.remove(), 650);
      }
      grabbed.remove();
    }
    this.floatText('LUCKY!', 'bonus');
    // Slight return toward center
    const x = this.centerX();
    if (claw) {
      claw.style.transition = 'transform 300ms ease-out';
      this.poseClaw(x, 0);
    }
    await this.wait(320);
  }

  async phase8_RevealCards(pullType) {
    this.currentPhase = 8;
    this.updateLCDMessage('✨ CONVERTING MIKU ESSENCE TO PREMIUM CARDS... ');
    try { SFX.play('Wish.reveal'); } catch {}
    
    // Show results panel with dramatic entrance
    const resultsPanel = document.querySelector('.cm-results-panel');
    const container = document.querySelector('.cm-results-container');
    
    if (resultsPanel && container) {
      resultsPanel.style.display = 'block';
      container.setAttribute('data-pull-type', pullType === 'multi' ? 'multi' : 'single');
      
      // Get cards from wish system
      const cards = this.getCardsFromWishSystem();
      
      if (cards && cards.length > 0) {
        await this.animateCardReveal(cards, pullType);
      }
    }
    
    try { SFX.play('extra.thanks'); } catch {}
    await this.wait(500);
  }

  createMikuRender() {
    const existing = document.querySelector('.cm-miku-render');
    if (existing) existing.remove();
    
    const mikuRender = document.createElement('div');
    mikuRender.className = 'cm-miku-render';
    
    // Prefer the currently picked Miku (from Wish results), fallback to random
    let sprite = null;
    try {
      if (window.currentPickedMiku) sprite = window.currentPickedMiku;
    } catch {}
    if (!sprite) {
      const mikuSprites = [
        'assets/pixel-miku/001 - Hatsune Miku (Original).png',
        'assets/pixel-miku/002 - Hatsune Miku V2 (Classic).png',
        'assets/pixel-miku/003 - Hatsune Miku Append.png',
        'assets/pixel-miku/004 - Sakura Miku (Cherries).png',
        'assets/pixel-miku/005 - Sakura Miku (Blossom Ponytails).png'
      ];
      sprite = mikuSprites[Math.floor(Math.random() * mikuSprites.length)];
    }
    mikuRender.style.backgroundImage = `url("${sprite}")`;
    
    return mikuRender;
  }

  getCardsFromWishSystem() {
    // Interface with the existing wish system
    const cardElements = document.querySelectorAll('.Wish-card');
    return Array.from(cardElements);
  }

  async animateCardReveal(cards, pullType) {
    const container = document.querySelector('.cm-results-container');
    let delay = 0;
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      
      setTimeout(() => {
        // Add holographic reveal animation
        card.classList.add('revealing');
        
        // Determine rarity and add appropriate class
        const stars = card.querySelector('.Wish-stars');
        if (stars) {
          const starCount = (stars.textContent.match(/★/g) || []).length;
          card.classList.add(`rarity-${starCount}`);
          
          // Play special sound effects for rare cards
          if (starCount >= 4) {
            this.sounds.rareCard.play();
          }
          if (starCount === 5) {
            this.sounds.legendaryCard.play();
          }
        }
        
        // Add holographic background
        this.addHolographicBackground(card);
        
      }, delay);
      
      delay += this.animationSettings.cardRevealDelay;
    }
    
    // Wait for all animations to complete
    await this.wait(delay + 800);
  }

  addHolographicBackground(card) {
    // Remove existing holographic background
    const existingBg = card.querySelector('.holographic-bg');
    if (existingBg) existingBg.remove();
    
    const holoBg = document.createElement('div');
    holoBg.className = 'holographic-bg';
    holoBg.style.cssText = `
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      background: linear-gradient(45deg, #ff69b4, #39c5c5, #9d4edd, #4dabf7);
      background-size: 400% 400%;
      border-radius: 12px;
      z-index: -1;
      opacity: 0.8;
      animation: holographic-shift 3s ease-in-out infinite;
    `;
    
    card.style.position = 'relative';
    card.appendChild(holoBg);
  }

  resetAnimation() {
    this.isAnimating = false;
    this.currentPhase = 0;
    
    // Reset all visual elements
    const claw = document.querySelector('.cm-claw');
    const cable = document.querySelector('.cm-claw-cable');
    const mikuRender = document.querySelector('.cm-miku-render');
    const lever = document.querySelector('.cm-lever');
    
    if (claw) {
      claw.style.transform = 'translateX(-50%) translateY(0px)';
      claw.classList.remove('close');
    }
    
    if (cable) {
      cable.style.height = '60px';
    }
    
    if (mikuRender) {
      mikuRender.remove();
    }
    
    if (lever) {
      lever.classList.remove('pulling');
    }
    
    this.updateLCDMessage('✨ PREMIUM MIKU GACHA READY - PULL FOR LEGENDARY CARDS! ✨ ');
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize the premium Miku gacha experience
const mikuClaw = new MikuClawMachine();

// Enhanced trigger function with premium animations
window.triggerClawAnimation = async function(pullType = 'single') {
  return await mikuClaw.triggerClawAnimation(pullType);
};

// Auto-update preview image when available
window.addEventListener('load', () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const newImages = Array.from(mutation.addedNodes)
          .filter(node => node.nodeType === 1)
          .map(node => node.querySelector ? node.querySelector('img') : node.tagName === 'IMG' ? node : null)
          .filter(img => img && img.src.includes('pixel-miku'));
        
        if (newImages.length > 0) {
          mikuClaw.updatePreviewImage(newImages[0].src);
        }
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
});

console.log('🎮 Premium Miku Gacha Experience loaded! ✨');
