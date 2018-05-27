//Game Values
let min = 1,
  max = 10,
  winningNum = Math.floor(Math.random() * max) + min,
  guessesLeft = 3;

//UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play Agaon Event Listener
game.addEventListener('mousedown', function(e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
})
//Listen for guesses
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  //Validate Input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Enter a number between ${min}  and ${max}`,'red');
    guessInput.style.borderColor = 'red';
    return
  }

  if (guess === winningNum) {
    //Game over
    gameOver(true,`${guess} is correct, You WIN!`);
  } else {
      //Wrong number
      guessesLeft--
      if (!guessesLeft) {
        //Game Over
        gameOver(false,`You LOSE!, GAME OVER, Correct answer was ${winningNum}`);
      } else {
        //Game continues -- answer wrong
        //Set Message
        setMessage(`${guess} is incorrect, ${guessesLeft} guesses left`,'red');
        //Clear input
        guessInput.value = '';
        //Change border color
        guessInput.style.borderColor = 'red';
        }
    }
})

//Game Over
function gameOver(won,msg) {
  let color = won ? 'green':'red'
  // Disable Input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set message
  setMessage(msg,color);
  //Play Again?
  guessBtn.value = 'Play Again?'
  guessBtn.classList.add('play-again')
}
//set Message
function setMessage(msg,color) {
  message.textContent = msg;
  message.style.color = color;
}