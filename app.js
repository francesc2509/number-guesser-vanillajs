document.addEventListener('DOMContentLoaded', (event) => {

  const min = 1;
  const max = 10;
  let secretNumber = -1;
  let guessesRemaining = -1;

  const gameEl = document.getElementById('game');
  const guessInput = gameEl.querySelector('#guess-input');
  const playBtn = gameEl.querySelector('#play-btn');
  const minNumEl = gameEl.querySelector('.min-num');
  const maxNumEl = gameEl.querySelector('.max-num');
  const messageEl = gameEl.querySelector('.message');

  minNumEl.textContent = min;
  maxNumEl.textContent = max;

  playBtn.addEventListener('click', play);

  function play(event) {
    if (playBtn.classList.contains('playing')) {
      guess(event);
      return;
    }

    startGame(event);
  }


  function guess(event) {
    const guess = parseInt(guessInput.value);
    guessesRemaining--;

    if (guess === secretNumber) {
      endGame(true);
      return;
    }

    if (guessesRemaining < 1) {
      endGame(false);
      return;
    }

    let message = `The number is not ${guess}`;
    if (isNaN(guess) || guess < min || guess > max) {
      message = `The number must be between ${min} and ${max}`
    }

    setMessage(message);    
  }

  function startGame(event) {
    secretNumber = Math.trunc((Math.random()*(max - min + 1) + min));
    guessesRemaining = 3;

    console.log(secretNumber);

    guessInput.style.borderColor = 'initial';
    guessInput.disabled = false;
    guessInput.value = '';

    messageEl.textContent = '';
    playBtn.value = "Guess"
    playBtn.classList.add('playing');
  }

  function endGame(isVictory) {
    let message = `Sorry, game over. The secret number was ${secretNumber}`;
    let color = '#ff0000';
    if (isVictory) {
      message = `You guessed the number! It was ${secretNumber}`
      color = '#00ff00';
    }

    guessInput.disabled = true;
    setMessage(message, color);
    playBtn.value = "Play again"
    playBtn.classList.remove('playing');
  }

  function setMessage(message, color = '#ff0000') {
    guessInput.style.borderColor = color;
    messageEl.style.color = color;
    messageEl.textContent = message;
  }
  
  startGame(event);
});