import "./styles.scss";

// grab what I need
const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const slider = document.querySelector("#speedSlider");
const scoreDisplay = document.querySelector("#score");
const overlay = document.querySelector("#overlay");
const game = document.querySelector("#game");
let score = 0;
let gameState;
let speed = slider.value;

// define functions ---------------------------------------------------------
function getRandomSize() {
  let randomNum = Math.floor(Math.random() * 10 + 1);
  return randomNum * 10;
}

function createDot() {
  const size = getRandomSize();
  const start = Math.random() * (game.offsetWidth - size);
  const btn = document.createElement("button");
  btn.classList.add("dot");
  btn.style.height = size + "px";
  btn.style.width = size + "px";
  btn.style.left = start + "px";
  btn.setAttribute("data-score", calculatePoints(size));
  game.appendChild(btn);
}

function falling() {
  const dots = document.querySelectorAll(".dot");
  const gameHeight = game.offsetHeight;
  let duration = (gameHeight / speed) * 2;
  dots.forEach((dot) => {
    dot.classList.add("falling");
    dot.style.animationDuration = duration + "s";
    // remove dot from dom after animation has completed
    dot.onanimationend = () => {
      dot.remove();
    };
  });
}

function startGame() {
  overlay.classList.remove("visible");
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
  gameState = setInterval(function () {
    createDot();
    falling();
  }, 1000);
}

function pauseGame() {
  pauseBtn.style.display = "none";
  startBtn.style.display = "block";
  clearInterval(gameState);
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("falling"));
  overlay.classList.toggle("visible");
}

function calculatePoints(size) {
  return size === 10
    ? 10
    : size === 20
    ? 9
    : size === 30
    ? 8
    : size === 40
    ? 7
    : size === 50
    ? 6
    : size === 60
    ? 5
    : size === 70
    ? 4
    : size === 80
    ? 3
    : size === 90
    ? 2
    : 1;
}

function dotClicked(item) {
  let element = item;
  let points = parseInt(item.getAttribute("data-score"));
  score = score + points;
  scoreDisplay.innerHTML = score;
  element.classList.add("popped");
  setTimeout(() => {
    element.remove();
  }, 300);
}

// add event listeners ----------------------------------------------------------------
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);

slider.oninput = function () {
  speed = this.value;
};

game.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot")) {
    dotClicked(e.target);
  }
});
