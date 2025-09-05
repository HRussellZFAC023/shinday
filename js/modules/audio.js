// Audio module: BGM and Radio controls (extracted)
(function(){
  function initBgm(){
    try{
      const AUTO_KEY = 'pixelbelle-auto-music';
      const autoPref = localStorage.getItem(AUTO_KEY);
      const autoOn = autoPref == null ? true : autoPref === '1';
      if (!autoOn) return;
      if (window.__bgmAudio) return;
      const bgm = new Audio('./assets/bgm.ogg');
      bgm.loop = true; bgm.preload='auto'; bgm.volume = 0.35;
      window.__bgmAudio = bgm; window.__bgmKilled = false;
      const tryPlay = ()=>{ if (!window.__bgmKilled) bgm.play().catch(()=>{}); };
      tryPlay();
      const resume = ()=>{ if (!window.__bgmKilled && bgm.paused) bgm.play().catch(()=>{}); cleanup(); };
      const cleanup = ()=>{
        document.removeEventListener('click', resume);
        document.removeEventListener('keydown', resume);
        document.removeEventListener('touchstart', resume);
      };
      document.addEventListener('click', resume, { passive:true });
      document.addEventListener('keydown', resume, { passive:true });
      document.addEventListener('touchstart', resume, { passive:true });
      window.__stopBgm = (permanent=true)=>{ try{bgm.pause();}catch(_){}; try{bgm.currentTime=0;}catch(_){}; if(permanent) window.__bgmKilled=true; };
    }catch(_){ }
  }

  function initRadio(){
    try{
      const radioStatus = document.getElementById('radioStatus');
      const radioDisplayStatus = document.getElementById('radioDisplayStatus');
      const STREAM_URL = 'https://vocaloid.radioca.st/stream';
      const audio = new Audio(STREAM_URL);
      audio.crossOrigin='anonymous';
      audio.preload='none'; audio.volume = 0.5; audio.controls = false; audio.autoplay=false;
      window.__radioAudio = audio;
      const onlineStatus = document.getElementById('onlineStatus');
      const stopped = ()=>{
        const status = 'Radio Stopped';
        if (radioStatus) radioStatus.textContent = status;
        if (radioDisplayStatus) radioDisplayStatus.textContent = status;
        if (onlineStatus) onlineStatus.textContent = 'Radio Off';
      };
      stopped();
      const play = ()=>{
        try{ window.__stopBgm && window.__stopBgm(true); }catch(_){}
        audio.play().then(()=>{
          const status = 'Now Playing';
          if (radioStatus) radioStatus.textContent = status;
          if (radioDisplayStatus) radioDisplayStatus.textContent = status;
          if (onlineStatus) onlineStatus.textContent = 'Online';
        }).catch(()=>{});
      };
      const pause = ()=>{ audio.pause(); stopped(); };
      const playBtn = document.getElementById('playRadio');
      const pauseBtn = document.getElementById('pauseRadio');
      if (playBtn) playBtn.onclick = play;
      if (pauseBtn) pauseBtn.onclick = pause;
      audio.addEventListener('error', ()=>{
        if (radioStatus) radioStatus.textContent = '⚠️ Stream error';
        if (radioDisplayStatus) radioDisplayStatus.textContent = '⚠️ Stream error';
      });
    }catch(_){ }
  }

  window.AudioMod = { initBgm, initRadio };
})();

