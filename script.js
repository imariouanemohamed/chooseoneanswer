const questions = [
  {
    question: "Which would you choose?",
    a: "Travel anywhere for free",
    b: "Never pay for food again",
    resultA: 61,
    resultB: 39
  },
  {
    question: "Which ability would you rather have?",
    a: "Read minds",
    b: "See the future",
    resultA: 46,
    resultB: 54
  },
  {
    question: "Which lifestyle sounds better?",
    a: "Live near the ocean",
    b: "Live in the mountains",
    resultA: 57,
    resultB: 43
  },
  {
    question: "Which would you give up?",
    a: "Social media for one year",
    b: "Desserts for one year",
    resultA: 68,
    resultB: 32
  },
  {
    question: "Which sounds more valuable?",
    a: "More money",
    b: "More free time",
    resultA: 41,
    resultB: 59
  }
];

let currentIndex = 0;
let answered = false;

const questionText = document.getElementById("questionText");
const answerAText = document.getElementById("answerAText");
const answerBText = document.getElementById("answerBText");
const percentA = document.getElementById("percentA");
const percentB = document.getElementById("percentB");
const resultMessage = document.getElementById("resultMessage");
const questionNumber = document.getElementById("questionNumber");
const nextButton = document.getElementById("nextButton");
const answerButtons = document.querySelectorAll(".answer-button");

function renderQuestion() {
  const item = questions[currentIndex];
  questionText.textContent = item.question;
  answerAText.textContent = item.a;
  answerBText.textContent = item.b;
  questionNumber.textContent = `${currentIndex + 1} / ${questions.length}`;
  percentA.textContent = "";
  percentB.textContent = "";
  resultMessage.textContent = "Pick one answer to reveal the results.";
  nextButton.disabled = true;
  answered = false;

  answerButtons.forEach(button => button.classList.remove("selected"));
}

answerButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (answered) return;

    answered = true;
    const item = questions[currentIndex];
    const selected = button.dataset.answer;

    button.classList.add("selected");
    percentA.textContent = `${item.resultA}%`;
    percentB.textContent = `${item.resultB}%`;
    resultMessage.textContent =
      selected === "a"
        ? `You chose: ${item.a}`
        : `You chose: ${item.b}`;

    nextButton.disabled = false;
  });
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % questions.length;
  renderQuestion();
});

renderQuestion();
