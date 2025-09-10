// StudyHub orchestrator: manages difficulty, timers, lives, and quest widget
(function(){
  const Hub = {
    difficulty: 1,
    lives: 5,
    songTime: 180,
    questionTime: 15,
    songInterval: null,
    questionInterval: null,
    currentGame: null,
    vocabPool: [],
    kanjiPool: [],
    typingPool: [],
    stats: { cool: 0, great: 0, fine: 0, miss: 0 },
    reward: 0,
    init(){
      this.prefetch();
      const diffSlider=document.getElementById('studyDifficulty');
      const diffLabel=document.getElementById('studyDifficultyLabel');
      if(diffSlider){
        diffSlider.addEventListener('input',()=>{
          this.difficulty=parseInt(diffSlider.value,10)||1;
          if(diffLabel) diffLabel.textContent=diffSlider.value;
        });
      }
      const closeBtn=document.getElementById('songOverClose');
      if(closeBtn) closeBtn.addEventListener('click',()=>this.reset());
      this.moveQuests();
      window.__resetStudy=()=>this.reset();
    },
    prefetch(){
      const data=window.SITE_CONTENT?.study?.gameData||{};
      this.vocabPool=data.vocab||[];
      this.kanjiPool=data.kanji||[];
      this.typingPool=data.typing||[];
    },
    moveQuests(){
      const q=document.getElementById('questsWidget');
      const grid=document.getElementById('jpGames');
      if(q&&grid&&!q.dataset.moved){
        q.dataset.moved='1';
        q.style.margin='12px 0';
        grid.appendChild(q);
      }
    },
    start(game){
      this.reset();
      this.currentGame=game;
      // Play classic "sega" tag to kick things off
      window.SFX?.play('sega.tag');
      this.stats = { cool: 0, great: 0, fine: 0, miss: 0 };
      this.reward = 0;
      const timerEl=document.getElementById('songTimer');
      const livesEl=document.getElementById('studyLives');
      if(timerEl) timerEl.textContent=this.songTime;
      if(livesEl) livesEl.textContent=this.lives;
      this.songInterval=setInterval(()=>{
        this.songTime--;
        if(timerEl) timerEl.textContent=this.songTime;
        if(this.songTime<=0) this.end('time');
      },1000);
      this.startQuestionTimer();
    },
    startQuestionTimer(){
      this.clearQuestionTimer();
      const qEl=document.getElementById('questionTimer');
      if(qEl) qEl.textContent=this.questionTime;
      this.questionInterval=setInterval(()=>{
        this.questionTime--;
        if(qEl) qEl.textContent=this.questionTime;
        if(this.questionTime<=0){
          this.loseLife();
          this.nextQuestion();
        }
      },1000);
    },
    clearQuestionTimer(){
      this.questionTime=15;
      if(this.questionInterval){clearInterval(this.questionInterval);this.questionInterval=null;}
    },
    nextQuestion(){
      this.clearQuestionTimer();
      this.startQuestionTimer();
    },
    registerAnswer(correct, judge){
      if (judge) {
        if (judge === 'COOL') this.stats.cool++;
        else if (judge === 'GREAT') this.stats.great++;
        else if (judge === 'FINE') this.stats.fine++;
        else this.stats.miss++;
      } else {
        if (correct) this.stats.fine++; else this.stats.miss++;
      }
      if(!correct) this.loseLife();
      this.nextQuestion();
    },
    loseLife(){
      this.lives--;
      const livesEl=document.getElementById('studyLives');
      if(livesEl) livesEl.textContent=this.lives;
      if(this.lives<=0) this.end('lives');
    },
    end(reason){
      this.clearQuestionTimer();
      if(this.songInterval){clearInterval(this.songInterval);this.songInterval=null;}
      const panel=document.getElementById('songOverPanel');
      if(panel){
        const txt=reason==='time'?'Time Up':'Out of Lives';
        panel.querySelector('.reason').textContent=txt;
        const r = this.calculateResults();
        panel.querySelector('.rank').textContent=r.rank;
        panel.querySelector('.score').textContent=r.score;
        panel.querySelector('.counts').textContent=
          `COOL ${this.stats.cool} • GREAT ${this.stats.great} • FINE ${this.stats.fine} • MISS ${this.stats.miss}`;
        panel.querySelector('.reward').textContent=`+${r.reward.toLocaleString()} 💖`;
        const rings=panel.querySelector('.result-rings');
        if(rings){
          const clone=rings.cloneNode(true);
          rings.replaceWith(clone);
        }
        panel.style.display='block';
      }
    },
    calculateResults(){
      const {cool,great,fine,miss}=this.stats;
      const score=cool*4+great*3+fine*2;
      let rank='C';
      if(miss===0 && score>=40) rank='S';
      else if(miss<=1 && score>=20) rank='A';
      else if(miss<=3) rank='B';
      const level=(window.Progression&&Progression.getLevel&&Progression.getLevel())||1;
      const bonus=Math.max(0,(level-1)*5);
      const base=30;
      const rankBonus = rank==='S'?40:rank==='A'?25:rank==='B'?15:rank==='C'?10:5;
      const reward=Math.round((base+rankBonus)*(1+bonus/100));
      this.reward=reward;
      if(window.Hearts&&Hearts.add) Hearts.add(reward);
      else if(window.Hearts&&hearts.addHearts) hearts.addHearts(reward);
      return {rank,score,reward};
    },
    reset(){
      if(this.songInterval){clearInterval(this.songInterval);this.songInterval=null;}
      this.clearQuestionTimer();
      this.lives=5;
      this.songTime=180;
      this.stats = { cool:0,great:0,fine:0,miss:0 };
      this.reward = 0;
      const panel=document.getElementById('songOverPanel');
      if(panel) panel.style.display='none';
      const livesEl=document.getElementById('studyLives');
      if(livesEl) livesEl.textContent=this.lives;
      const timerEl=document.getElementById('songTimer');
      if(timerEl) timerEl.textContent=this.songTime;
    }
  };
  window.StudyHub=Hub;
})();
