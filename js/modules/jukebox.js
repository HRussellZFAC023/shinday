// Jukebox module: hit Miku songs + unlocking by level
(function(){
  const PRESETS = {
    easy:    { key:'easy',    label:'Easy',    options:4, baseTime:18, travelMs:2400, judge:{cool:180, great:260, fine:340} },
    normal:  { key:'normal',  label:'Normal',  options:4, baseTime:15, travelMs:2000, judge:{cool:150, great:230, fine:300} },
    hard:    { key:'hard',    label:'Hard',    options:6, baseTime:12, travelMs:1600, judge:{cool:120, great:180, fine:260} },
    extreme: { key:'extreme', label:'Extreme', options:8, baseTime:10, travelMs:1200, judge:{cool:90,  great:150, fine:220} }
  };
  // Default local BGM card
  function defaultSongs(){
    return [{
      id:'default-bgm', title:'Default BGM', bpm:120, req:0,
      audio:'./assets/background.ogg', fallback:'./assets/bgm.ogg',
      jacket:'./assets/pt_top.png', theme:'#66bbff',
      recommend:{ game:'vocab', direction:'jp-en' }
    }];
  }

  function gachaSongs(){
    try{
      const coll = JSON.parse(localStorage.getItem('gacha.collection')||'{}');
      const list=[];
      for(const url in coll){
        const meta = typeof window.getMikuMeta==='function'? window.getMikuMeta(url,true):null;
        if(meta && meta.song){
          const m = meta.song.match(/(?:v=|be\/)([a-zA-Z0-9_-]{11})/);
          const vid = m? m[1]:'';
          list.push({ id:`miku-${meta.id}`, title:meta.name, yt:vid, bpm:120, req:0, jacket:`./assets/pixel-miku/${meta.filename}`, theme:'#66bbff' });
        }
      }
      return list;
    }catch(_){return [];} 
  }
  function allSongs(){ return defaultSongs().concat(gachaSongs()); }
  let SONGS = allSongs();
  function refresh(){ SONGS = allSongs(); try{ if (window.Jukebox) window.Jukebox.songs = SONGS; }catch(_){} return SONGS; }
  function unlocked(){ return refresh(); }

  function ensurePlayer(){
    const existing = document.getElementById('jukeboxPlayer');
    if (existing) return existing;
    const wrap = document.createElement('div');
    wrap.id = 'jukeboxPlayer';
    wrap.style.cssText = 'position:fixed;right:16px;bottom:16px;width:360px;z-index:9999;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);border:2px solid var(--border);border-radius:14px;box-shadow:0 10px 30px rgba(43,43,68,.25)';
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-bottom:1px solid var(--border)">
        <div style="font-weight:900">🎵 Miku Jukebox • <span id="jukeboxNow">Ready</span></div>
        <button id="jukeboxClose" class="pixel-btn" style="padding:4px 8px">✖</button>
      </div>
      <div style="width:100%;aspect-ratio:16/9;overflow:hidden;background:#000;border-bottom-left-radius:12px;border-bottom-right-radius:12px">
  <iframe id="jukeboxIframe" style="width:100%;height:100%;border:0;display:block" src="about:blank" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>`;
    document.body.appendChild(wrap);
    document.getElementById('jukeboxClose').onclick = () => {
      try{ document.getElementById('jukeboxIframe').src='about:blank'; }catch(_){ }
      wrap.style.display='none';
      try{ if (window.__resumeBgm) window.__resumeBgm(); }catch(_){ }
    };
    return wrap;
  }

  function play(song){
    if (!song) return;
    const wrap = ensurePlayer();
    const iframe = document.getElementById('jukeboxIframe');
    const now = document.getElementById('jukeboxNow');
    // Theme accent
    try { if (song.theme) document.documentElement.style.setProperty('--jukebox-accent', song.theme); } catch(_){}
    // Sync rhythm
    try { window.__rhythmBpm = song.bpm|0; localStorage.setItem('rhythm.bpm', String(window.__rhythmBpm)); } catch(_){ }
    try { window.__rhythmMet = true; localStorage.setItem('rhythm.met','1'); } catch(_){ }
    if (song.audio){
      // Use site BGM, no mini-player
      try{
        if (iframe) iframe.src = 'about:blank';
        if (wrap) wrap.style.display = 'none';
        if (window.AudioMod && typeof AudioMod.setBgmSource==='function'){
          AudioMod.setBgmSource(song.audio, song.fallback || './assets/bgm.ogg');
        }
        // Resume bgm
        if (window.__resumeBgm) window.__resumeBgm(); else if (window.AudioMod && AudioMod.ensureBgm) { const a=AudioMod.ensureBgm(); try{a.play().catch(()=>{});}catch(_){}};
      }catch(_){ }
    } else if (song.yt){
      // Pause bgm and show mini-player
      try { if (window.__pauseBgm) window.__pauseBgm(); } catch(_){}
      const vid = song.yt || '';
      const url = `https://www.youtube.com/embed/${encodeURIComponent(vid)}?autoplay=1&rel=0&playsinline=1&modestbranding=1&color=white`;
      if (iframe) iframe.src = url;
      if (wrap) wrap.style.display = 'block';
    }
    if (now) now.textContent = song.title;
  }

  function attachHudSelect(){
    refresh();
    const hud = document.querySelector('#jpHudWidget .jp-hud-widget');
    if (!hud || hud.querySelector('#jukeboxOpen')) return;
    const wrap = document.createElement('div');
    wrap.className = 'hud-line';
    const current = getCurrentSong();
    wrap.innerHTML = `
      <strong>🎶 Song:</strong>
      <span id="jukeboxCurrent" style="font-weight:800;color:#596286">${current ? current.title : 'None'}</span>
      <div class="spacer"></div>
      <button id="jukeboxOpen" class="pixel-btn">Song Select…</button>`;
    hud.appendChild(wrap);
    wrap.querySelector('#jukeboxOpen').onclick = openSongSelect;
    // Theme accent hook
    try{
      const s = current; if (s && s.theme){
        document.documentElement.style.setProperty('--jukebox-accent', s.theme);
      }
    }catch(_){ }
  }

  function getCurrentSong(){
    try{ const id = localStorage.getItem('jukebox.song') || ''; return refresh().find(s=>s.id===id) || null; }catch(_){ return null; }
  }

  function saveSelection(song, preset){
    try{ localStorage.setItem('jukebox.song', song.id); }catch(_){ }
    try{ localStorage.setItem('jukebox.preset', preset.key); }catch(_){ }
    // apply to runtime
    try{ window.__rhythmBpm = song.bpm|0; localStorage.setItem('rhythm.bpm', String(window.__rhythmBpm)); }catch(_){ }
    try{ window.__rhythmMet = true; localStorage.setItem('rhythm.met','1'); }catch(_){ }
    try{ localStorage.setItem('rhythm.travel', String(preset.travelMs)); }catch(_){ }
  }

  function getPreset(){
    try{ const key = localStorage.getItem('jukebox.preset') || 'normal'; return PRESETS[key] || PRESETS.normal; }catch(_){ return PRESETS.normal; }
  }

  function openSongSelect(){
    let ov = document.getElementById('songSelectOverlay');
    if (!ov){
      ov = document.createElement('div');
      ov.id = 'songSelectOverlay';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;z-index:10000;';
      const list = refresh();
      const grid = list.map(s => {
        const jacket = s.jacket || './assets/root.png';
        const tip = `BPM ${s.bpm}`;
        return `
        <div class="song-tile" data-id="${s.id}" title="${tip}" style="position:relative;border:2px solid var(--border);border-radius:12px;overflow:hidden;background:#fff;cursor:pointer">
          <img src="${jacket}" alt="${s.title}" style="width:100%;height:120px;object-fit:cover;display:block" />
          <div style="padding:8px;font-weight:800;color:#2b2b44">${s.title}</div>
        </div>`
      }).join('');
      ov.innerHTML = `
        <div class="song-panel" style="background:#fff;border:3px solid var(--border);border-radius:14px;box-shadow:var(--shadow);width:min(820px,95vw);max-height:90vh;overflow:auto;padding:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
            <h3 style="margin:0">Song Select</h3>
            <button id="songClose" class="pixel-btn">✕</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-bottom:10px">${grid}</div>
          <div style="display:flex;gap:8px;align-items:center;justify-content:flex-end">
            <label style="font-weight:800">Preset:</label>
            <select id="songPreset" class="pixel-btn">
              <option value="easy">Easy</option>
              <option value="normal" selected>Normal</option>
              <option value="hard">Hard</option>
              <option value="extreme">Extreme</option>
            </select>
            <button id="songPlay" class="pixel-btn">Play ▶</button>
            <button id="songStartRecommended" class="pixel-btn">Start Recommended ⭐</button>
          </div>
        </div>`;
      document.body.appendChild(ov);
  ov.addEventListener('click',(e)=>{ if(e.target===ov) ov.remove(); });
  document.addEventListener('keydown', function escClose(e){ if(e.key==='Escape'){ ov.remove(); document.removeEventListener('keydown', escClose);} });
      ov.querySelector('#songClose').onclick = ()=> ov.remove();
        ov.__selected = list.find(s=>s.id===(localStorage.getItem('jukebox.song')||'')) || list[0];
      ov.addEventListener('click',(e)=>{
        const t = e.target.closest('.song-tile');
        if (!t) return;
        const s = list.find(x=>x.id===t.getAttribute('data-id'));
        if (!s) return;
        ov.__selected = s;
        // Visual focus
        ov.querySelectorAll('.song-tile').forEach(el=>el.style.outline='none');
        t.style.outline = '3px solid var(--accent)';
      });
      ov.querySelector('#songPlay').onclick = ()=>{
        const s = ov.__selected || list[0];
        const keyPerSong = `jukebox.preset.${s.id}`;
        const pKey = ov.querySelector('#songPreset').value || localStorage.getItem(keyPerSong) || 'normal';
        const preset = PRESETS[pKey] || PRESETS.normal;
        try { localStorage.setItem(keyPerSong, preset.key); } catch(_){ }
        saveSelection(s, preset);
        play(s);
        // Apply recommended settings
        try {
          if (s.recommend) {
            if (s.recommend.game === 'vocab' && s.recommend.direction)
              localStorage.setItem('vocab.direction', s.recommend.direction);
            if (s.recommend.game === 'kanji' && s.recommend.mode)
              localStorage.setItem('kanji.mode', s.recommend.mode);
            localStorage.setItem('preferred.game', s.recommend.game);
          }
        } catch(_){}
        const cur = document.getElementById('jukeboxCurrent'); if (cur) cur.textContent = s.title;
        ov.remove();
      };
      ov.querySelector('#songStartRecommended').onclick = ()=>{
        const s = ov.__selected || list[0];
        const pKey = ov.querySelector('#songPreset').value || 'normal';
        const preset = PRESETS[pKey] || PRESETS.normal;
        saveSelection(s, preset);
        play(s);
        try{
          const game = (s.recommend && s.recommend.game) || 'vocab';
          const timed = localStorage.getItem(game+'.timed')==='1';
          if (game==='vocab') {
            if (s.recommend && s.recommend.direction)
              localStorage.setItem('vocab.direction', s.recommend.direction);
            window.__startSong && window.__startSong('vocab', localStorage.getItem('vocab.direction')||'jp-en', timed);
          } else if (game==='kanji') {
            if (s.recommend && s.recommend.mode)
              localStorage.setItem('kanji.mode', s.recommend.mode);
            window.__startSong && window.__startSong('kanji', localStorage.getItem('kanji.mode')||'meaning', timed);
          } else {
            window.__startSong && window.__startSong('kotoba');
          }
          ov.remove();
        }catch(_){ ov.remove(); }
      };
    } else {
      document.body.appendChild(ov);
    }
  }

  window.Jukebox = { songs: SONGS, unlocked, play, attachHudSelect, openSongSelect, getPreset, refresh };
})();
