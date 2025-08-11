 <script>
    /***** ICON SET (8 unique SVG strings) *****/
    // Using inline SVG ensures crisp icons and no external images.
    const ICONS = [
      // Star
      `<svg viewBox="0 0 24 24" width="56" height="56" fill="#7c3aed" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
      // Heart
      `<svg viewBox="0 0 24 24" width="56" height="56" fill="#ef4444" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7-4.35-9.5-7.36C-1 8.5 4 3.5 8 6.5 9.87 8.18 12 10 12 10s2.13-1.82 4-3.5c4-3 9 2 5.5 7.14C19 16.65 12 21 12 21z"/></svg>`,
      // Bolt
      `<svg viewBox="0 0 24 24" width="56" height="56" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>`,
      // Feather
      `<svg viewBox="0 0 24 24" width="56" height="56" fill="#06b6d4" xmlns="http://www.w3.org/2000/svg"><path d="M21 3c0 0-3 1-6 4s-4 6-4 6c-3 3-6 6-6 6l2 2 6-6c0 0 4-1 6-3s4-6 4-6-3-3-8-1z"/></svg>`,
      // Moon
      `<svg viewBox="0 0 24 24" width="56" height="56" fill="#94a3b8" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
      // Leaf
      `<svg viewBox="0 0 24 24" width="56" height="56" fill="#10b981" xmlns="http://www.w3.org/2000/svg"><path d="M12 2s7 3 10 9-4 11-10 11S2 17 2 9 12 2 12 2z"/></svg>`,
      // Anchor
      `<svg viewBox="0 0 24 24" width="56" height="56" fill="#60a5fa" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v10a4 4 0 1 0 4 4h2a6 6 0 1 1-6-6V2z"/></svg>`,
      // Hexagon
      `<svg viewBox="0 0 24 24" width="56" height="56" fill="#f472b6" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l8 4v8l-8 4-8-4V6l8-4z"/></svg>`
    ];

    /***** STATE *****/
    const PAIRS = 8; // number of unique pairs
    let deck = [];   // duplicated + shuffled icons
    let firstCard = null;
    let secondCard = null;
    let lock = false;
    let moves = 0;
    let matches = 0;
    let timer = 0;
    let timerInterval = null;
    let started = false;

    // DOM
    const grid = document.getElementById('grid');
    const movesEl = document.getElementById('moves');
    const matchesEl = document.getElementById('matches');
    const timerEl = document.getElementById('timer');
    const starsEl = document.getElementById('stars');
    const progressInner = document.getElementById('progressInner');
    const restartBtn = document.getElementById('restartBtn');
    const hintBtn = document.getElementById('hintBtn');
    const movesMini = document.getElementById('movesMini');
    const timerMini = document.getElementById('timerMini');

    const winModal = document.getElementById('winModal');
    const playAgain = document.getElementById('playAgain');
    const closeModal = document.getElementById('closeModal');
    const winTime = document.getElementById('winTime');
    const winMoves = document.getElementById('winMoves');
    const winStars = document.getElementById('winStars');

    /***** UTIL: Fisher-Yates shuffle *****/
    function shuffleArray(a){
      for(let i=a.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    /***** CREATE DECK *****/
    function makeDeck(){
      // duplicate the ICONS (we already have 8)
      deck = [...ICONS.slice(0,PAIRS), ...ICONS.slice(0,PAIRS)];
      shuffleArray(deck);
    }

    /***** RENDER *****/
    function renderBoard(){
      grid.innerHTML = '';
      deck.forEach((iconHtml, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', idx);
        card.setAttribute('data-key', hash(iconHtml)); // small key to compare
        card.setAttribute('role','button');
        card.setAttribute('aria-label','Memory card');
        card.innerHTML = `
          <div class="inner">
            <div class="face back">
              <svg class="pattern" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#7c3aed" stop-opacity="0.18"/><stop offset="1" stop-color="#06b6d4" stop-opacity="0.12"/></linearGradient></defs>
                  <rect width="128" height="128" rx="12" fill="url(#g)"/>
                  <g fill="#ffffff" opacity="0.12">
                    <circle cx="32" cy="32" r="6"/>
                    <circle cx="96" cy="96" r="6"/>
                    <circle cx="32" cy="96" r="4"/>
                    <circle cx="96" cy="32" r="4"/>
                  </g>
              </svg>
            </div>
            <div class="face front" aria-hidden="true">
              <div class="icon-wrap">${iconHtml}</div>
            </div>
          </div>
        `;
        // event
        card.addEventListener('click', onCardClick);
        grid.appendChild(card);
      });
    }

    // small deterministic hash of the icon HTML for equality check
    function hash(s){
      let h = 0;
      for(let i=0;i<s.length;i++){ h = ((h<<5)-h) + s.charCodeAt(i); h |= 0; }
      return String(h);
    }

    /***** TIMER *****/
    function startTimer(){
      if(timerInterval) return;
      timerInterval = setInterval(()=>{
        timer++;
        timerEl.textContent = timer + 's';
        timerMini.textContent = timer + 's';
      },1000);
    }
    function stopTimer(){
      clearInterval(timerInterval);
      timerInterval = null;
    }

    /***** UI UPDATES *****/
    function updateStats(){
      movesEl.textContent = moves;
      matchesEl.textContent = `${matches} / ${PAIRS}`;
      movesMini.textContent = moves;
      starsEl.textContent = starRating();
      progressInner.style.width = `${(matches/PAIRS)*100}%`;
    }

    function starRating(){
      // simple heuristic: 3 stars = <= 14 moves, 2 stars <= 20, else 1
      if(moves <= 14 && timer <= 40) return '★★★';
      if(moves <= 20 && timer <= 70) return '★★☆';
      if(moves <= 28) return '★☆☆';
      return '☆☆☆';
    }

    /***** GAME LOGIC *****/
    function onCardClick(e){
      const card = e.currentTarget;

      if(lock) return;
      if(card === firstCard) return;          // prevent clicking same card twice
      if(card.classList.contains('matched')) return;

      // flip
      card.classList.add('flip');

      if(!started){
        started = true;
        startTimer();
      }

      if(!firstCard){
        firstCard = card;
        return;
      }

      secondCard = card;
      lock = true; // prevent further clicks until resolved
      moves++;
      updateStats();

      // check match by comparing data-key (hash)
      const firstKey = firstCard.getAttribute('data-key');
      const secondKey = secondCard.getAttribute('data-key');

      if(firstKey === secondKey){
        // match
        setTimeout(()=>{
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');
          // small matched pulse
          firstCard.style.transition = 'transform 300ms ease';
          secondCard.style.transition = 'transform 300ms ease';
          matches++;
          resetTurn();
          updateStats();
          // winning
          if(matches === PAIRS){
            onWin();
          }
        }, 350);
      } else {
        // not a match -> flip back after short delay
        setTimeout(()=>{
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          resetTurn();
        }, 800);
      }
    }

    function resetTurn(){
      [firstCard, secondCard] = [null, null];
      lock = false;
    }

    /***** HINT (brief reveal) *****/
    function hintShow(){
      if(started) return; // only allow hint before start for fairness
      const cards = Array.from(document.querySelectorAll('.card'));
      // reveal all quickly then hide
      cards.forEach((c,i)=>{
        setTimeout(()=> c.classList.add('flip'), i*60);
      });
      setTimeout(()=>{
        cards.reverse().forEach((c,i)=> setTimeout(()=> c.classList.remove('flip'), i*50));
      }, 1000 + cards.length*60);
    }

    /***** RESET / RESTART *****/
    function restart(shuffle=true){
      stopTimer();
      started = false;
      timer = 0;
      moves = 0;
      matches = 0;
      firstCard = null;
      secondCard = null;
      lock = false;
      timerEl.textContent = '0s';
      timerMini.textContent = '0s';
      movesEl.textContent = '0';
      matchesEl.textContent = `0 / ${PAIRS}`;
      progressInner.style.width = '0%';
      starsEl.textContent = '★★★';
      if(shuffle) makeDeck();
      renderBoard();
      // small entrance animation
      const cards = document.querySelectorAll('.card');
      cards.forEach((c,i)=>{ c.style.opacity=0; c.style.transform='translateY(8px) scale(.995)'; setTimeout(()=>{ c.style.transition='opacity 420ms cubic-bezier(.2,.9,.2,1), transform 420ms cubic-bezier(.2,.9,.2,1)'; c.style.opacity=1; c.style.transform='translateY(0) scale(1)'; }, 60*i)} );
    }

    /***** WIN ACTION *****/
    function onWin(){
      stopTimer();
      // small celebratory animation (cards pulse)
      const matchedCards = document.querySelectorAll('.card.matched');
      matchedCards.forEach((c, i)=> setTimeout(()=> c.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}], {duration:420, easing:'ease-out'}), i*60));
      // fill modal stats
      winTime.textContent = timer + 's';
      winMoves.textContent = moves;
      winStars.textContent = starRating();

      // show modal
      showModal();
    }

    function showModal(){
      winModal.classList.add('show');
      winModal.setAttribute('aria-hidden','false');
    }
    function hideModal(){
      winModal.classList.remove('show');
      winModal.setAttribute('aria-hidden','true');
    }

    /***** EVENTS *****/
    restartBtn.addEventListener('click', ()=> restart(true));
    playAgain.addEventListener('click', ()=> { hideModal(); restart(true); });
    closeModal.addEventListener('click', ()=> { hideModal(); });
    hintBtn.addEventListener('click', hintShow);

    // Accessibility: close modal on Escape
    document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') hideModal(); });

    /***** INIT *****/
    makeDeck();
    restart(false); // render board without reshuffling again
  </script>

