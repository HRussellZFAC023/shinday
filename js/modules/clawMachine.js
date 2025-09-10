// ✨ Ultimate Miku Claw Machine Arcade System ✨
// Complete animation system with ticket feeding, claw madness, and suspense building

(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(() => {
    const clawMachine = document.querySelector(".ClawMachine");
    if (!clawMachine) return;

    // Ensure a scrolling LCD marquee is mounted for the wish title
    (function ensureLCD() {
      const machine = document.querySelector('.ClawMachine');
      if (!machine || machine.querySelector('.cm-lcd')) return;
      const lcd = document.createElement('div');
      lcd.className = 'cm-lcd';
      // Use localized wish title if available
      const titleEl = document.getElementById('wishTitle');
      const titleText = titleEl && titleEl.textContent ? titleEl.textContent.trim() : 'close your eyes and make a wish~';
      const message = `${titleText} • Project DIVA claw • ${titleText} •`;
      lcd.innerHTML = `<div class="lcd-track"><span class="lcd-text">${message}</span></div>`;
      machine.prepend(lcd);
    })();

    // Load localized content
    loadLocalizedContent();

    // Get all the arcade elements
    const lever = document.getElementById("WishLever");
    const claw = document.getElementById("ClawMechanism");
    const arcadeTags = document.getElementById("ArcadeTags");
  const results = document.getElementById("WishResults");
    const preview = document.getElementById("WishRotation");
    const ticketAnimation = document.getElementById("ticketAnimation");
    const cardStage = document.getElementById("cardStage");
    const mikuRender = document.getElementById("mikuRender");
    const cardReveal = document.getElementById("cardReveal");
    const bottomSprites = document.getElementById("bottomSprites");
    
    // All the buttons
    const pullButtons = [
      document.getElementById("WishPull1"),
      document.getElementById("WishPull10")
    ].filter(Boolean);
    
    const utilityButtons = [
      document.getElementById("WishDaily"),
      document.getElementById("WishConvert")
    ].filter(Boolean);

    let isAnimating = false;

    /**
     * Position the claw along the rail and adjust the cable height to stay attached.
     * xPx is the absolute pixel offset from the left edge of the rail (after padding),
     * yPx is the pixel distance below the rail.  Uses current rail/claw elements.
     */
    function setClawPose(xPx, yPx) {
      const railEl = document.querySelector('.cm-claw-rail');
      if (!railEl || !claw) return;
      const railRect = railEl.getBoundingClientRect();
      // clamp X within rail width minus approximate claw width (48px)
      const width = railRect.width - 48;
      const clampedX = Math.max(24, Math.min(width + 24, xPx));
      claw.style.transform = `translateX(${clampedX}px) translateY(${yPx}px)`;
      // update cable height based on y offset to keep attached
      const cable = claw.querySelector('.cm-claw-cable');
      if (cable) {
        const base = 60;
        const newHeight = Math.max(base, yPx + base);
        cable.style.height = `${newHeight}px`;
      }
    }

    /**
     * Drop the claw to just above the current highlighted sprite in the stage.
     * Calculates the centre of the sprite and positions the claw accordingly.
     */
    function dropToSpriteTop() {
      const railEl = document.querySelector('.cm-claw-rail');
      const renderEl = document.querySelector('.cm-miku-render');
      if (!railEl || !renderEl || !claw) return;
      const railRect = railEl.getBoundingClientRect();
      const spriteRect = renderEl.getBoundingClientRect();
      // centre X relative to rail
      const centerX = (spriteRect.left + spriteRect.width / 2) - railRect.left;
      // y offset from rail bottom to slightly above sprite top
      const y = Math.max(20, (spriteRect.top - railRect.bottom) + 18);
      // ensure arms close for grabbing effect
      claw.classList.add('close');
      claw.style.transition = 'transform 0.22s ease';
      setClawPose(centerX, y);
    }

    // 🎨 Load Content from Localization
    function loadLocalizedContent() {
      if (typeof SITE_CONTENT !== 'undefined' && SITE_CONTENT.ui) {
        const iconEl = document.getElementById("wishIcon");
        const titleEl = document.getElementById("wishTitle");
        const dexEl = document.getElementById("wishOpenDex");
        
        if (iconEl && SITE_CONTENT.images.mikuIcons[SITE_CONTENT.ui.WishIcon]) {
          iconEl.style.backgroundImage = `url(${SITE_CONTENT.images.mikuIcons[SITE_CONTENT.ui.WishIcon]})`;
        }
        
        if (titleEl) {
          titleEl.textContent = SITE_CONTENT.ui.WishTitle || "close your eyes and make a wish~";
        }
        
        if (dexEl) {
          dexEl.textContent = SITE_CONTENT.ui.WishOpenDex || "📱 Open MikuDex";
        }
      }
    }

    // 🎮 Initialize Random Bottom Sprites
    function initializeBottomSprites() {
      if (!bottomSprites) return;
      
      // Add random Miku sprites at the bottom
      const sprites = [
        './assets/pixel-miku/001 - Hatsune Miku (Original).png',
        './assets/pixel-miku/002 - Hatsune Miku V2 (Classic).png',
        './assets/pixel-miku/010 - Hachune Miku.png',
        './assets/pixel-miku/004 - Sakura Miku (Cherries).png',
        './assets/pixel-miku/008 - Deep-Sea Girl Miku.png'
      ];
      
      for (let i = 0; i < 6; i++) {
        const sprite = document.createElement('div');
        sprite.style.position = 'absolute';
        sprite.style.bottom = '0';
        sprite.style.left = (Math.random() * 80) + '%';
        sprite.style.width = '24px';
        sprite.style.height = '24px';
        sprite.style.backgroundImage = `url(${sprites[Math.floor(Math.random() * sprites.length)]})`;
        sprite.style.backgroundSize = 'cover';
        sprite.style.opacity = '0.6';
        sprite.style.transform = `scale(${0.8 + Math.random() * 0.4})`;
        sprite.style.zIndex = '1';
        bottomSprites.appendChild(sprite);
      }
    }

    // 🔄 Refresh Bottom Sprites on each pull to add variety
    function refreshBottomSprites() {
      if (!bottomSprites) return;
      // Clear existing sprites
      while (bottomSprites.firstChild) {
        bottomSprites.removeChild(bottomSprites.firstChild);
      }
      // Reinitialize with random sprites
      initializeBottomSprites();
    }

    // Expose refresh function globally for reuse
    window.refreshBottomSprites = refreshBottomSprites;

    // 🔄 Reset highlight state to avoid leftover Miku renders when navigating away or before a new pull
    function resetHighlight() {
      if (mikuRender) {
        mikuRender.className = 'cm-miku-render';
        mikuRender.style.backgroundImage = '';
        // Reset transform so the render is hidden offscreen
        mikuRender.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      if (cardReveal) {
        cardReveal.className = 'cm-card-reveal';
        cardReveal.innerHTML = '';
      }
    }
    // Expose reset for external calls (e.g. Wish reset)
    window.clawMachineResetHighlight = resetHighlight;

    // 🎟️ Ticket Insert Animation
    function animateTicketInsert() {
      if (!ticketAnimation) return Promise.resolve();
      
      return new Promise((resolve) => {
        const ticket = ticketAnimation.querySelector('.cm-ticket-flying');
        ticket.classList.add('inserting');
        
        // Reduce animation duration to sync with faster CSS (0.4s)
        setTimeout(() => {
          ticket.classList.remove('inserting');
          resolve();
        }, 400);
      });
    }

    // 🤖 Claw Chaos Animation (Side to Side Madness)
    function triggerClawChaos() {
      if (!claw) return Promise.resolve();
      
      return new Promise((resolve) => {
        const railEl = document.querySelector('.cm-claw-rail');
        if (!railEl || !claw) return resolve();
        const railRect = railEl.getBoundingClientRect();
        const travelWidth = railRect.width - 48; // account for claw width
        let moves = 10;
        const hop = () => {
          if (moves-- <= 0) {
            // centre the claw after chaos
            const centerX = travelWidth / 2 + 24;
            setClawPose(centerX, 0);
            // reset arms
            claw.classList.remove('close');
            return setTimeout(resolve, 120);
          }
          // Play continuous targeting SFX
          try { SFX.play('ui.teleport'); } catch {}
          // generate random X within full rail range and tiny Y bob
          const randX = 24 + Math.random() * travelWidth;
          const randY = -4 + Math.random() * 14;
          claw.style.transition = 'transform .18s ease-in-out';
          setClawPose(randX, randY);
          setTimeout(hop, 140);
        };
        hop();
      });
    }

    // 🦾 Enhanced Claw Drop and Grab Animation
    function triggerClawAnimation() {
      if (!claw) return Promise.resolve();
      
      return new Promise((resolve) => {
        // Phase 1: Claw drops down to higher position (on Miku head level)
        claw.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        claw.style.transform = "translateX(-50%) translateY(100px)"; // Less drop for higher position
        // Extend the cable when the claw drops to maintain connection
        const cable = claw.querySelector('.cm-claw-cable');
        if (cable) {
          // Set a reasonable length; fallback to min-height if not defined
          cable.style.height = '140px';
        }
        
        // Phase 2: Arms close (grab attempt)
        setTimeout(() => {
          claw.classList.add("close");
          
          // Add grab effect
          spawnArcadeTag("GRAB!", 'get');
        }, 400);
        
        // Phase 3: Claw returns to higher position
        setTimeout(() => {
          claw.classList.remove("close");
          claw.style.transform = "translateX(-50%) translateY(0)";
          // Retract the cable back to its original size
          const cableBack = claw.querySelector('.cm-claw-cable');
          if (cableBack) {
            cableBack.style.height = '';
          }
          setTimeout(() => {
            claw.style.transition = "";
            resolve();
          }, 800);
        }, 1200);
      });
    }

  // We no longer override card reveal – the legacy gacha handles SFX and reveal UI.

    // 🎊 Enhanced Lever Animation
    function triggerLeverAnimation() {
      if (!lever) return Promise.resolve();
      
      return new Promise((resolve) => {
        lever.classList.add("pulling");
        
        setTimeout(() => {
          lever.classList.remove("pulling");
          resolve();
        }, 800);
      });
    }

    // ✨ Arcade Tag Spawning System
    function spawnArcadeTag(text, type = 'get') {
      if (!arcadeTags) return;
      
      const tag = document.createElement("div");
      tag.className = `wish-tag ${type}`;
      tag.textContent = text;
      
      // Random positioning for variety
      const x = Math.random() * 60 + 20; // 20% - 80%
      const y = Math.random() * 20 + 40; // 40% - 60%
      tag.style.left = x + "%";
      tag.style.top = y + "%";
      
      arcadeTags.appendChild(tag);
      
      // Remove after animation
      setTimeout(() => {
        tag.remove();
      }, 2500);
    }

    // 🎪 Complete Pull Sequence with Maximum Suspense
    async function executePullSequence(pullType, startOriginalWish) {
      if (isAnimating) return;
      isAnimating = true;
      
      try {
        // Reset previous highlight before starting a new animation
        resetHighlight();
        // Hide preview immediately
        if (preview) preview.style.opacity = '0';
        // Play initial roll sound for suspense
        try { SFX.play('Wish.roll'); } catch {}
        // Step 1: Ticket insertion animation with coin sound
        await animateTicketInsert();
        try { SFX.play('extra.coin'); } catch {}
        await new Promise(resolve => setTimeout(resolve, 200));
        // Step 2: Lever pull with select sound
        await triggerLeverAnimation();
        try { SFX.play('ui.select'); } catch {}
        await new Promise(resolve => setTimeout(resolve, 150));
        // Step 3: Claw goes absolutely crazy with teleport/fx sound
        spawnArcadeTag("CALCULATING...", 'bonus');
        try { SFX.play('ui.teleport'); } catch {}
        await triggerClawChaos();
        await new Promise(resolve => setTimeout(resolve, 400));
        // Step 4: Suspense building
        spawnArcadeTag("TARGETING...", 'rate-up');
        await new Promise(resolve => setTimeout(resolve, 700));
        // Step 5: Final claw animation
        await triggerClawAnimation();
        try { SFX.play('Wish.reveal'); } catch {}
        // Step 6: Refresh bottom sprites before showing results
        if (typeof refreshBottomSprites === 'function') refreshBottomSprites();
        // Step 7: Now trigger the original gacha logic (cards will display)
        if (typeof startOriginalWish === 'function') startOriginalWish();
        // Note: results visibility is now controlled by wish.js after highlight
        // Restore preview after animation gradually
        setTimeout(() => {
          if (preview) preview.style.opacity = '0.6';
        }, 2500);
      } catch (error) {
        console.error('Pull sequence error:', error);
      } finally {
        isAnimating = false;
      }
    }

    // 🎮 Button Event Handlers
    pullButtons.forEach((btn) => {
      if (!btn) return;
      
      const originalHandler = btn.onclick;
      btn.onclick = async function(e) {
        e.preventDefault();
        const pullType = btn.id.includes('10') ? 'multi' : 'single';

        // Guard: ensure enough tokens before we animate
        const tokensEl = document.getElementById('WishTokens');
        const have = parseInt(tokensEl?.textContent || '0', 10) || 0;
        const need = pullType === 'multi' ? 10 : 1;
        if (have < need) {
          try { window.SFX?.play?.('ui.unavailable'); } catch {}
          this.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }, { transform: 'translateY(0)' }], { duration: 200 });
          return;
        }

        // Before starting a new pull, reset any lingering UI state from previous wishes
        try {
          if (typeof window.__resetWish === 'function') {
            window.__resetWish();
          }
        } catch {}
        // Run our macro animation first, then kick off the original wish
        await executePullSequence(pullType, () => {
          if (originalHandler) originalHandler.call(this, e);
        });
      };
    });

    // Utility buttons don't trigger pull animations
    utilityButtons.forEach((btn) => {
      if (!btn) return;
      
      btn.addEventListener("click", () => {
        // Just add a simple feedback without pull sequence
        spawnArcadeTag("SUCCESS!", 'get');
      });
    });

    // 🌟 Enhanced Results Observer
    if (results) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList.contains("Wish-card")) {
              // Add entrance animation to new cards
              node.style.animation = "revealPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            }
          });
        });
      });
      
      observer.observe(results, { childList: true, subtree: true });
    }

    // 🎯 Initialize all systems
    initializeBottomSprites();
    
    // Add custom CSS for card animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes revealPop {
        0% {
          opacity: 0;
          transform: scale(0.8) translateY(20px);
        }
        60% {
          opacity: 1;
          transform: scale(1.1) translateY(-5px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Highlight Card in Render Stage
    function highlightCard(cards) {
      if (!cards || !cards.length) return;
      // Determine highest rarity card (first by highest, then first encountered)
      const sorted = cards.slice().sort((a, b) => {
        const ra = a.rarity || 1;
        const rb = b.rarity || 1;
        return rb - ra;
      });
      const chosen = sorted[0];
      if (!chosen) return;
      // Reset previous highlight state
      if (mikuRender) {
        // Clear previous classes and hide
        mikuRender.className = 'cm-miku-render';
        mikuRender.style.backgroundImage = '';
        mikuRender.style.transform = 'translate(-50%, -50%) scale(0)';
      }
      if (cardReveal) {
        cardReveal.className = 'cm-card-reveal';
        cardReveal.innerHTML = '';
      }
      // Determine star string for chosen rarity
      const starString = '★'.repeat(chosen.rarity || 1);
      // Stage 1: animate the Miku sprite being pulled up
      if (mikuRender) {
        mikuRender.style.backgroundImage = `url(${chosen.url})`;
        mikuRender.classList.add('pulling-up');
        // Once the sprite is visible, drop the claw to just above its top
        try {
          requestAnimationFrame(() => {
            dropToSpriteTop();
          });
        } catch {}
      }
      // Determine SFX based on rarity
      try {
        if (chosen.rarity >= 5) {
          SFX.play('Wish.high');
        } else if (chosen.rarity >= 4) {
          SFX.play('Wish.mid');
        } else if (chosen.rarity >= 3) {
          SFX.play('Wish.low');
        } else {
          SFX.play('Wish.fail');
        }
      } catch {}
      // After pull-up animation ends, pop full card
      setTimeout(() => {
        if (cardReveal) {
          cardReveal.innerHTML = `<div class="Wish-stars">${starString}</div><img src="${chosen.url}" alt="Highlight" class="reveal-image"/>`;
          cardReveal.classList.add('full-pop');
        }
        // Pop sound for card appearance
        try { SFX.play('Wish.pop'); } catch {}
      }, 850);

      // Once the highlight has had time to display, clear the stage so results are fully visible
      setTimeout(() => {
        if (mikuRender) {
          mikuRender.style.transform = 'translate(-50%, -50%) scale(0)';
          mikuRender.style.backgroundImage = '';
        }
        if (cardReveal) {
          cardReveal.className = 'cm-card-reveal';
          cardReveal.innerHTML = '';
        }
      }, 1800);
      // Run a secondary claw animation focused on card stage (no chaos)
      triggerClawAnimation();
      // Spawn an arcade tag based on rarity
      if (chosen.rarity >= 5) {
        spawnArcadeTag('RATE UP!', 'rate-up');
      } else if (chosen.rarity >= 4) {
        spawnArcadeTag('BONUS', 'bonus');
      } else {
        spawnArcadeTag('GET!', 'get');
      }
    }
    window.clawMachineHighlightCard = highlightCard;
    // Multi-highlight function for multi-pulls (rapid mini grabs). Highlights each card in quick succession.
    // Multi-highlight: perform rapid mini grabs for each card
    async function highlightMultiple(cards) {
      if (!Array.isArray(cards) || cards.length === 0) return;
      const max = Math.min(cards.length, 10);
      for (let i = 0; i < max; i++) {
        // chaos across the full rail before each grab
        await triggerClawChaos();
        // Clear previous stage
        if (mikuRender) {
          mikuRender.className = 'cm-miku-render';
          mikuRender.style.backgroundImage = '';
          mikuRender.style.transform = 'translate(-50%, -50%) scale(0)';
        }
        if (cardReveal) {
          cardReveal.className = 'cm-card-reveal';
          cardReveal.innerHTML = '';
        }
        // Set current sprite
        const card = cards[i];
        if (mikuRender) {
          mikuRender.style.backgroundImage = `url(${card.url})`;
          mikuRender.classList.add('pulling-up');
        }
        // Wait for next frame to ensure DOM updated
        await new Promise((r) => requestAnimationFrame(r));
        // Drop claw to sprite top for grab
        dropToSpriteTop();
        // Wait a bit then pop the card overlay
        await new Promise((r) => setTimeout(r, 260));
        if (cardReveal) {
          const stars = '★'.repeat(card.rarity || 1);
          cardReveal.innerHTML = `<div class="Wish-stars">${stars}</div><img src="${card.url}" alt="Highlight" class="reveal-image"/>`;
          cardReveal.classList.add('full-pop');
        }
        try { SFX.play('Wish.pop'); } catch {}
        // Short delay before next card
        await new Promise((r) => setTimeout(r, 220));
      }
      // After multi highlights, reset claw arms to open
      if (claw) claw.classList.remove('close');
    }
    window.clawMachineHighlightMultiple = highlightMultiple;
    // Global functions for external use
    window.clawMachineSpawnTag = spawnArcadeTag;
    window.clawMachineExecutePull = executePullSequence;
    
    console.log("🎰 Ultimate Refined Miku Claw Machine initialized! ✨");
  });
})();