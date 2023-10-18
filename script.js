const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");
const addCardBtn = document.getElementById("add-card");

let currentActiveCard = 0;

const cardsEl = [];

const cardsData = getCardsData();

// Create all cards

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// create a single card in DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }
  card.innerHTML = `<div class="inner-card">
  <div class="inner-card-front">
      <p>${data.question}</p>
  </div>
  <div class="inner-card-back">
      <p>${data.answer}</p>
  </div>
</div>`;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  // add to DOM cards
  cardsEl.push(card);
  cardsContainer.append(card);

  updateCurrentText();
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards || [];
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

createCards();

// Event Listeners

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left;";

  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right;";

  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));

hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question: question,
      answer: answer,
    };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

//Clear Cards

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
