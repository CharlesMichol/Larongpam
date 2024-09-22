const gameBox = document.getElementById('gameBox');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.createElement('p');
document.body.appendChild(timerDisplay);

let score = 0;
let timeLeft = 10;
let requiredScore = 15; // Score needed for the first round
let round = 1; // Track the current round
let timer;
let moveInterval;

// Function to get a random position for the box
function getRandomPosition() {
  const x = Math.floor(Math.random() * (window.innerWidth - 50));
  const y = Math.floor(Math.random() * (window.innerHeight - 50));
  return { x, y };
}

// Function to move the box to a random position
function moveBox() {
  const { x, y } = getRandomPosition();
  gameBox.style.left = `${x}px`;
  gameBox.style.top = `${y}px`;
}

// Function to update the score and check for round progression
gameBox.addEventListener('click', () => {
  if (timeLeft > 0) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveBox();

    // Check if player has reached the required score for the current round
    if (score >= requiredScore) {
      if (round === 1) {
        timeLeft += 5; // Add 5 seconds for the second round
        requiredScore = 30; // Set new target score for the second round
        round++;
        startMovingTarget(); // Start moving the target in the second round
      } else if (round === 2) {
        timeLeft += 7; // Add 7 seconds if they reach 30 points in the second round
        clearInterval(moveInterval); // Stop moving the target when game ends
      }
    }
  }
});

// Countdown timer function
function countdown() {
  if (timeLeft > 0) {
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    timeLeft--;
  } else {
    endGame();
  }
}

// Function to end the game
function endGame() {
  clearInterval(timer);
  clearInterval(moveInterval); // Stop the target from moving
  timerDisplay.textContent = `TALO HAHAHA ETO SCORE MO: ${score}`;
  gameBox.style.display = 'none'; // Hide the box
  showOptions();
}

// Function to show "Play Again" and "Stop" buttons
function showOptions() {
  const playAgainBtn = document.createElement('button');
  playAgainBtn.textContent = 'Play Again';
  playAgainBtn.onclick = restartGame;

  const stopBtn = document.createElement('button');
  stopBtn.textContent = 'Stop';
  stopBtn.onclick = () => {
    timerDisplay.textContent = 'Thanks for playing!';
    playAgainBtn.remove();
    stopBtn.remove();
  };

  document.body.appendChild(playAgainBtn);
  document.body.appendChild(stopBtn);
}

// Function to start the target moving in the second round
function startMovingTarget() {
  moveInterval = setInterval(moveBox, 1000); // Move the target every second in the second round
}

// Function to restart the game
function restartGame() {
  score = 0;
  timeLeft = 10;
  requiredScore = 15; // Reset to first round target
  round = 1;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  gameBox.style.display = 'block'; // Show the box again
  moveBox();
  timer = setInterval(countdown, 1000); // Restart the timer

  // Remove the "Play Again" and "Stop" buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.remove());
}

// Start the game
function startGame() {
  moveBox(); // Move the box to a random starting position
  timer = setInterval(countdown, 1000); // Start the countdown
}

startGame();