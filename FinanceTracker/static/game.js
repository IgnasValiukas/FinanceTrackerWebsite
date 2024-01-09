// Math Game Logic
let score = 0;
let highScore = 0;

function generateMathProblem() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operators = ['+', '-'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  return `${num1} ${operator} ${num2}`;
}

function updateMathProblem() {
  const mathProblemElement = document.getElementById('mathProblem');
  mathProblemElement.textContent = generateMathProblem();
}

function checkAnswer() {
  const userAnswerInput = document.getElementById('userAnswer');
  const userAnswer = userAnswerInput.value;
  const mathProblem = document.getElementById('mathProblem').textContent;
  const correctAnswer = eval(mathProblem); // eval - evaluate (įvertinti)

  // Check if the entered value is a valid number
  if (!isNaN(userAnswer) && userAnswer.trim() !== "") {  // Trim pasalina tarpelius is priekio ir galo
    if (parseInt(userAnswer) === correctAnswer) {
      score++;
       if (score > highScore) {
         highScore = score;
         updateHighScore();
       }
    } else {
      score = 0;
    }

    updateMathProblem();
    updateScore();

    // Clear the input box
    userAnswerInput.value = '';
    displayInstructions();
  } else {
    alert("Please enter a valid number.");
  }
}

function updateScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Score: ${score}`;
}

function updateHighScore() {
  const highScoreElement = document.getElementById('highScore');
  highScoreElement.textContent = `High Score: ${highScore}`;
  // Save high score to localStorage
  localStorage.setItem('highScore', highScore);
}

function displayInstructions() {
  const instructionsElement = document.getElementById('instructions');
  instructionsElement.textContent = "Type your answer and click 'Submit Answer'.";
}

// Load high score from localStorage on page load
window.onload = function () {
  highScore = localStorage.getItem('highScore') || 0;
  updateHighScore();
};

// Initial setup
updateMathProblem();
updateScore();
displayInstructions();
