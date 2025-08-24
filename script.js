const cell = document.querySelectorAll(".cell");
const box = document.querySelector(".box");
const restartBtn = document.querySelector(".restart-btn");
const turn = document.querySelector(".turn");
const result = document.querySelector(".result");

const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

restartBtn.addEventListener("click", function (e) {
  restartGame();
});

initializeGame();

function initializeGame() {
  cell.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (!running) return;
      if (item.textContent !== "") return;
      item.textContent = currentPlayer;
      const index = item.dataset.index;
      gameBoard[index] = currentPlayer;

      checkWinner();
      if (running) {
        changePlayer();
        turn.textContent = `${currentPlayer}'s Turn`;
      }
    });
  });
}

function changePlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function checkWinner() {
  let roundWon = false;

  for (let [a, b, c] of winningCombos) {
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      result.textContent = `${currentPlayer} Wins the Game!`;
      running = false;
      roundWon = true;
      break;
    }
  }

  if (!roundWon && !gameBoard.includes("")) {
    turn.textContent = "";
    result.textContent = "It's a Draw!";
    running = false;
  }
}

function restartGame() {
  gameBoard.fill("");
  running = true;
  currentPlayer = "X";
  cell.forEach((item) => (item.textContent = ""));
  result.textContent = "";
  turn.textContent = `${currentPlayer}'s Turn`;
}
