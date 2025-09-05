// Jukebox module: hit Miku songs + unlocking by level
(function(){
  const PRESETS = {
    easy:    { key:'easy',    label:'Easy',    options:4, baseTime:18, travelMs:2400, judge:{cool:180, great:260, fine:340} },
    normal:  { key:'normal',  label:'Normal',  options:4, baseTime:15, travelMs:2000, judge:{cool:150, great:230, fine:300} },
    hard:    { key:'hard',    label:'Hard',    options:6, baseTime:12, travelMs:1600, judge:{cool:120, great:180, fine:260} },
    extreme: { key:'extreme', label:'Extreme', options:8, baseTime:10, travelMs:1200, judge:{cool:90,  great:150, fine:220} }
  };
  const songs = [
    { id:'senbonzakura',   title:'千本桜 (Senbonzakura)',         yt:'Mqpsf84m_b0', bpm:154, req:1, jacket:'./assets/pixel-miku/18 Senbonzakura Miku.png', theme:'#00aa88', recommend:{game:'kanji', mode:'meaning'} },
    { id:'world-is-mine',  title:'ワールドイズマイン (World is Mine)', yt:'R7gUdbH0Le8', bpm:150, req:2, jacket:'./assets/pixel-miku/Hatsune Miku @illufinch 17.png', theme:'#ff66aa', recommend:{game:'vocab', direction:'jp-en'} },
    { id:'tell-your-world',title:'Tell Your World',               yt:'PqJNc9KVIZE', bpm:128, req:3, jacket:'./assets/pixel-miku/Hatsune Miku @illufinch 16.png', theme:'#66bbff', recommend:{game:'vocab', direction:'en-jp'} },
    { id:'rolling-girl',   title:'ローリンガール (Rolling Girl)',   yt:'9wSx-sLkGm4', bpm:135, req:4, jacket:'./assets/pixel-miku/Hatsune Miku @illufinch 19.png', theme:'#4444aa', recommend:{game:'kanji', mode:'reading'} },
    { id:'meltdown',       title:'メルト (Melt)',                  yt:'FMD6-5qWCSM', bpm:180, req:5, jacket:'./assets/pixel-miku/15 Ghost Rule miku.png', theme:'#ffaa00', recommend:{game:'vocab', direction:'jp-en'} },
    { id:'romeo-cinderella',title:'ロミオとシンデレラ',            yt:'n4gC7gqFCvM', bpm:170, req:6, jacket:'./assets/pixel-miku/11.png', theme:'#cc66ff', recommend:{game:'vocab', direction:'en-jp'} },
    { id:'love-is-war',    title:'恋は戦争 (Love is War)',         yt:'AgA2wE8xmFQ', bpm:160, req:7, jacket:'./assets/pixel-miku/12 The Intense Voice of Hatsune Miku (Infinity module).png', theme:'#ff4444', recommend:{game:'kanji', mode:'reading'} },
    { id:'popipo',         title:'ぽっぴっぽー (PoPiPo)',          yt:'cQKGUgOfD8U', bpm:140, req:8, jacket:'./assets/pixel-miku/07 Uniform (Seifuku) miku.png', theme:'#22cc22', recommend:{game:'kotoba'} },
    { id:'weekender-girl', title:'Weekender Girl',                 yt:'0u9P4kzT0W8', bpm:128, req:9, jacket:'./assets/pixel-miku/Hatsune Miku @illufinch 22.png', theme:'#00bcd4', recommend:{game:'vocab', direction:'jp-en'} }
  ];

  function level(){ return (window.Progression && Progression.getLevel()) || parseInt(localStorage.getItem('study.level')||'1',10) || 1; }
  function unlocked(){ const lvl = level(); return songs.filter(s => s.req <= lvl); }

  function ensurePlayer(){
    if (document.getElementById('jukeboxPlayer')) return;
    const wrap = document.createElement('div');
    wrap.id = 'jukeboxPlayer';
    wrap.style.cssText = 'position:fixed;right:16px;bottom:16px;width:360px;z-index:9999;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);border:2px solid var(--border);border-radius:14px;box-shadow:0 10px 30px rgba(43,43,68,.25)';
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-bottom:1px solid var(--border)">
        <div style="font-weight:900">🎵 Miku Jukebox • <span id="jukeboxNow">Ready</span></div>
        <button id="jukeboxClose" class="pixel-btn" style="padding:4px 8px">✖</button>
      </div>
      <div style="width:100%;aspect-ratio:16/9;overflow:hidden;background:#000;border-bottom-left-radius:12px;border-bottom-right-radius:12px">
        <iframe id="jukeboxIframe" style="width:100%;height:100%;border:0;display:block" src="about:blank" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>`;
    document.body.appendChild(wrap);
    document.getElementById('jukeboxClose').onclick = () => { document.getElementById('jukeboxIframe').src='about:blank'; wrap.style.display='none'; };
  }

  function play(song){
    ensurePlayer();
    const iframe = document.getElementById('jukeboxIframe');
    const now = document.getElementById('jukeboxNow');
    if (!song) return;
    const vid = song.yt || '';
    const url = vid ? `https://www.youtube.com/embed/${encodeURIComponent(vid)}?autoplay=1&rel=0&playsinline=1&modestbranding=1&color=white` : `about:blank`;
    iframe.src = url;
    if (now) now.textContent = song.title;
    // Apply theme accent for HUD/results
    try {
      if (song.theme) {
        document.documentElement.style.setProperty('--accent', song.theme);
        document.documentElement.style.setProperty('--accent-2', song.theme);
      }
    } catch(_){}
    // Sync rhythm BPM to song
    try { window.__rhythmBpm = song.bpm|0; localStorage.setItem('rhythm.bpm', String(window.__rhythmBpm)); } catch(_){}
    try { window.__rhythmMet = true; localStorage.setItem('rhythm.met','1'); } catch(_){}
  }

  function attachHudSelect(){
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
        document.documentElement.style.setProperty('--accent', s.theme);
        document.documentElement.style.setProperty('--accent-2', s.theme);
      }
    }catch(_){ }
  }

  function getCurrentSong(){
    try{ const id = localStorage.getItem('jukebox.song') || ''; return songs.find(s=>s.id===id) || null; }catch(_){ return null; }
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
      const grid = songs.map(s => {
        const locked = level() < s.req;
        const jacket = s.jacket || './assets/root.png';
        const tip = locked ? `Reach Lv ${s.req} to unlock` : `BPM ${s.bpm}`;
        return `
        <div class="song-tile ${locked?'locked':''}" data-id="${s.id}" title="${tip}" style="position:relative;border:2px solid var(--border);border-radius:12px;overflow:hidden;background:#fff;cursor:${locked?'not-allowed':'pointer'}">
          <img src="${jacket}" alt="${s.title}" style="width:100%;height:120px;object-fit:cover;display:block" />
          <div style="padding:8px;font-weight:800;color:#2b2b44">${s.title}</div>
          ${locked?`<div style=\"position:absolute;inset:0;background:rgba(255,255,255,.8);display:flex;align-items:center;justify-content:center;font-weight:900;color:#596286\">🔒 Lv ${s.req}</div>`:''}
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
      ov.querySelector('#songClose').onclick = ()=> ov.remove();
      ov.__selected = songs.find(s=>level()>=s.req) || songs[0];
      ov.addEventListener('click',(e)=>{
        const t = e.target.closest('.song-tile');
        if (!t) return;
        const s = songs.find(x=>x.id===t.getAttribute('data-id'));
        if (!s) return;
        if (level() < s.req) return; // locked
        ov.__selected = s;
        // Visual focus
        ov.querySelectorAll('.song-tile').forEach(el=>el.style.outline='none');
        t.style.outline = '3px solid var(--accent)';
      });
      ov.querySelector('#songPlay').onclick = ()=>{
        const s = ov.__selected || songs[0];
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
        const s = ov.__selected || songs[0];
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

  window.Jukebox = { songs, unlocked, play, attachHudSelect, openSongSelect, getPreset };
})();
