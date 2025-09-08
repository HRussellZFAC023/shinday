// Canvas-based Study tab - unified Japanese learning center
// Merges all chat history developments: WOD, games, HUD, visual effects, beatpad
(function () {
  let canvas, ctx, state, gameState;
  // current singer avatar
  let singerImg = null;
  let singerUrl = null;
  
  // Initialize canvas and state
  function initCanvas() {
    const container = document.getElementById("jpGames");
    if (!container) return false;
    
    // Clear existing content and create canvas
    container.innerHTML = /*html*/`
  <div class="study-canvas-container" style="position:relative;width:100%;max-width:1200px;margin:0 auto;">
        <canvas id="studyCanvas" width="800" height="1200" style="
          width:100%;height:auto;max-height:80vh;image-rendering:auto;
          background:#ffffff;border:2px solid var(--border);border-radius:12px;
          box-shadow:var(--shadow);display:block;
        "></canvas>
  </div>
    `;
    
    canvas = document.getElementById("studyCanvas");
  ctx = canvas.getContext("2d");
  // Prefer quality text rendering
  ctx.imageSmoothingEnabled = true;
    
    // Initialize state
    state = {
      mode: 'welcome', // welcome, vocab, kanji, kotoba, miku-chat, typing, wod
      score: 0,
      streak: 0,
      bestStreak: 0,
      lives: 3,
      voltage: 0,
      combo: 0,
      xp: 0,
      hearts: 0,
      question: null,
      questionMeta: null,
      hitboxes: [],
      hint: false,
      effects: [],
      particles: [],
      feedback: null
    };
    
    // Game-specific state
    gameState = {
      vocab: { mode: 'jp-en', timer: 15 },
      kanji: { mode: 'meaning', timer: 15 },
      kotoba: { conversation: [], responses: [] },
      mikuChat: { conversation: [], thinking: false },
      typing: { text: '', target: '', wpm: 0, accuracy: 100 },
      wod: window.WOD || { word: '', reading: '', meaning: '' }
    };
    
    setupControls();
  setupCanvas();
  tryLoadSinger();
    drawWelcome();
    return true;
  }
  
  function setupControls() {
    document.getElementById("studyReset")?.addEventListener("click", () => {
      state.score = 0;
      state.streak = 0;
      state.combo = 0;
      updateHUD();
      if (state.mode !== 'welcome') renderCurrentMode();
    });
    
    document.getElementById("studyHint")?.addEventListener("click", () => {
      state.hint = true;
      renderCurrentMode();
    });
    
    document.getElementById("studyNext")?.addEventListener("click", () => {
      if (state.mode === 'vocab') nextVocab();
      else if (state.mode === 'kanji') nextKanji();
      else if (state.mode === 'kotoba') nextKotoba();
      else if (state.mode === 'miku-chat') nextMikuChat();
      else if (state.mode === 'typing') nextTyping();
      else if (state.mode === 'wod') nextWOD();
    });
    
    document.getElementById("studyWOD")?.addEventListener("click", () => {
      refreshWOD();
    });
    
    document.getElementById("studySession")?.addEventListener("click", () => {
      if (!state.sessionActive) startSession();
      else endSession();
    });
  }
  
  function setupCanvas() {
    // Canvas click handler
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      
      for (const hitbox of state.hitboxes) {
        if (x >= hitbox.x && x <= hitbox.x + hitbox.w && 
            y >= hitbox.y && y <= hitbox.y + hitbox.h) {
          hitbox.onClick();
          return;
        }
      }
    });
    
    // Keyboard handler for beatpad and typing
    document.addEventListener("keydown", (e) => {
      if (state.mode === 'typing') {
        handleTypingInput(e);
      } else {
        handleBeatpadInput(e);
      }
    });
    
    // Animation loop
    function animate() {
      updateParticles();
      updateEffects();
      renderCurrentMode();
      requestAnimationFrame(animate);
    }
    animate();
  }
  
  // Drawing utilities
  function roundRect(x, y, w, h, r) {
    const radius = Math.min(r, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }
  
  function pastelBG() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#bde3ff');
    gradient.addColorStop(0.25, '#ffd1ec');
    gradient.addColorStop(0.5, '#cff6e6');
    gradient.addColorStop(0.75, '#e6d1ff');
    gradient.addColorStop(1, '#fff3d1');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  function drawHeader(title, subtitle = '') {
    ctx.save();
    // header 70px tall for breathing room
    roundRect(20, 20, canvas.width - 40, 70, 16);
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#b7d7ff';
    ctx.stroke();
    
    ctx.fillStyle = '#2b2b44';
    ctx.font = '700 28px Nunito, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, 40, 60);
    
    if (subtitle) {
      ctx.font = '400 16px Nunito, sans-serif';
      ctx.fillStyle = '#596286';
      ctx.fillText(subtitle, 40, 82);
    }

    // Current singer avatar at right
    const avatarSize = 48;
    const ax = canvas.width - 40 - avatarSize;
    const ay = 31;
    ctx.save();
    ctx.beginPath();
    ctx.arc(ax + avatarSize / 2, ay + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    if (singerImg && singerImg.complete) {
      ctx.drawImage(singerImg, ax, ay, avatarSize, avatarSize);
    } else {
      ctx.fillStyle = '#e6d1ff';
      ctx.fillRect(ax, ay, avatarSize, avatarSize);
    }
    ctx.restore();
    ctx.strokeStyle = '#a594f9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ax + avatarSize / 2, ay + avatarSize / 2, avatarSize / 2 + 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  
  function drawButton(text, x, y, w, h, style = {}) {
    ctx.save();
    roundRect(x, y, w, h, 12);
    
    // Button background
    if (style.highlight) {
      ctx.fillStyle = '#a594f9';
    } else if (style.correct) {
      ctx.fillStyle = '#2ed573';
    } else if (style.incorrect) {
      ctx.fillStyle = '#ff4757';
    } else {
      ctx.fillStyle = '#ffffff';
    }
    ctx.fill();
    
    // Border
    ctx.lineWidth = 2;
    ctx.strokeStyle = style.highlight ? '#6c5ce7' : '#b7d7ff';
    ctx.stroke();
    
    // Text
    ctx.fillStyle = style.highlight || style.correct || style.incorrect ? '#ffffff' : '#2b2b44';
    ctx.font = '700 18px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + w/2, y + h/2);
    
    ctx.restore();
  }
  
  function addHitbox(x, y, w, h, onClick) {
    state.hitboxes.push({ x, y, w, h, onClick });
  }
  
  // Welcome screen with game selection
  function drawWelcome() {
    state.hitboxes = [];
    pastelBG();
    drawHeader('🎤 Miku\'s Language Dojo', 'Select your study adventure!');
    
    // WOD section
    const wodY = 120;
    roundRect(40, wodY, canvas.width - 80, 120, 12);
    ctx.fillStyle = 'rgba(255,255,255,.95)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#b7d7ff';
    ctx.stroke();
    
    ctx.fillStyle = '#2b2b44';
    ctx.font = '700 24px Nunito, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('📖 Word of the Day', 60, wodY + 35);
    
  const wod = gameState.wod;
  if (wod && (wod.word || wod.reading || wod.meaning)) {
      ctx.font = '900 36px "Noto Sans JP", sans-serif';
      ctx.fillText(wod.word || wod.reading, 60, wodY + 75);
      
      ctx.font = '400 18px Nunito, sans-serif';
      ctx.fillStyle = '#596286';
      if (wod.reading && wod.word) ctx.fillText(wod.reading, 60, wodY + 95);
      if (wod.meaning) ctx.fillText(wod.meaning, 300, wodY + 75);
    } else {
      ctx.font = '400 18px Nunito, sans-serif';
      ctx.fillStyle = '#596286';
      ctx.fillText('Word not ready. Press New Word below.', 60, wodY + 75);
    }
    
    // Game tiles
    const tiles = [
      { id: 'vocab', title: 'Vocab Pop', desc: 'JP ↔ EN Quiz', icon: '🗣️', x: 40, y: 280 },
      { id: 'kanji', title: 'Kanji Master', desc: 'Characters & Meanings', icon: '漢', x: 310, y: 280 },
      { id: 'kotoba', title: 'Kotoba Chat', desc: 'Conversation Practice', icon: 'ことば', x: 580, y: 280 },
      { id: 'miku-chat', title: 'Miku × Chat', desc: 'Chat with Miku', icon: '💬', x: 850, y: 280 },
      { id: 'typing', title: 'JP Typing', desc: 'Speed & Accuracy', icon: '⌨️', x: 40, y: 420 },
      { id: 'wod', title: 'WOD Study', desc: 'Deep Dive Learning', icon: '📚', x: 310, y: 420 }
    ];
    
    tiles.forEach(tile => {
      const w = 250, h = 120;
      drawButton('', tile.x, tile.y, w, h);
      
      ctx.fillStyle = '#2b2b44';
      ctx.font = '700 20px Nunito, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${tile.icon} ${tile.title}`, tile.x + 20, tile.y + 35);
      
      ctx.font = '400 14px Nunito, sans-serif';
      ctx.fillStyle = '#596286';
      ctx.fillText(tile.desc, tile.x + 20, tile.y + 55);
      
  // PS-style beatpad mapping
  const keyMap = { vocab: '△', kanji: '□', kotoba: '×', 'miku-chat': '○', typing: 'L1', wod: 'R1' };
  ctx.fillStyle = '#a594f9';
  ctx.font = '900 14px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`[${keyMap[tile.id]}]`, tile.x + w - 20, tile.y + 25);
      
      addHitbox(tile.x, tile.y, w, h, () => startMode(tile.id));
    });
    
    // Instructions
    ctx.fillStyle = '#596286';
    ctx.font = '400 16px Nunito, sans-serif';
    ctx.textAlign = 'center';
  ctx.fillText('Click a tile or use beatpad keys (△/○/×/□) to start', canvas.width/2, 700);
  ctx.fillText('3-minute session starts automatically • Combos and hearts active', canvas.width/2, 720);
  ctx.font = '700 12px Nunito, sans-serif';
  ctx.fillText('W=△  D=○  S=×  A=□', canvas.width/2, 742);
  }
  
  function startMode(mode) {
    state.mode = mode;
    state.hint = false;
    state.hitboxes = [];
    
    if (mode === 'vocab') startVocab();
    else if (mode === 'kanji') startKanji();
    else if (mode === 'kotoba') startKotoba();
    else if (mode === 'miku-chat') startMikuChat();
    else if (mode === 'typing') startTyping();
    else if (mode === 'wod') startWODStudy();
    
    updateHUD();
    const evName =
      mode === 'vocab' ? 'vocab-start' :
      mode === 'kanji' ? 'kanji-start' :
      mode === 'kotoba' ? 'kotoba-start' :
      mode === 'miku-chat' ? 'miku-chat-start' : null;
    if (evName) document.dispatchEvent(new Event(evName));
  }
  
  function renderCurrentMode() {
    if (state.mode === 'welcome') drawWelcome();
    else if (state.mode === 'vocab') renderVocab();
    else if (state.mode === 'kanji') renderKanji();
    else if (state.mode === 'kotoba') renderKotoba();
    else if (state.mode === 'miku-chat') renderMikuChat();
    else if (state.mode === 'typing') renderTyping();
    else if (state.mode === 'wod') renderWODStudy();
  // After mode render, paint universal canvas controls
  renderCanvasControls();
    
    renderEffects();
    renderFeedback();
  }
  
  // Vocabulary game implementation
  const VOCAB_QUESTIONS = [
    {jp:'犬', options:['cat','dog','fish','bird'], answer:1},
    {jp:'水', options:['fire','earth','water','wind'], answer:2},
    {jp:'寿司', options:['burger','sushi','ramen','cake'], answer:1},
    {jp:'学校', options:['school','bank','store','train'], answer:0},
    {jp:'空', options:['sky','river','mountain','forest'], answer:0},
    {jp:'本', options:['book','pen','paper','desk'], answer:0},
    {jp:'家', options:['car','house','tree','road'], answer:1},
    {jp:'猫', options:['dog','cat','bird','fish'], answer:1}
  ];
  
  function startVocab() {
    nextVocab();
  }
  
  function nextVocab() {
    state.hitboxes = [];
    const q = VOCAB_QUESTIONS[Math.floor(Math.random() * VOCAB_QUESTIONS.length)];
    const shuffled = q.options.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const map = shuffled.map((opt) => q.options.indexOf(opt));
    state.question = q;
    state.questionMeta = { shuffled, map };
    renderVocab();
  }
  
  function renderVocab() {
    pastelBG();
    drawHeader('🗣️ Vocab Pop', `${gameState.vocab.mode.toUpperCase()} • Timer: ${gameState.vocab.timer}s`);
    
    // Question card
    roundRect(100, 130, canvas.width - 200, 140, 16);
    ctx.fillStyle = 'rgba(255,255,255,.95)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#b7d7ff';
    ctx.stroke();
    
    ctx.fillStyle = '#2b2b44';
    ctx.font = '900 72px "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(state.question.jp, canvas.width/2, 220);
    
    // Options grid
    const gridY = 300;
    const buttonW = 280;
    const buttonH = 70;
    const spacing = 20;
    const startX = (canvas.width - (buttonW * 2 + spacing)) / 2;
    
  const shuffled = state.questionMeta.shuffled;
  const shuffleMap = state.questionMeta.map;
    
    shuffled.forEach((option, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = startX + col * (buttonW + spacing);
      const y = gridY + row * (buttonH + spacing);
      
      const isCorrect = shuffleMap[i] === state.question.answer;
      const style = state.hint && isCorrect ? { highlight: true } : {};
      
      drawButton(option, x, y, buttonW, buttonH, style);
      addHitbox(x, y, buttonW, buttonH, () => answerVocab(isCorrect, option));
    });
    
    // Back button
    drawButton('← Back to Menu', 40, canvas.height - 60, 150, 40);
    addHitbox(40, canvas.height - 60, 150, 40, () => { state.mode = 'welcome'; drawWelcome(); });
  }
  
  function answerVocab(correct, answer) {
    const correctAnswer = state.question.options[state.question.answer];
    
    if (correct) {
      state.score += 10;
      state.streak++;
      state.combo++;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  if (window.HUD) { window.HUD.score += 10; window.HUD.counts.COOL++; }
      
      // Visual effects
      createRingEffect(canvas.width/2, 200);
      if (state.combo >= 5) createComboEffect(canvas.width/2, 100, state.combo);
      
      showFeedback('✨ PERFECT! ✨', true);
      awardXP(10);
    } else {
      state.streak = 0;
  state.combo = 0; if (window.HUD) window.HUD.counts.SAD++;
      showFeedback(`❌ ${correctAnswer}`, false);
      loseLife();
    }
    
    updateHUD();
    setTimeout(() => {
      state.hint = false;
      nextVocab();
    }, 1200);
  }
  
  // Kanji game implementation
  const KANJI_QUESTIONS = [
    {meaning:'Water', choices:['火','水','風','地'], answer:1},
    {meaning:'Tree', choices:['木','石','草','雨'], answer:0},
    {meaning:'Gold', choices:['金','土','銀','銅'], answer:0},
    {meaning:'Person', choices:['人','入','大','小'], answer:0},
    {meaning:'Day/Sun', choices:['月','木','日','目'], answer:2}
  ];
  
  function startKanji() {
    nextKanji();
  }
  
  function nextKanji() {
    state.hitboxes = [];
    const q = KANJI_QUESTIONS[Math.floor(Math.random() * KANJI_QUESTIONS.length)];
    const shuffled = q.choices.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const map = shuffled.map((c) => q.choices.indexOf(c));
    state.question = q;
    state.questionMeta = { shuffled, map };
    renderKanji();
  }
  
  function renderKanji() {
    pastelBG();
    drawHeader('漢 Kanji Master', 'Meaning → Kanji');
    
    // Meaning card
    roundRect(100, 130, canvas.width - 200, 140, 16);
    ctx.fillStyle = 'rgba(255,255,255,.95)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#b7d7ff';
    ctx.stroke();
    
    ctx.fillStyle = '#2b2b44';
    ctx.font = '700 48px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(state.question.meaning, canvas.width/2, 220);
    
    // Kanji choices
    const gridY = 300;
    const buttonW = 280;
    const buttonH = 120;
    const spacing = 20;
    const startX = (canvas.width - (buttonW * 2 + spacing)) / 2;
    
  const shuffled = state.questionMeta.shuffled;
  const shuffleMap = state.questionMeta.map;
    
    shuffled.forEach((choice, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const x = startX + col * (buttonW + spacing);
      const y = gridY + row * (buttonH + spacing);
      
      const isCorrect = shuffleMap[i] === state.question.answer;
      const style = state.hint && isCorrect ? { highlight: true } : {};
      
      // Draw button with larger kanji
      ctx.save();
      drawButton('', x, y, buttonW, buttonH, style);
      ctx.fillStyle = style.highlight ? '#ffffff' : '#2b2b44';
      ctx.font = '900 72px "Noto Sans JP", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(choice, x + buttonW/2, y + buttonH/2);
      ctx.restore();
      
      addHitbox(x, y, buttonW, buttonH, () => answerKanji(isCorrect, choice));
    });
    
    // Back button
    drawButton('← Back to Menu', 40, canvas.height - 60, 150, 40);
    addHitbox(40, canvas.height - 60, 150, 40, () => { state.mode = 'welcome'; drawWelcome(); });
  }
  
  function answerKanji(correct, answer) {
    const correctAnswer = state.question.choices[state.question.answer];
    
    if (correct) {
      state.score += 20;
      state.streak++;
      state.combo++;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  if (window.HUD) { window.HUD.score += 20; window.HUD.counts.COOL++; }
      
      createRingEffect(canvas.width/2, 200);
      if (state.combo >= 3) createComboEffect(canvas.width/2, 100, state.combo);
      
      showFeedback('✨ PERFECT! 正解! ✨', true);
      awardXP(20);
    } else {
      state.streak = 0;
  state.combo = 0; if (window.HUD) window.HUD.counts.SAD++;
      showFeedback(`❌ 正解: ${correctAnswer}`, false);
      loseLife();
    }
    
    updateHUD();
    setTimeout(() => {
      state.hint = false;
      nextKanji();
    }, 1200);
  }

  // ===== Canvas Controls (Reset • Hint • Next • New Word) =====
  function renderCanvasControls() {
    // bottom HUD bar to avoid clustering top-right
    const pad = 20;
    const bh = 36;
    const gap = 12;
    const labels = ['🔄 Reset', '💡 Hint', '⏭️ Next', '📖 New Word'];
    const actions = [
      () => { state.score = 0; state.streak = 0; state.combo = 0; updateHUD(); if (state.mode !== 'welcome') renderCurrentMode(); },
      () => { state.hint = true; renderCurrentMode(); },
      () => { if (state.mode === 'vocab') nextVocab(); else if (state.mode === 'kanji') nextKanji(); else if (state.mode === 'kotoba') nextKotoba(); else if (state.mode === 'miku-chat') nextMikuChat(); else if (state.mode === 'typing') nextTyping(); else if (state.mode === 'wod') nextWOD(); },
      () => { refreshWOD(); }
    ];
    const enabled = [true, state.mode !== 'welcome', state.mode !== 'welcome', true];
    const totalW = labels.length * 140 + (labels.length - 1) * gap;
    const startX = (canvas.width - totalW) / 2;
    const y = canvas.height - (bh + pad);
    for (let i = 0; i < labels.length; i++) {
      const x = startX + i * (140 + gap);
      ctx.save();
      ctx.globalAlpha = enabled[i] ? 1 : 0.5;
      drawButton(labels[i], x, y, 140, bh);
      ctx.restore();
      if (enabled[i]) addHitbox(x, y, 140, bh, actions[i]);
    }
  }
  
  // ===== Chat-style helpers (bubbles + text wrapping) =====
  function wrapText(text, x, y, maxWidth, lineHeight, font = '700 18px Nunito, sans-serif') {
    ctx.save();
    ctx.font = font;
    const words = String(text).split(/\s+/);
    let line = '';
    let yy = y;
    for (let n = 0; n < words.length; n++) {
      const test = line + words[n] + ' ';
      if (ctx.measureText(test).width > maxWidth && n > 0) {
        ctx.fillText(line, x, yy);
        line = words[n] + ' ';
        yy += lineHeight;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, x, yy);
    ctx.restore();
  }

  function drawBubble(text, x, y, w, h, role = 'miku') {
    ctx.save();
    roundRect(x, y, w, h, 14);
    // simple gradient substitute per role
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    if (role === 'miku') { grad.addColorStop(0, '#bde3ff'); grad.addColorStop(1, '#cff6e6'); }
    else { grad.addColorStop(0, '#ffd1ec'); grad.addColorStop(1, '#e6d1ff'); }
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = '#b7d7ff'; ctx.stroke();
    ctx.fillStyle = '#2b2b44';
    wrapText(text, x + 12, y + 12, w - 24, 22);
    ctx.restore();
  }

  // ===== Kotoba Chat (conversation practice) =====
  const KOTOBA_ROUNDS = [
    { jp: '「おはよう」って、どういう意味？', correct: 'Good morning', options: ['Good night', 'Good morning', 'See you', 'Excuse me'] },
    { jp: '「ごめんなさい」って、どういう意味？', correct: 'I am sorry', options: ['Please', 'I am sorry', 'Welcome', 'Cheers'] },
    { jp: '「お願いします」って、どういう意味？', correct: 'Please', options: ['Thanks', 'Please', 'Congrats', 'Nice to meet you'] }
  ];

  let kotobaCurrent = null;
  function startKotoba() {
    state.mode = 'kotoba';
    state.streak = 0; state.hint = false; state.hitboxes = [];
    nextKotoba();
  }
  function nextKotoba() {
    state.hitboxes = [];
    const base = KOTOBA_ROUNDS[Math.floor(Math.random() * KOTOBA_ROUNDS.length)];
    const opts = base.options.slice();
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    kotobaCurrent = { ...base, _opts: opts };
    renderKotoba();
  }
  function renderKotoba() {
    pastelBG();
    drawHeader('Kotoba Chat', 'What does this mean?');
    // Question bubble
    const qx = 60, qy = 120, qw = canvas.width - 120, qh = 90;
    drawBubble('日本語: ' + kotobaCurrent.jp, qx, qy, qw, qh, 'miku');
    // Options
  const baseY = qy + qh + 20; const bw = (canvas.width - 180) / 2; const bh = 64; const pad = 24;
  const opts = kotobaCurrent._opts;
    opts.forEach((opt, i) => {
      const row = Math.floor(i / 2); const col = i % 2;
      const x = 60 + col * (bw + pad); const y = baseY + row * (bh + pad);
      const highlight = state.hint && opt === kotobaCurrent.correct;
      drawBubble('あなた: ' + opt, x, y, bw, bh, 'user');
      if (highlight) {
        ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = '#a594f9'; roundRect(x, y, bw, bh, 14); ctx.stroke(); ctx.restore();
      }
      addHitbox(x, y, bw, bh, () => {
        const ok = opt === kotobaCurrent.correct;
  if (ok) { state.score += 8; state.streak++; if (window.HUD) { window.HUD.score += 8; window.HUD.counts.GREAT = (window.HUD.counts.GREAT||0)+1; } showFeedback('GREAT! 正解', true); }
  else { state.streak = 0; if (window.HUD) window.HUD.counts.SAD++; showFeedback('MISS! 正解: ' + kotobaCurrent.correct, false); }
        updateHUD(); setTimeout(nextKotoba, 700);
      });
    });
    // Back
    drawButton('← Back to Menu', 40, canvas.height - 60, 150, 40);
    addHitbox(40, canvas.height - 60, 150, 40, () => { state.mode = 'welcome'; drawWelcome(); });
  }

  // ===== Miku × Chat =====
  const MIKU_ROUNDS = [
    { prompt: '「こんにちは」って、どういう意味？', correct: 'Hello', opts: ['Hello', 'Goodbye', 'Thank you', 'Sorry'] },
    { prompt: '「さようなら」って、どういう意味？', correct: 'Goodbye', opts: ['Yes', 'No', 'Goodbye', 'Please'] },
    { prompt: '「ありがとう」って、どういう意味？', correct: 'Thank you', opts: ['Hello', 'Thank you', 'Sorry', 'See you'] }
  ];
  let mikuCurrent = null;
  function startMikuChat() {
    state.mode = 'miku-chat';
    state.streak = 0; state.hint = false; state.hitboxes = [];
    nextMikuChat();
  }
  function nextMikuChat() {
    state.hitboxes = [];
    const base = MIKU_ROUNDS[Math.floor(Math.random() * MIKU_ROUNDS.length)];
    const opts = base.opts.slice();
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    mikuCurrent = { ...base, _opts: opts };
    renderMikuChat();
  }
  function renderMikuChat() {
    pastelBG();
    drawHeader('Miku × Chat', 'Tap the correct reply');
    const qx = 60, qy = 120, qw = canvas.width - 120, qh = 90;
    drawBubble('ミク: ' + mikuCurrent.prompt, qx, qy, qw, qh, 'miku');
  const baseY = qy + qh + 20; const bw = (canvas.width - 180) / 2; const bh = 64; const pad = 24;
  const opts = mikuCurrent._opts;
    opts.forEach((opt, i) => {
      const row = Math.floor(i / 2); const col = i % 2;
      const x = 60 + col * (bw + pad); const y = baseY + row * (bh + pad);
      const highlight = state.hint && opt === mikuCurrent.correct;
      drawBubble('あなた: ' + opt, x, y, bw, bh, 'user');
      if (highlight) { ctx.save(); ctx.lineWidth = 3; ctx.strokeStyle = '#a594f9'; roundRect(x, y, bw, bh, 14); ctx.stroke(); ctx.restore(); }
      addHitbox(x, y, bw, bh, () => {
        const ok = opt === mikuCurrent.correct;
  if (ok) { state.score += 5; state.streak++; if (window.HUD) { window.HUD.score += 5; window.HUD.counts.GREAT = (window.HUD.counts.GREAT||0)+1; } showFeedback('GREAT! 正解だよ', true); }
  else { state.streak = 0; if (window.HUD) window.HUD.counts.SAD++; showFeedback('MISS! 正解: ' + mikuCurrent.correct, false); }
        updateHUD(); setTimeout(nextMikuChat, 750);
      });
    });
    drawButton('← Back to Menu', 40, canvas.height - 60, 150, 40);
    addHitbox(40, canvas.height - 60, 150, 40, () => { state.mode = 'welcome'; drawWelcome(); });
  }

  // ===== Typing (simple JP→romaji targets) =====
  const TYPING_TARGETS = [
    { label: 'こんにちは', target: 'konnichiwa' },
    { label: 'ありがとう', target: 'arigatou' },
    { label: 'さようなら', target: 'sayounara' },
    { label: 'すし', target: 'sushi' }
  ];
  function startTyping() {
    state.mode = 'typing'; state.hint = false; state.hitboxes = [];
    gameState.typing.text = ''; gameState.typing.wpm = 0; gameState.typing.accuracy = 100;
    nextTyping();
  }
  function nextTyping() {
    state.hitboxes = [];
    const pick = TYPING_TARGETS[Math.floor(Math.random() * TYPING_TARGETS.length)];
    gameState.typing.target = pick.target; gameState.typing.label = pick.label; gameState.typing.text = '';
    gameState.typing.startedAt = performance.now();
    renderTyping();
  }
  function handleTypingInput(e) {
    if (state.mode !== 'typing') return;
    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      gameState.typing.text += e.key.toLowerCase();
    } else if (e.key === 'Backspace') {
      gameState.typing.text = gameState.typing.text.slice(0, -1);
    } else if (e.key === 'Enter') {
      // skip
      nextTyping();
      return;
    }
    const target = gameState.typing.target;
    const typed = gameState.typing.text;
    let correctSoFar = 0;
    for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correctSoFar++;
    const acc = typed.length ? Math.round((correctSoFar / typed.length) * 100) : 100;
    gameState.typing.accuracy = acc;
    // complete
    if (typed === target) {
      const elapsedMin = (performance.now() - gameState.typing.startedAt) / 60000;
      const wpm = Math.max(1, Math.round(target.length / 5 / Math.max(0.2, elapsedMin)));
      gameState.typing.wpm = wpm;
  state.score += 12; state.streak++; if (window.HUD) { window.HUD.score += 12; window.HUD.counts.GREAT = (window.HUD.counts.GREAT||0)+1; }
  showFeedback(`CLEARED! WPM ${wpm}`, true);
      updateHUD(); setTimeout(nextTyping, 600);
    } else {
      renderTyping();
    }
  }
  function renderTyping() {
    pastelBG(); drawHeader('JP Typing', 'Type romaji for the word');
    // Target panel
    roundRect(80, 120, canvas.width - 160, 120, 14); ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fill(); ctx.strokeStyle = '#b7d7ff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#2b2b44'; ctx.font = '900 56px "Noto Sans JP", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(gameState.typing.label || '—', canvas.width/2, 180);
    // Input panel
    roundRect(160, 280, canvas.width - 320, 80, 12); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#b7d7ff'; ctx.stroke();
    const typed = gameState.typing.text || '';
    ctx.font = '700 28px ui-monospace, monospace'; ctx.fillStyle = '#596286'; ctx.textAlign = 'left'; ctx.fillText(typed, 180, 330);
    // Ghost target
    ctx.globalAlpha = 0.25; ctx.fillStyle = '#2b2b44'; ctx.fillText(gameState.typing.target || '', 180, 330); ctx.globalAlpha = 1;
    // Stats
    ctx.textAlign = 'center'; ctx.font = '700 16px Nunito, sans-serif'; ctx.fillStyle = '#596286';
    ctx.fillText(`Accuracy: ${gameState.typing.accuracy}%`, canvas.width/2, 400);
    ctx.fillText(`WPM: ${gameState.typing.wpm}`, canvas.width/2, 426);
    // Back
    drawButton('← Back to Menu', 40, canvas.height - 60, 150, 40);
    addHitbox(40, canvas.height - 60, 150, 40, () => { state.mode = 'welcome'; drawWelcome(); });
  }

  // ===== WOD Deep Study (single-card + quick quiz) =====
  const WOD_Treats = ['love', 'friend', 'car', 'food', 'music', 'sky', 'flower', 'river'];
  function startWODStudy() {
    state.mode = 'wod'; state.hint = false; state.hitboxes = [];
    ensureWodMeta();
    renderWODStudy();
  }
  function nextWOD() { ensureWodMeta(); renderWODStudy(); }
  function wodKeyOf(w) { return `${w.word||''}|${w.reading||''}|${w.meaning||''}`; }
  function ensureWodMeta() {
    const w = gameState.wod || {};
    const key = wodKeyOf(w);
    if (gameState._wodKey === key && Array.isArray(gameState._wodOptions)) return;
    const options = [];
    if (w.meaning) options.push(w.meaning);
    while (options.length < 4) {
      const d = WOD_Treats[Math.floor(Math.random() * WOD_Treats.length)];
      if (!options.includes(d)) options.push(d);
    }
    const shuffled = options.slice();
    for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; }
    gameState._wodOptions = shuffled;
    gameState._wodKey = key;
  }
  function renderWODStudy() {
    pastelBG();
    const w = gameState.wod || {};
    drawHeader('WOD Study', 'Know today\'s word?');
    // WOD card
    roundRect(80, 120, canvas.width - 160, 140, 16); ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fill(); ctx.strokeStyle = '#b7d7ff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#2b2b44'; ctx.font = '900 64px "Noto Sans JP", sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(w.word || w.reading || '—', 100, 190);
    ctx.font = '700 22px Nunito, sans-serif'; ctx.fillStyle = '#596286';
    if (w.reading) ctx.fillText(w.reading, 100, 220);
    if (w.meaning) ctx.fillText('Meaning: ' + w.meaning, 400, 190);
    // Quiz
    state.hitboxes = [];
    const baseY = 300; const buttonW = 260; const buttonH = 64; const spacing = 20; const startX = (canvas.width - (buttonW * 2 + spacing)) / 2;
  ensureWodMeta();
  const shuffled = gameState._wodOptions || [];
    shuffled.forEach((opt, i) => {
      const row = Math.floor(i / 2); const col = i % 2; const x = startX + col * (buttonW + spacing); const y = baseY + row * (buttonH + spacing);
      const correct = (opt === w.meaning);
      const style = state.hint && correct ? { highlight: true } : {};
      drawButton(opt, x, y, buttonW, buttonH, style);
      addHitbox(x, y, buttonW, buttonH, () => {
  if (correct) { state.score += 6; state.streak++; if (window.HUD) { window.HUD.score += 6; window.HUD.counts.FINE = (window.HUD.counts.FINE||0)+1; } showFeedback('Yay! ✨', true); }
  else { state.streak = 0; if (window.HUD) window.HUD.counts.SAD++; showFeedback('Nope! ' + (w.meaning || ''), false); }
        updateHUD(); setTimeout(() => { state.hint = false; refreshWOD(); }, 700);
      });
    });
    // Back
    drawButton('← Back to Menu', 40, canvas.height - 60, 150, 40);
    addHitbox(40, canvas.height - 60, 150, 40, () => { state.mode = 'welcome'; drawWelcome(); });
  }

  // Helper functions for visual effects, HUD, etc.
  function createRingEffect(x, y) {
    if (window.createRingEffect) {
      const effect = window.createRingEffect(x, y);
      if (effect) state.effects.push(effect);
    }
  }
  
  function createComboEffect(x, y, combo) {
    if (window.createComboMilestoneEffect) {
      const effect = window.createComboMilestoneEffect(x, y, combo);
      if (effect) state.effects.push(effect);
    }
  }
  
  function showFeedback(text, isCorrect) {
    state.feedback = {
      text,
      isCorrect,
      alpha: 1,
      startTime: Date.now()
    };
  }
  
  function renderFeedback() {
    if (!state.feedback) return;
    
    const elapsed = Date.now() - state.feedback.startTime;
    if (elapsed > 1200) {
      state.feedback = null;
      return;
    }
    
    ctx.save();
    ctx.globalAlpha = Math.max(0, state.feedback.alpha - elapsed / 1200);
    
    roundRect(canvas.width/2 - 200, 50, 400, 80, 20);
    ctx.fillStyle = state.feedback.isCorrect ? 
      'linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)' : 
      'linear-gradient(135deg, #ff4757 0%, #c44569 100%)';
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 24px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.feedback.text, canvas.width/2, 90);
    
    ctx.restore();
  }
  
  function updateHUD() {
    // Nothing to sync outside canvas
  }
  
  function awardXP(amount) {
    state.xp += amount;
    if (window.addXP) window.addXP(amount);
  }
  
  function loseLife() {
    state.lives = Math.max(0, state.lives - 1);
    if (window.loseLife) window.loseLife();
  }
  
  function updateParticles() {
    state.particles = state.particles.filter(p => {
      p.update();
      return p.life > 0;
    });
  }
  
  function updateEffects() {
    state.effects = state.effects.filter(e => {
      if (e.update) e.update();
      return e.active !== false;
    });
  }
  
  function renderEffects() {
    state.effects.forEach(effect => {
      if (effect.render) effect.render(ctx);
    });
    
    state.particles.forEach(particle => {
      if (particle.render) particle.render(ctx);
    });
  }
  
  // WOD refresh function
  async function refreshWOD() {
    try {
      if (window.WOD && (window.WOD.word || window.WOD.reading || window.WOD.meaning)) {
        gameState.wod = window.WOD;
        if (state.mode === 'welcome') drawWelcome(); else if (state.mode === 'wod') renderWODStudy();
        return;
      }
      const page = Math.floor(Math.random() * 50) + 1;
      const url = `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
      
      const fetchJson = async (u) => {
        try {
          const r = await fetch(u, { cache: "no-store" });
          if (r.ok) return await r.json();
        } catch (_) {}
        try {
          const rr = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(u)}`);
          if (rr.ok) {
            const jj = await rr.json();
            if (jj && jj.contents) return JSON.parse(jj.contents);
          }
        } catch (_) {}
        return null;
      };
      
      const json = await fetchJson(url);
      const arr = Array.isArray(json?.data) ? json.data : [];
      if (arr.length) {
        const pick = arr[Math.floor(Math.random() * arr.length)];
        gameState.wod = {
          word: (pick.japanese && (pick.japanese[0].word || pick.japanese[0].reading)) || "",
          reading: (pick.japanese && pick.japanese[0].reading) || "",
          meaning: (pick.senses && pick.senses[0]?.english_definitions?.[0]) || ""
        };
        if (state.mode === 'welcome') drawWelcome();
      }
    } catch (e) {
      console.warn("WOD refresh failed:", e);
    }
  }
  
  // Session is managed by HUD.Session via game start events
  
  // Beatpad input handling
  function handleBeatpadInput(e) {
    const keyMap = { 'KeyW': 'vocab', 'KeyD': 'miku-chat', 'KeyS': 'kotoba', 'KeyA': 'kanji', 'KeyQ': 'typing', 'KeyE': 'wod' };
    if (state.mode === 'welcome' && keyMap[e.code]) {
      e.preventDefault();
      startMode(keyMap[e.code]);
    }
  }
  
    // Main animation loop  
  // Initialize when DOM is ready
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initCanvas);
    } else {
      initCanvas();
    }
  }
  
  // Load current singer for avatar
  function tryLoadSinger() {
    try {
      const url = localStorage.getItem('singer.current') || '';
      if (!url || url === singerUrl) return;
      singerUrl = url;
      singerImg = new Image();
      singerImg.crossOrigin = 'anonymous';
      singerImg.src = url;
    } catch (_) {}
  }

  init();
})();
