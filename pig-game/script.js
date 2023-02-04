"use strict";

//Selecting every element with which we will be interacting later
const player0El = document.querySelector(".player0");    //This is for player 0
const player1El = document.querySelector(".player1");    //This is for player 1
const score0El = document.querySelector("#score0");      //Player 0 score
const score1El = document.querySelector("#score1");      //Player 1 score
const diceEl = document.querySelector(".dice");          //Dice element
const btnNew = document.querySelector(".btn-new");       //New game button
const btnRoll = document.querySelector(".btn-roll");     //dice rolling button
const btnHold = document.querySelector(".btn-hold");     //score holding button
const current0El = document.getElementById("current0");  //current score of player 0
const current1El = document.getElementById("current1");  //current score of player 1

//declaring these variables outside so that they are available through out the page
let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function(){
  scores = [0, 0];            //stores scores of player 0 and player 1
  currentScore = 0;           
  activePlayer = 0;           //Tells us which player is currently playing the game
  playing = true;             //Tells us if we are playing the game or it is over
  
  //setting main and current scores to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //when game starts, dice is hidden, no one is winner and player0 plays first
  diceEl.classList.add("hidden");
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
};
init();

//For switching between players
const switchPlayer = function() {

  //first current score of current player is set to 0
  document.getElementById(`current${activePlayer}`).textContent = 0;
  
  //Then current score itself is set to 0    
  currentScore = 0;

  //switching between active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //toggling the active-player class on both players
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};


//When roll dice button is clicked, following things happen
btnRoll.addEventListener("click", function(){
  if(playing){
    //Generate random number
    const dice = Math.trunc(Math.random() *6) + 1;

    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1: if true, switch to next player
    if(dice!==1){
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current${activePlayer}`).textContent = currentScore;
    }
    else{
      //Switch to next player
      switchPlayer();
    }
  }
});

//When hold button is clicked, following things happen
btnHold.addEventListener("click", function(){
  if(playing){
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score${activePlayer}`).textContent = scores[activePlayer];

    //check if player's score is >=100......id so, finish the game
    if(scores[activePlayer] >= 100){
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document.querySelector(`.player${activePlayer}`).classList.add("player-winner");
      document.querySelector(`.player${activePlayer}`).classList.remove("player-active");
    }
    //switch to the next player  
    else{
      switchPlayer();
    }
  }
});

//When new game button is clicked, all values are set to initial values
btnNew.addEventListener("click", init);