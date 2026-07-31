const questions = [
  {
    category: "Science",
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    explanation: "Mars appears reddish because iron minerals in its soil oxidize, or rust."
  },
  {
    category: "Geography",
    question: "What is the capital city of Australia?",
    answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2,
    explanation: "Canberra was selected as the capital as a compromise between Sydney and Melbourne."
  },
  {
    category: "Animals",
    question: "Which animal is the largest mammal on Earth?",
    answers: ["African elephant", "Blue whale", "Giraffe", "Whale shark"],
    correct: 1,
    explanation: "The blue whale is the largest known animal to have lived on Earth."
  },
  {
    category: "Technology",
    question: "What does CPU stand for?",
    answers: [
      "Central Processing Unit",
      "Computer Personal Utility",
      "Core Program User",
      "Central Power Utility"
    ],
    correct: 0,
    explanation: "CPU means Central Processing Unit, the main processor that executes instructions."
  },
  {
    category: "History",
    question: "Which ancient civilization built Machu Picchu?",
    answers: ["Romans", "Maya", "Inca", "Egyptians"],
    correct: 2,
    explanation: "Machu Picchu was built by the Inca civilization in the 15th century."
  },
  {
    category: "Sport",
    question: "How many players does one football team have on the field?",
    answers: ["9", "10", "11", "12"],
    correct: 2,
    explanation: "A football team normally has 11 players on the field, including the goalkeeper."
  }
];

const letters = ["A", "B", "C", "D"];
let currentQuestion = 0;
let timeLeft = 10;
let timerId;
let answered = false;

const categoryLabel = document.getElementById("categoryLabel");
const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const answerGrid = document.getElementById("answerGrid");
const feedbackTitle = document.getElementById("feedbackTitle");
const explanationText = document.getElementById("explanationText");
const nextButton = document.getElementById("nextButton");
const timer = document.getElementById("timer");
const timerFill = document.getElementById("timerFill");

function renderQuestion() {
  clearInterval(timerId);
  answered = false;
  timeLeft = 10;

  const item = questions[currentQuestion];
  categoryLabel.textContent = item.category;
  questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = item.question;
  feedbackTitle.textContent = "Choose one answer.";
  explanationText.textContent = "The correct answer will be revealed after your choice.";
  nextButton.disabled = true;
  answerGrid.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.innerHTML = `
      <span class="answer-letter">${letters[index]}</span>
      <span>${answer}</span>
    `;
    button.addEventListener("click", () => selectAnswer(index));
    answerGrid.appendChild(button);
  });

  updateTimer();
  timerId = setInterval(() => {
    timeLeft -= 1;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      revealAnswer(null);
    }
  }, 1000);
}

function updateTimer() {
  timer.textContent = timeLeft;
  timerFill.style.width = `${(timeLeft / 10) * 100}%`;
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  clearInterval(timerId);
  revealAnswer(selectedIndex);
}

function revealAnswer(selectedIndex) {
  answered = true;
  const item = questions[currentQuestion];
  const buttons = [...document.querySelectorAll(".answer-button")];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    if (selectedIndex === index && index !== item.correct) button.classList.add("wrong");
  });

  if (selectedIndex === null) {
    feedbackTitle.textContent = `Time is up! The answer is ${letters[item.correct]}. ${item.answers[item.correct]}.`;
  } else if (selectedIndex === item.correct) {
    feedbackTitle.textContent = "Correct! Well done.";
  } else {
    feedbackTitle.textContent = `Not quite. The correct answer is ${letters[item.correct]}. ${item.answers[item.correct]}.`;
  }

  explanationText.textContent = item.explanation;
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  currentQuestion = (currentQuestion + 1) % questions.length;
  renderQuestion();
});

renderQuestion();
