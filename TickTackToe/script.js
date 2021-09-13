const spaces = document.querySelectorAll(".spaces");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const replayBtn = document.querySelector(".replayBtn");

const body = document.querySelector("body");

const activePlayer = 0;

let gameState = ["", "", "", "", "", "", "", "", ""];

if (activePlayer === 0) {
  spaces.forEach((space) => {
    let cell = String(space.id[5]);

    space.addEventListener("click", function (e) {
      if (player1.classList.contains("player--active")) {
        if (e.target.classList.contains("filled")) return;
        player1.classList.toggle("player--active");
        player2.classList.toggle("player--active");
        e.target.classList.add("filled");
        e.target.classList.add("x");
        gameState.splice(Number(cell), 1, "x");
        e.target.innerText = "X";

        winner();
      } else if (player2.classList.contains("player--active")) {
        if (e.target.classList.contains("filled")) return;
        player1.classList.toggle("player--active");
        player2.classList.toggle("player--active");
        e.target.classList.add("filled");
        e.target.innerText = "O";
        e.target.classList.add("o");
        gameState.splice(Number(cell), 1, "o");

        winner();
      }
    });
  });
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

replayBtn.addEventListener("click", function () {
  spaces.forEach((space) => {
    space.classList.remove("x", "o");
    space.innerText = "";
    player1.classList.remove("player--active");
    player2.classList.remove("player--active");
    player1.classList.add("player--active");
    space.classList.remove("filled");
  });
  gameState = ["", "", "", "", "", "", "", "", ""];
});

function winner() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    alert(`You win!`);
    // gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    alert("Draw! Play again!");
    // gameActive = false;
    return;
  }
}
