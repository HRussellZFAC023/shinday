/* Shop module for shield and decoy items */
window.shop = (function () {
  const SFX = window.SFX;

  function getHearts() {
    return parseInt(localStorage.getItem("pixelbelle-hearts") || "0", 10);
  }

  function spendHearts(cost) {
    if (window.Hearts && typeof window.Hearts.addHearts === "function") {
      window.Hearts.addHearts(-cost);
    } else {
      const h = Math.max(0, getHearts() - cost);
      localStorage.setItem("pixelbelle-hearts", String(h));
      const el = document.getElementById("heartCount");
      if (el) el.textContent = h;
    }
  }

  function spawnDecoyTreats(n = 2) {
    const body = document.body;
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );
    for (let i = 0; i < n; i++) {
      const d = document.createElement("div");
      d.className = "decoy-treat";
      d.innerHTML = '<img src="./assets/cookie.png" class="decoy-img">';
      d.style.left = Math.random() * (vw - 50) + "px";
      d.style.animation = `decoyFloat ${
        6000 + Math.random() * 2000
      }ms linear forwards`;
      body.appendChild(d);
      setTimeout(() => d.remove(), 8000);
    }
    if (SFX && SFX.play) SFX.play("extra.yo");
  }
  let shieldUntil =
    parseInt(localStorage.getItem("diva.shield.until") || "0", 10) || 0;
  // Persistent bait charges (single-use items)
  let baitCount =
    parseInt(localStorage.getItem("diva.bait.count") || "0", 10) || 0;
  let potionUntil =
    parseInt(localStorage.getItem("diva.potion.until") || "0", 10) || 0;

  // Bait helpers (single-use charges)
  function getBaitCount() {
    return Math.max(0, parseInt(localStorage.getItem("diva.bait.count") || "" + baitCount, 10) || 0);
  }
  function setBaitCount(n) {
    baitCount = Math.max(0, n | 0);
    localStorage.setItem("diva.bait.count", String(baitCount));
    updateItemsOverlay();
  }
  function consumeBait() {
    if (getBaitCount() > 0) setBaitCount(getBaitCount() - 1);
  }
  function activateHeartShield(ms = 1000 * 60 * 25) {
    try {
      const m =
        typeof window.getSingerShieldMult === "function"
          ? getSingerShieldMult()
          : 1;
      ms = Math.round(ms * m);
    } catch (_) {}
    shieldUntil = Date.now() + ms;
    localStorage.setItem("diva.shield.until", String(shieldUntil));

    const zone = document.getElementById("heartZone");
    if (zone) {
      zone.classList.add("warded");
      setTimeout(() => zone.classList.remove("warded"), ms);
    }

    let overlay = document.getElementById("shieldGlowOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "shieldGlowOverlay";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255,255,0,0.15) 0%, rgba(255,255,0,0.05) 70%, transparent 100%);
        border: 1px solid rgba(255,255,0,0.6);
        box-shadow: inset 0 0 30px rgba(255,255,0,0.4), 0 0 20px rgba(255,255,0,0.3);
        pointer-events: none;
        z-index: 9999;
        animation: shieldPulse 2s ease-in-out infinite alternate;
      `;
      document.body.appendChild(overlay);
      if (!document.getElementById("shieldGlowStyles")) {
        const style = document.createElement("style");
        style.id = "shieldGlowStyles";
        style.textContent = `@keyframes shieldPulse {0%{opacity:0.8;}100%{opacity:1;}}`;
        document.head.appendChild(style);
      }
    }
    overlay.style.display = "block";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 10000); // hide glow after 10s
    if (SFX && SFX.play) SFX.play("extra.fx1");
  }
  function activateXPPotion(ms = 1000 * 60 * 15) {
    potionUntil = Date.now() + ms;
    localStorage.setItem("diva.potion.until", String(potionUntil));
    let overlay = document.getElementById("potionGlowOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "potionGlowOverlay";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
  background: radial-gradient(circle, rgba(255,105,180,0.15) 0%, rgba(255,105,180,0.05) 70%, transparent 100%);
  border: 1px solid rgba(255,105,180,0.6);
  box-shadow: inset 0 0 30px rgba(255,105,180,0.4), 0 0 20px rgba(255,105,180,0.3);
  pointer-events: none;
  z-index: 9998;
        animation: potionPulse 2s ease-in-out infinite alternate;
      `;
      document.body.appendChild(overlay);
      if (!document.getElementById("potionGlowStyles")) {
        const style = document.createElement("style");
        style.id = "potionGlowStyles";
        style.textContent = `@keyframes potionPulse {0%{opacity:0.8;}100%{opacity:1;}}`;
        document.head.appendChild(style);
      }
    }
    overlay.style.display = "block";
    setTimeout(() => {
      overlay.style.display = "none";
    }, 10000); // hide glow after 10s
    if (SFX && SFX.play) SFX.play("extra.fx1");
  }
  function initShop() {
    const shopPanel = document.querySelector(".shop-panel");
    const C = window.SITE_CONTENT || {};
    const ShopC = C.shop || {};
    const ItemsC = (ShopC && ShopC.items) || {};

    // Inject beautiful Miku-themed shop styles
    injectShopStyles();

    // Transform the entire shop panel into something beautiful
    if (shopPanel) {
      // Clear existing content for complete redesign
      shopPanel.innerHTML = "";

      // Create stunning shop header with Miku and speech bubble
      const shopHeader = document.createElement("div");
      shopHeader.className = "miku-shop-header";
      shopHeader.innerHTML = `
        <div class="miku-character">
          <img src="./assets/idol.png" alt="Shop Miku" class="miku-standalone">
          <div class="miku-sparkles">✨</div>
          <div class="miku-sparkles sparkle-2">✨</div>
          <div class="miku-sparkles sparkle-3">⭐</div>
        </div>
        <div class="miku-speech-bubble">
          <div class="speech-content">
    <div class="welcome-text">${ShopC.headerWelcome || "いらっしゃいませ〜！"}</div>
    <div class="welcome-subtitle">${ShopC.headerSubtitle || "Welcome to my shop! ✨"}</div>
          </div>
          <div class="speech-tail"></div>
        </div>
      `;

      // Create items container
      const itemsContainer = document.createElement("div");
      itemsContainer.className = "miku-items-container";

      // Create shield item card
      const shieldCard = document.createElement("div");
      shieldCard.className = "miku-item-card shield-card";
      shieldCard.id = "shopShield";
      shieldCard.innerHTML = `
  <div class="item-icon"><img src="./assets/shield.png" class="shop-item-img"></div>
        <div class="item-info">
          <h3>${(ItemsC.shield && ItemsC.shield.title) || "Heart Shield"}</h3>
          <p>${(ItemsC.shield && ItemsC.shield.description) || "Protect your precious Mikus and precious hearts for 35 minutes!"}</p>
          <div class="item-cost">
            <span class="cost-amount">${(ItemsC.shield && ItemsC.shield.cost) || 50}</span>
            <span class="cost-hearts">💖</span>
          </div>
        </div>
        <div class="item-glow"></div>
        <div class="purchase-effect"></div>
      `;

      // Create decoy item card
      const decoyCard = document.createElement("div");
      decoyCard.className = "miku-item-card decoy-card";
      decoyCard.id = "shopDecoy";
      decoyCard.innerHTML = `
  <div class="item-icon"><img src="./assets/cookie.png" class="shop-item-img"></div>
        <div class="item-info">
          <h3>${(ItemsC.decoy && ItemsC.decoy.title) || "Sweet Treats"}</h3>
          <p>${(ItemsC.decoy && ItemsC.decoy.description) || "Distract threats with delicious decoys!"}</p>
          <div class="item-cost">
            <span class="cost-amount">${(ItemsC.decoy && ItemsC.decoy.cost) || 5}</span>
            <span class="cost-hearts">💖</span>
          </div>
        </div>
        <div class="item-glow"></div>
        <div class="purchase-effect"></div>
      `;

      // Create XP potion item card
      const potionCard = document.createElement("div");
      potionCard.className = "miku-item-card potion-card";
      potionCard.id = "shopPotion";
      potionCard.innerHTML = `
        <div class="item-icon"><img src="./assets/xp_potion.png" class="shop-item-img"></div>
        <div class="item-info">
          <h3>${(ItemsC.potion && ItemsC.potion.title) || "XP Potion"}</h3>
          <p>${(ItemsC.potion && ItemsC.potion.description) || "Double heart and XP gains for 15 minutes"}</p>
          <div class="item-cost">
            <span class="cost-amount">${(ItemsC.potion && ItemsC.potion.cost) || 100}</span>
            <span class="cost-hearts">💖</span>
          </div>
        </div>
        <div class="item-glow"></div>
        <div class="purchase-effect"></div>
      `;

      // Create egg item card
      const eggCard = document.createElement("div");
      eggCard.className = "miku-item-card egg-card";
      eggCard.id = "shopEgg";
      eggCard.innerHTML = `
        <div class="item-icon"><img src="./assets/egg.png" class="shop-item-img"></div>
        <div class="item-info">
          <h3>${(ItemsC.egg && ItemsC.egg.title) || "Mystery Egg"}</h3>
          <p>${(ItemsC.egg && ItemsC.egg.description) || "Hatches a random new companion"}</p>
          <div class="item-cost">
            <span class="cost-amount">${(ItemsC.egg && ItemsC.egg.cost) || 1000}</span>
            <span class="cost-hearts">💖</span>
          </div>
        </div>
        <div class="item-glow"></div>
        <div class="purchase-effect"></div>
      `;

      itemsContainer.appendChild(shieldCard);
      itemsContainer.appendChild(decoyCard);
      itemsContainer.appendChild(potionCard);
      itemsContainer.appendChild(eggCard);

      // Create status area
      const statusArea = document.createElement("div");
      statusArea.className = "miku-shop-status";
      statusArea.innerHTML = `
        <div id="shopStatus" class="status-text"></div>
      `;

      shopPanel.appendChild(shopHeader);
      shopPanel.appendChild(itemsContainer);
      shopPanel.appendChild(statusArea);
    }

    // Get references to new elements
    const newBtnDecoy = document.getElementById("shopDecoy");
    const newBtnShield = document.getElementById("shopShield");
    const newBtnPotion = document.getElementById("shopPotion");
    const newBtnEgg = document.getElementById("shopEgg");
    const newStatus = document.getElementById("shopStatus");

    // Hide status overlay initially
    const statusOverlay = document.getElementById("itemsStatusOverlay");
    if (statusOverlay) {
      statusOverlay.style.display = "none";
    }

    // Enhanced click handlers with state management and animations
    if (newBtnDecoy) {
      newBtnDecoy.addEventListener("click", () => {
        const cost = (ItemsC.decoy && ItemsC.decoy.cost) || 5;
        if (getHearts() >= cost) {
          playPurchaseAnimation(newBtnDecoy);
          spendHearts(cost);
          spawnDecoyTreats(2 + Math.floor(Math.random() * 3));
          baitCount += 1;
          localStorage.setItem("diva.bait.count", String(baitCount));
          ensureItemsOverlay();
          if (newStatus) newStatus.textContent = "Sweet decoy added! 🍪✨";
          updateItemsOverlay();
          if (SFX && SFX.play) SFX.play("ui.select");
        } else {
          playDeniedAnimation(newBtnDecoy);
          if (newStatus)
            newStatus.textContent = "Not enough hearts! 💔";
          if (SFX && SFX.play) SFX.play("ui.unavailable");
        }
      });
    }

    if (newBtnShield) {
      newBtnShield.addEventListener("click", () => {
        const cost = (ItemsC.shield && ItemsC.shield.cost) || 50;
        const now = Date.now();

  if (shieldUntil > now) {
          playDeniedAnimation(newBtnShield);
          if (newStatus)
            newStatus.textContent = "Wait for current item to finish! 🥤";
          if (SFX && SFX.play) SFX.play("ui.unavailable");
          if (window.ShimejiFunctions?.makeRandomSpeak) {
            window.ShimejiFunctions.makeRandomSpeak(
              "野菜ジュースを先に飲んで！🥤",
              1800,
            );
          }
          return;
        }

        const have = getHearts();
        if (have >= cost) {
          playPurchaseAnimation(newBtnShield);
          spendHearts(cost);
          activateHeartShield();
          if (newStatus) newStatus.textContent = "Heart Shield activated! ⛨✨";
          updateItemsOverlay();
          if (SFX && SFX.play) SFX.play("extra.fx2");
          if (window.ShimejiFunctions?.makeAllSpeak) {
            window.ShimejiFunctions.makeAllSpeak(
              "最強のシールドが発動！⛨✨💖",
              2000,
            );
          }
        } else {
          playDeniedAnimation(newBtnShield);
          if (newStatus)
            newStatus.textContent = `Need ${cost - have} more hearts! 💔`;
          if (SFX && SFX.play) SFX.play("ui.unavailable");
          if (window.ShimejiFunctions?.makeRandomSpeak) {
            window.ShimejiFunctions.makeRandomSpeak(
              "💖がもっと必要だよ〜頑張って！",
              1300,
            );
          }
        }
      });
    }

    if (newBtnPotion) {
      newBtnPotion.addEventListener("click", () => {
        const cost = (ItemsC.potion && ItemsC.potion.cost) || 100;
        const now = Date.now();
        if (potionUntil > now) {
          playDeniedAnimation(newBtnPotion);
          if (newStatus) newStatus.textContent = "Potion already active!";
          if (SFX && SFX.play) SFX.play("ui.unavailable");
          return;
        }
        if (getHearts() >= cost) {
          playPurchaseAnimation(newBtnPotion);
          spendHearts(cost);
          activateXPPotion(1000 * 60 * 15);
          ensureItemsOverlay();
          if (newStatus) newStatus.textContent = "XP Potion activated! ✨";
          updateItemsOverlay();
          if (SFX && SFX.play) SFX.play("extra.fx2");
          if (window.ShimejiFunctions?.makeRandomSpeak) {
            window.ShimejiFunctions.makeRandomSpeak(
              "経験値ポーションで2倍だよ！✨",
              1800
            );
          }
        } else {
          playDeniedAnimation(newBtnPotion);
          if (newStatus)
            newStatus.textContent = "Not enough hearts! 💔";
          if (SFX && SFX.play) SFX.play("ui.unavailable");
        }
      });
    }

    if (newBtnEgg) {
      newBtnEgg.addEventListener("click", () => {
        const cost = (ItemsC.egg && ItemsC.egg.cost) || 1000;
        if (getHearts() >= cost) {
          playPurchaseAnimation(newBtnEgg);
          spendHearts(cost);
          if (newStatus) newStatus.textContent = "Oh, it's hatching!?";
          if (SFX && SFX.play) SFX.play("extra.yo");
          if (window.ShimejiFunctions?.makeRandomSpeak)
            window.ShimejiFunctions.makeRandomSpeak("Oh, it's hatching!?", 2000);
          if (window.ShimejiFunctions) {
            const spawns = [
              window.ShimejiFunctions.spawnMiku,
              window.ShimejiFunctions.spawnMikuAlt,
              window.ShimejiFunctions.spawnMikuSketch,
              window.ShimejiFunctions.spawnClassic,
            ].filter(Boolean);
            const f = spawns[Math.floor(Math.random() * spawns.length)];
            if (f) f();
            const eggCount =
              parseInt(localStorage.getItem("diva.eggs") || "0", 10) + 1;
            localStorage.setItem("diva.eggs", String(eggCount));
          }
          updateItemsOverlay();
        } else {
          playDeniedAnimation(newBtnEgg);
          if (newStatus)
            newStatus.textContent = "Need more hearts for the egg!";
          if (SFX && SFX.play) SFX.play("ui.unavailable");
        }
      });
    }

  // Remove legacy duplicate handlers (cleaned)

    // single tick to update shield/bait overlay
    if (!window.__shopTick) {
      window.__shopTick = setInterval(updateItemsOverlay, 1000);
    }

    // initial render
    setTimeout(updateItemsOverlay, 0);
  }

  // (reduced-motion support removed) - shop always uses full animations

  // Inject beautiful Miku-themed shop styles
  function injectShopStyles() {
    if (document.getElementById("mikuShopStyles")) return;

    const style = document.createElement("style");
    style.id = "mikuShopStyles";
    style.textContent = /*CSS*/ `

      
      .miku-shop-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      position: relative;
      gap: 12px;
      }
      
      .miku-character {
      position: relative;
      flex-shrink: 0;
      }
      
      .miku-standalone {
      width: 50px;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
      animation: mikuFloat 3s ease-in-out infinite;
      }
      
      @keyframes mikuFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
      }
      
      .miku-sparkles {
      position: absolute;
      font-size: 10px;
      animation: sparkleFloat 3s ease-in-out infinite;
      pointer-events: none;
      opacity: 0.8;
      }
      
      .miku-sparkles.sparkle-2 {
      top: -3px;
      right: -3px;
      animation-delay: -1s;
      }
      
      .miku-sparkles.sparkle-3 {
      bottom: -3px;
      left: -3px;
      animation-delay: -2s;
      }
      
      @keyframes sparkleFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
      50% { transform: translateY(-5px) rotate(180deg); opacity: 1; }
      }
      
      .miku-speech-bubble {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      padding: 8px 12px;
      position: relative;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      flex-grow: 1;
      margin-top: 5px;
      }
      
      .speech-content {
      font-size: 11px;
      line-height: 1.3;
      }
      
      .welcome-text {
      font-weight: bold;
      color: #2b2b44;
      margin-bottom: 2px;
      }
      
      .welcome-subtitle {
      color: #666;
      font-size: 10px;
      }
      
      .speech-tail {
      position: absolute;
      left: -6px;
      top: 15px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 6px 6px 0;
      border-color: transparent rgba(255, 255, 255, 0.95) transparent transparent;
      }
      
      .speech-tail::before {
      content: '';
      position: absolute;
      left: 1px;
      top: -6px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 6px 6px 6px 0;
      border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
      }
      
      /* Use grid so cards form a 2x2 layout; rows sized to content (auto height) */
      .miku-items-container {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 12px;
      align-items: start; /* ensure cards fit content height */
      }

      .miku-item-card {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 12px 8px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      width: 100%; /* grid column will control actual width */
      height: auto; /* let height fit content */
      }
      
      .miku-item-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-color: rgba(57, 255, 255, 0.5);
      background: rgba(255, 255, 255, 0.95);
      }
      
      .miku-item-card.shield-card:hover {
      border-color: rgba(255, 215, 0, 0.6);
      }
      
      .miku-item-card.decoy-card:hover {
      border-color: rgba(255, 165, 0, 0.6);
      }
      
      .item-icon {
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: iconBob 2s ease-in-out infinite;
      }
    .shop-item-img {
      width: 32px;
      height: 32px;
      image-rendering: pixelated;
      }
      @keyframes iconBob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
      }
      
      .item-info h3 {
      margin: 0 0 4px 0;
      font-size: 12px;
      color: #2b2b44;
      font-weight: bold;
      }
      
      .item-info p {
      margin: 0 0 8px 0;
      font-size: 9px;
      color: #666;
      line-height: 1.3;
      }
      
      .item-cost {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      font-weight: bold;
      }
      
      .cost-amount {
      font-size: 14px;
      color: #ff1493;
      }
      
      .cost-hearts {
      font-size: 12px;
      animation: heartBeat 1.5s ease-in-out infinite;
      }
      
      @keyframes heartBeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
      }
      
      .item-glow {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(57, 255, 255, 0.2) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      }
      
      .miku-item-card:hover .item-glow {
      opacity: 1;
      }
      
      .purchase-effect {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60px;
      height: 60px;
      margin: -30px 0 0 -30px;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      }
      
      .miku-shop-status {
      text-align: center;
      }
      
      .status-text {
      font-size: 11px;
      color: #2b2b44;
      min-height: 14px;
      font-weight: 500;
      }
      
      /* Purchase success animation */
      @keyframes purchaseSuccess {
      0% {
        background: radial-gradient(circle, rgba(57, 255, 57, 0.8) 0%, transparent 100%);
        opacity: 1;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
      100% {
        opacity: 0;
        transform: scale(1.8);
      }
      }
      
      /* Purchase denied animation */
      @keyframes purchaseDenied {
      0% {
        background: radial-gradient(circle, rgba(255, 57, 57, 0.8) 0%, transparent 100%);
        opacity: 1;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
      100% {
        opacity: 0;
        transform: scale(1.8);
      }
      }
      
  @keyframes cardShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-2px); }
  }
      
    `;
    document.head.appendChild(style);
  }

  // Animation functions
  function playPurchaseAnimation(card) {
    const effect = card.querySelector(".purchase-effect");
    if (effect) {
      effect.style.animation = "purchaseSuccess 0.6s ease-out";
      card.style.animation = "mikuBounce 0.6s ease-out";
      setTimeout(() => {
        effect.style.animation = "";
        card.style.animation = "";
      }, 600);
    }
  }

  function playDeniedAnimation(card) {
    const effect = card.querySelector(".purchase-effect");
    if (effect) {
      effect.style.animation = "purchaseDenied 0.6s ease-out";
      card.style.animation = "cardShake 0.5s ease-out";
      setTimeout(() => {
        effect.style.animation = "";
        card.style.animation = "";
      }, 600);
    }
  }

  // Ensure the overlay exists (but only add shield/cookie elements when they are active)
  function ensureItemsOverlay() {
    let ov = document.getElementById("itemsStatusOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "itemsStatusOverlay";
      ov.style.cssText =
        "position:fixed;right:10px;top:10px;z-index:9998;background:rgba(255,255,255,0.85);border:2px solid var(--border);border-radius:10px;padding:6px 10px;display:flex;gap:12px;align-items:center;backdrop-filter:saturate(1.1) blur(2px)";
      ov.style.display = "none"; // hidden until active
      document.body.appendChild(ov);
    }

  const now = Date.now();
  const shieldActive = shieldUntil > now;
  const baitActive = getBaitCount() > 0;
  const potionActive = potionUntil > now;

    const base =
      "transition:opacity .35s ease;opacity:0;display:inline-flex;gap:6px;align-items:center;font-weight:800;color:#2b2b44;";
    // manage shield element
    const shieldEl = document.getElementById("itemsOverlayShield");
    if (shieldActive && !shieldEl) {
      const s = document.createElement("span");
      s.id = "itemsOverlayShield";
      s.style.cssText = base;
      s.innerHTML = '<img src="./assets/shield.png" style="width:16px;height:16px;image-rendering:pixelated;"> <span class="label"></span>';
      ov.appendChild(s);
    } else if (!shieldActive && shieldEl) {
      shieldEl.remove();
    }

    // manage bait element
  const baitEl = document.getElementById("itemsOverlayBait");
  if (baitActive && !baitEl) {
      const b = document.createElement("span");
      b.id = "itemsOverlayBait";
      b.style.cssText = base;
      b.innerHTML = '<img src="./assets/cookie.png" style="width:16px;height:16px;image-rendering:pixelated;"> <span class="label"></span>';
      ov.appendChild(b);
    } else if (!baitActive && baitEl) {
      baitEl.remove();
    }

    // manage potion element
    const potionEl = document.getElementById("itemsOverlayPotion");
    if (potionActive && !potionEl) {
      const pEl = document.createElement("span");
      pEl.id = "itemsOverlayPotion";
      pEl.style.cssText = base;
      pEl.innerHTML = '<img src="./assets/xp_potion.png" style="width:16px;height:16px;image-rendering:pixelated;"> <span class="label"></span>';
      ov.appendChild(pEl);
    } else if (!potionActive && potionEl) {
      potionEl.remove();
    }

    return ov;
  }

  // Update overlay based on active timers
  function updateItemsOverlay() {
    ensureItemsOverlay();
    const ov = document.getElementById("itemsStatusOverlay");
  const shieldEl = document.getElementById("itemsOverlayShield");
  const baitEl = document.getElementById("itemsOverlayBait");
  const potionEl = document.getElementById("itemsOverlayPotion");

    const now = Date.now();
  const shieldLeft = Math.max(0, shieldUntil - now);
  const baitCharges = getBaitCount();
  const potionLeft = Math.max(0, potionUntil - now);

  // decide visibility
  const anyActive = shieldLeft > 0 || potionLeft > 0 || baitCharges > 0;
    if (!ov) return;
    ov.style.display = anyActive ? "block" : "none";

    // shield label
    if (shieldEl) {
      const inner = shieldEl.querySelector(".label");
      if (shieldLeft > 0) {
        const mm = Math.floor(shieldLeft / 60000);
        const ss = Math.floor((shieldLeft % 60000) / 1000);
        inner.textContent = mm > 0 ? `${mm}m ${ss}s` : `${ss}s`;
        shieldEl.style.opacity = "1";
      } else {
        inner.textContent = "";
        shieldEl.style.opacity = "0";
      }
    }

    // bait label
    if (baitEl) {
      const inner = baitEl.querySelector(".label");
      if (baitCharges > 0) {
        inner.textContent = String(baitCharges);
        baitEl.style.opacity = "1";
      } else {
        inner.textContent = "";
        baitEl.style.opacity = "0";
      }
    }

    if (potionEl) {
      const inner = potionEl.querySelector(".label");
      if (potionLeft > 0) {
        const mm = Math.floor(potionLeft / 60000);
        const ss = Math.floor((potionLeft % 60000) / 1000);
        inner.textContent = mm > 0 ? `${mm}m ${ss}s` : `${ss}s`;
        potionEl.style.opacity = "1";
      } else {
        inner.textContent = "";
        potionEl.style.opacity = "0";
      }
    }
  }

  // expose some functions for other modules to check timers
  if (typeof window !== "undefined") {
    window.__heartShieldUntil = shieldUntil;
    window.__potionUntil = potionUntil;
    window.__xpPotionUntil = potionUntil;
    // keep a simple updater in case other modules read the globals
    setInterval(() => {
      window.__heartShieldUntil = shieldUntil;
      window.__potionUntil = potionUntil;
      window.__xpPotionUntil = potionUntil;
    }, 1000);
  }

  // initial ensures
  ensureItemsOverlay();

  return {
    initShop,
    activateHeartShield,
    spawnDecoyTreats,
    getBaitCount,
    setBaitCount,
    consumeBait,
  };
})();
