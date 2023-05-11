'use strict';

// Selecting elements
const player0Elm = document.querySelector('.player--0'); // .querySelector needs .dot prefix
const player1Elm = document.querySelector('.player--1');
const score0Elm = document.querySelector('#score--0');
const score1Elm = document.getElementById('score--1'); // .getElementbyId doesn't need .dot prefix, just string name
const current0Elm = document.getElementById('current--0');
const current1Elm = document.getElementById('current--1');
const diceElm = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0]; // Total scores that keep accumulating, index 0 is player 1, index 1 is player 2
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Elm.textContent = 0;
  score1Elm.textContent = 0;
  current0Elm.textContent = 0;
  current1Elm.textContent = 0;
  diceElm.classList.add('hidden');

  player0Elm.classList.add('player--active');
  player1Elm.classList.remove('player--active');
  player0Elm.classList.remove('player--winner');
  player1Elm.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  {
    document.getElementById(`current--${activePlayer}`).textContent = 0; // Sets score to 0
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // If activePlayer is 0 (player 1), then new active player will switch to 1 (player 2); if else, it will switch to 0 (player 1)
    player0Elm.classList.toggle('player--active'); // .toggle method removes class (player--active) if its there and adds it if it's not; changes background by adding/removing CSS .player--active setting
    player1Elm.classList.toggle('player--active');
  }
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display dice number
    diceElm.classList.remove('hidden');
    diceElm.src = `dice-${dice}.png`;

    // 3a. Check for rolled 1
    if (dice !== 1) {
      // 3b. Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // selects score element dynamicly based on which is active player now
      //current0Elm.textContent = currentScore; // Keeps score on player 1
    } else {
      // 3c. Switch to next player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players's score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check of player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceElm.classList.add('hidden');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Reset back to default settings (New Game functionality)
btnNew.addEventListener('click', init);
