export function createGame({
  data = [],
  lives = 3,
  autoAdvance = true,     // avanza solo
  autoAdvanceDelay = 900, // pausa antes de pasar
} = {}) {
  // --- DOM ---
  const imgEl    = document.getElementById('question-image');
  const qTextEl  = document.getElementById('question');
  const optsWrap = document.getElementById('options');
  const feedback = document.getElementById('feedback');
  const scoreEl  = document.getElementById('score');
  const oppEl    = document.getElementById('opportunities');

  // --- Estado ---
  let order = [];
  let idx = 0;                 // índice de pregunta actual (0..N-1)
  let score = 0;
  let opp = lives;
  let locked = false;          // evita doble clic
  let currentOptions = [];

  // --- Utils ---
  const shuffle = (arr)=> {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const updateHUD = ()=>{
    scoreEl.textContent = `Score: ${score}`;
    oppEl.textContent   = `Opportunities Left: ${opp}`;
  };

  // Construye botones dinámicamente (soporta 2,3,4,... opciones)
  const buildOptions = (options)=>{
    optsWrap.innerHTML = '';
    options.forEach((txt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.textContent = txt;
      btn.setAttribute('aria-label', `Option ${i+1}: ${txt}`);
      optsWrap.appendChild(btn);
    });
  };

  function renderQuestion(){
    locked = false;
    feedback.textContent = '';

    const q = data[order[idx]];
    // imagen + alt
    imgEl.src = q.image;
    imgEl.alt = q.word;
    qTextEl.textContent = 'What is this word?';

    currentOptions = shuffle([...q.options]); // baraja opciones
    buildOptions(currentOptions);
  }

  function startGame(){
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('No hay datos.');
      return;
    }
    order = shuffle([...Array(data.length).keys()]); // baraja preguntas
    idx = 0; score = 0; opp = lives; locked = false;
    updateHUD();
    renderQuestion();
  }

  function reveal(correctTxt, selectedBtn){
    const buttons = [...optsWrap.querySelectorAll('.option')];
    buttons.forEach(b=>{
      if (b.textContent === correctTxt) b.classList.add('correct');
      if (selectedBtn && b === selectedBtn && b.textContent !== correctTxt) b.classList.add('wrong');
      b.disabled = true;
    });
  }

  function handleAnswer(selectedTxt, selectedBtn){
    if (locked) return;
    locked = true;

    const q = data[order[idx]];
    const correctTxt = q.word;
    const ok = selectedTxt === correctTxt;

    reveal(correctTxt, selectedBtn);

    if (ok) {
      feedback.textContent = 'Correct!';
      feedback.style.color = 'green';
      score += 10;
    } else {
      feedback.textContent = 'Try again';
      feedback.style.color = 'red';
      opp -= 1;
    }

    updateHUD();

    if (opp <= 0) {
      setTimeout(()=>{
        feedback.textContent = `GAME OVER — Score: ${score}`;
        setTimeout(startGame, 1200);
      }, 350);
      return;
    }

    if (autoAdvance) {
      setTimeout(nextQuestion, autoAdvanceDelay);
    }
  }

  function nextQuestion(){
    if (idx < order.length - 1) {
      idx += 1;
      renderQuestion();
    } else {
      feedback.textContent = `Congratulations, you finished the game with a score of ${score}!`;
      feedback.style.color = 'green';
      setTimeout(startGame, 1500);
    }
  }

  // --- Eventos ---
  optsWrap.addEventListener('click', (e)=>{
    const btn = e.target.closest('.option');
    if (!btn) return;
    handleAnswer(btn.textContent, btn);
  });

  // Teclas: 1-9 = opción 1-9
  document.addEventListener('keydown', (e)=>{
    const n = Number(e.key);
    if (!Number.isNaN(n) && n >= 1 && n <= currentOptions.length) {
      const btn = document.querySelectorAll('.option')[n-1];
      if (btn) handleAnswer(btn.textContent, btn);
    }
  });

  // --- Arranque ---
  startGame();

  // API mínima para reiniciar con otro banco
  return {
    restart(newData){
      if (Array.isArray(newData) && newData.length) data = newData;
      startGame();
    }
  };
}
