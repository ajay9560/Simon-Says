let gameSeq = [];
let userSeq = [];
let higScor = [];

let btns = ["red", "green", "yellow", "purple"];

let h3 = document.querySelector("h3");

let start = false;
let level = 0;

document.addEventListener("keypress", function () {
  if (start == false) {
    start = true;
    console.log("stated");
    levelUp();
  }
});

// color generate and upgrade lavel
function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  console.log(randIdx);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
  updateScore();
}

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");

  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}
// to cheack correct press key by user
function checkAns(idx) {
  //   let idx = level - 1;
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
    console.log("correct ans");
  } else {
    h3.innerHTML = `Game Over! <b>Your Score was ${level} </b>`;
    reset();
  }
}

function btnPress() {
  let btn = this;
  console.log(this);
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log(userColor);

  checkAns(userSeq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  start = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// Display the initial high score
document.getElementById("highScore").innerText = `High Score: ${highScore}`;

// Function to update and display the score
function updateScore() {
  score++;
  document.getElementById("score").innerText = `Score: ${score}`;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    document.getElementById("highScore").innerText = `High Score: ${highScore}`;
  }
}
