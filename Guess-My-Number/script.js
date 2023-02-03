"use strict";

// Initial values when page loads -> secret value is hidden, score is 20 and no highscore is 0 for first game
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// Displays message depending on our guess
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//displays score everytime we check our guess
const displayScore = function (score) {
  document.querySelector(".score").textContent = score;
};

//When a game begins, hides the secret number and shows the number if guess is correct
const showHideSecretNumber = function(value) {
  document.querySelector(".number").textContent = value;
}


//gets triggered everytime check button is clicked
document.querySelector(".check").addEventListener("click", function () {

  const guess = +document.querySelector(".guess").value;                        // + is for converting string to Number
  
  if (!guess) {                                                                 //if guess is falsy, displays error message
    displayMessage("⛔ No number!");
  } 
  else if (guess === secretNumber) {                                            //if guess is correct
    showHideSecretNumber(secretNumber);                                         //secretNumber is shown 
    displayMessage("🎉 Correct Number");                                       //Message is is displayed that the guess was correct
    document.querySelector("body").style.backgroundColor = "#60b347";          //background color of body is changed to given color
    document.querySelector(".number").style.width = "30rem";                   //increases secret number box width 
    if (score > highScore) {                                                   //makes change in highscore if condition is true
      highScore = score;
    }
    document.querySelector(".highscore").textContent = highScore;
  }
  else if (guess !== secretNumber) {                                           //If guess is incorrect
    if (score > 1) {                                                           //Checks if he has sufficient chance to play
      displayMessage(guess > secretNumber ? "📈 Too high" : "📉 Too low");    //displays message depending on guess and secret number
      score--;                                                                 //decrements score
      displayScore(score);                                                     //displays updated score
    } else {                                                                    
      displayMessage("💥 You lost the game");                   //If the guess is wrong and score was only 1, displays loosing message
      displayScore(0);                                          //displays updated score that is 0
    }
  }
});

//gets triggered when again button is clicked and everything is set to default
document.querySelector(".again").addEventListener("click", function () {       
  score = 20;                                                                  
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage("Start Guessing...");
  displayScore(score);
  showHideSecretNumber('?');
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
