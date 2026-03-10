const playArea = document.getElementById("playArea");
const chaosBtn = document.getElementById("chaosBtn");
const subtitle = document.getElementById("subtitle");
const counter = document.getElementById("counter");
const finalReveal = document.getElementById("finalReveal");
const openCardBtn = document.getElementById("openCardBtn");
const replayBtn = document.getElementById("replayBtn");
const cardModalEl = document.getElementById("cardModal");
const closeCardBtn = document.getElementById("closeCardBtn");

const labels = ["press me", "boop", "hehe", "nope", "catch me", "tiny chaos", "almost", "eep!"];
const styles = ["style-bubble", "style-candy", "style-star", "style-soft", "style-kitty"];
const lines = [
  "again!!",
  "you are too fast omg",
  "this button is dramatic",
  "ok wait that was impressive",
  "pink panic mode",
  "you are winning",
  "one more maybe...",
  "you did it cutie",
];

const targetClicks = 8;
let clicks = 0;

function randomChoice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function moveButton() {
  const areaRect = playArea.getBoundingClientRect();
  const btnRect = chaosBtn.getBoundingClientRect();
  const maxX = Math.max(8, areaRect.width - btnRect.width - 8);
  const maxY = Math.max(8, areaRect.height - btnRect.height - 8);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  chaosBtn.style.left = `${x}px`;
  chaosBtn.style.top = `${y}px`;
}

function shuffleButtonStyle() {
  styles.forEach((className) => chaosBtn.classList.remove(className));
  chaosBtn.classList.add(randomChoice(styles));
  chaosBtn.textContent = randomChoice(labels);
}

function updateUI() {
  counter.textContent = `${clicks} / ${targetClicks} caught`;
  subtitle.textContent = lines[Math.min(clicks, lines.length - 1)];
}

function win() {
  chaosBtn.classList.add("hidden");
  finalReveal.classList.remove("hidden");
  subtitle.textContent = "Birthday mission complete.";
}

function handleChaosClick() {
  clicks += 1;
  updateUI();

  if (clicks >= targetClicks) {
    win();
    return;
  }

  shuffleButtonStyle();
  moveButton();
}

function openCard() {
  cardModalEl.classList.remove("hidden");
  cardModalEl.setAttribute("aria-hidden", "false");
}

function closeCard() {
  cardModalEl.classList.add("hidden");
  cardModalEl.setAttribute("aria-hidden", "true");
}

function resetExperience() {
  clicks = 0;
  finalReveal.classList.add("hidden");
  chaosBtn.classList.remove("hidden");
  updateUI();
  shuffleButtonStyle();
  moveButton();
  closeCard();
}

chaosBtn.addEventListener("click", handleChaosClick);
openCardBtn.addEventListener("click", openCard);
replayBtn.addEventListener("click", resetExperience);
closeCardBtn.addEventListener("click", closeCard);

cardModalEl.addEventListener("click", (event) => {
  if (event.target === cardModalEl) closeCard();
});

window.addEventListener("resize", () => {
  if (!chaosBtn.classList.contains("hidden")) moveButton();
});

resetExperience();

