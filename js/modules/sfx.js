// SFX engine extracted from main.js — attaches window.SFX
(function initSfxEngine(){
  if (window.SFX) return; // already present
  const BASE = "./assets/SFX";
  const p = (sub) => `${BASE}/${sub}`;
  const MAP = {
    "ui.move":[p("menu sounds/menu cursor move.wav"),p("menu sounds/menu cursor move (except this time there's three of them and it's slightly louder).wav"),p("menu sounds/se_sy_00.wav")],
    "ui.select":[p("menu sounds/menu option select.wav")],
    "ui.back":[p("menu sounds/pop-up close.wav"),p("menu sounds/menu change.wav")],
    "ui.change":[p("menu sounds/module change 1.wav"),p("menu sounds/module change 2.wav")],
    "ui.unavailable":[p("menu sounds/unavailable.wav")],
    "ui.teleport":[p("menu sounds/song selection teleport.wav")],
    "ui.scoreTally":[p("menu sounds/score tally.wav")],
    "ui.se_sy_24":[p("menu sounds/se_sy_24.wav")],
    "hearts.click":[p("other sounds/click.wav"),p("other sounds/se_sy_09.wav")],
    "hearts.add":[p("other sounds/se_sy_15.wav"),p("other sounds/se_sy_18.wav"),p("menu sounds/score tally.wav")],
    "hearts.milestone":[p("misc other voice clips/(miku) yay.wav"),p("other sounds/clap.wav")],
    "gacha.roll":[p("menu sounds/song selection teleport.wav")],
    "gacha.reveal":[p("menu sounds/module change 1.wav"),p("menu sounds/module change 2.wav")],
    "gacha.pop":[p("button sounds+percussion/1.wav")],
    "gacha.high":[p("menu sounds/result (clear).wav"),p("result voice clips/miku/perfect.wav")],
    "gacha.mid":[p("result voice clips/miku/great.wav")],
    "gacha.low":[p("menu sounds/result (not clear).wav"),p("result voice clips/miku/standard.wav")],
    "gacha.fail":[p("result voice clips/miku/missXtake.wav")],
    "memory.flip":[p("menu sounds/menu cursor move.wav")],
    "memory.match":[p("menu sounds/menu option select.wav")],
    "memory.win":[p("menu sounds/result (clear).wav")],
    "memory.miss":[p("menu sounds/unavailable.wav")],
    "memory.tick":[p("other sounds/sonar beeps 1.wav"),p("other sounds/sonar beeps 2.wav")],
    "quiz.ok":[p("menu sounds/menu option select.wav"),p("misc other voice clips/(miku) yay.wav")],
    "quiz.bad":[p("menu sounds/unavailable.wav"),p("misc other voice clips/(miku) sad.wav")],
    "quiz.tick":[p("other sounds/sonar beeps 1.wav"),p("other sounds/sonar beeps 2.wav")],
    "quiz.timeup":[p("other sounds/se_ev_20.wav")],
    "result.perfect":[p("result voice clips/miku/perfect.wav"),p("result voice clips/len/perfect.wav"),p("result voice clips/rin/perfect.wav")],
    "result.great":[p("result voice clips/miku/great.wav"),p("result voice clips/len/great.wav"),p("result voice clips/rin/great.wav")],
    "result.standard":[p("result voice clips/miku/standard.wav"),p("result voice clips/len/standard.wav"),p("result voice clips/rin/standard.wav")],
    "result.cheap":[p("result voice clips/miku/cheap.wav"),p("result voice clips/len/cheap.wav"),p("result voice clips/rin/cheap.wav")],
    "result.miss":[p("result voice clips/miku/missXtake.wav"),p("result voice clips/len/missXtake.wav"),p("result voice clips/rin/missXtake.wav")],
    "extra.camera":[p("other sounds/camera.wav")],
    "extra.clap":[p("other sounds/clap.wav")],
    "extra.kick":[p("other sounds/kick.wav")],
    "extra.coin":[p("other sounds/mr_0100000.wav")],
    "extra.fx1":[p("other sounds/se_ev_01.wav")],
    "extra.fx2":[p("other sounds/se_ev_17.wav")],
    "extra.sona":[p("misc other voice clips/(miku) sona.wav")],
    "extra.yo":[p("misc other voice clips/(miku) yo.wav"),p("misc other voice clips/(rin) yo.wav")],
    "extra.wan":[p("misc other voice clips/(rin) wan.wav")],
    "extra.thanks":[p("misc other voice clips/(miku) thank you for playing!.wav")],
    "sega.tag":[p("sega voice clips/sega (solo).wav"),p("sega voice clips/sega (chorus).wav"),p("sega voice clips/sega (shout).wav")],
    "foot.step":[p("footstep sounds/se_ev_05_01.wav"),p("footstep sounds/se_ev_05_02.wav"),p("footstep sounds/se_ev_06_01.wav"),p("footstep sounds/se_ev_06_02.wav"),p("footstep sounds/se_ev_07_01.wav"),p("footstep sounds/se_ev_07_02.wav"),p("footstep sounds/se_ev_08_01.wav"),p("footstep sounds/se_ev_08_02.wav"),p("footstep sounds/se_ev_14.wav")],
    "swallow.swoop":[p("other sounds/se_ev_17.wav"),p("menu sounds/song selection teleport.wav")],
    "swallow.chomp":[p("other sounds/se_sy_09.wav"),p("other sounds/click.wav")]
  };
  const ctxState = { ctx:null, master:null, enabled:true, volume:0.6 };
  const buffers = new Map();
  const lastPlayAt = Object.create(null);
  const minInterval = { "foot.step":260, "ui.move":60, "swallow.swoop":900, "swallow.chomp":180 };
  function ensureCtx(){
    if (!ctxState.ctx){
      try{
        ctxState.ctx = new (window.AudioContext||window.webkitAudioContext)();
        ctxState.master = ctxState.ctx.createGain();
        ctxState.master.gain.value = ctxState.volume;
        ctxState.master.connect(ctxState.ctx.destination);
        const unlock=()=>{ if (!ctxState.ctx) return; if (ctxState.ctx.state==='suspended') ctxState.ctx.resume(); window.removeEventListener('pointerdown',unlock); };
        window.addEventListener('pointerdown', unlock);
      }catch(_){ }
    }
    return ctxState.ctx;
  }
  function loadBuffer(path){ if (buffers.has(path)) return buffers.get(path); const ctx=ensureCtx(); if(!ctx) return Promise.resolve(null); const prom=fetch(path).then(r=>r.arrayBuffer()).then(ab=>new Promise((res,rej)=>ctx.decodeAudioData(ab,res,rej))).catch(()=>null); buffers.set(path,prom); return prom; }
  async function playPath(path,{volume=1,rate=1,detune=0,pan=0}={}){ if(!ctxState.enabled) return; const ctx=ensureCtx(); if(!ctx) return; const buf=await loadBuffer(path); if(!buf) return; const src=ctx.createBufferSource(); const g=ctx.createGain(); const pnn=ctx.createStereoPanner?ctx.createStereoPanner():null; src.buffer=buf; if(src.detune) src.detune.value=detune; src.playbackRate.value=rate; g.gain.value=volume; if(pnn){ pnn.pan.value=pan; src.connect(g).connect(pnn).connect(ctxState.master);} else { src.connect(g).connect(ctxState.master);} try{ src.start(); }catch(_){}}
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  async function playKey(key,opts={}){ const arr=MAP[key]; if(!arr||!arr.length) return; const now=performance.now(); const gap=minInterval[key]||0; if(gap && lastPlayAt[key] && now-lastPlayAt[key]<gap) return; lastPlayAt[key]=now; const path=pick(arr); return playPath(path,opts); }
  function setEnabled(on){ ctxState.enabled=!!on; localStorage.setItem('pixelbelle-sfx-enabled', ctxState.enabled? '1':'0'); }
  function setVolume(v){ ctxState.volume=Math.min(1,Math.max(0,v)); if(ctxState.master) ctxState.master.gain.value=ctxState.volume; localStorage.setItem('pixelbelle-sfx-volume', String(ctxState.volume)); }
  try{ const en = localStorage.getItem('pixelbelle-sfx-enabled'); if(en!=null) ctxState.enabled = en==='1'; const vol = parseFloat(localStorage.getItem('pixelbelle-sfx-volume')||''); if(isFinite(vol)) ctxState.volume=vol; }catch(_){ }
  function preloadFirst(keys=[],{perTick=2,delay=150}={}){ const paths=[]; const seen=new Set(); keys.forEach(k=>{ const arr=MAP[k]; if(arr&&arr.length){ const p0=arr[0]; if(!seen.has(p0)){ seen.add(p0); paths.push(p0); } } }); let i=0; function step(){ const end=Math.min(paths.length,i+perTick); for(;i<end;i++) loadBuffer(paths[i]); if(i<paths.length){ if(window.requestIdleCallback) requestIdleCallback(()=>setTimeout(step,delay)); else setTimeout(step,delay);} } step(); }
  window.SFX = { play:playKey, playPath, setEnabled, setVolume, ensureCtx, MAP, preloadFirst };
})();

