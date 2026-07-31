const questions=[
{category:"Science",question:"Which planet is known as the Red Planet?",answers:["Venus","Mars","Jupiter","Saturn"],correct:1,explanation:"Mars appears red because iron minerals on its surface oxidize, producing a rust-like color."},
{category:"Geography",question:"What is the capital city of Australia?",answers:["Sydney","Melbourne","Canberra","Perth"],correct:2,explanation:"Canberra was chosen as the capital as a compromise between Sydney and Melbourne."},
{category:"Animals",question:"Which animal is the largest mammal on Earth?",answers:["African elephant","Blue whale","Giraffe","Whale shark"],correct:1,explanation:"The blue whale is the largest known animal to have lived on Earth."},
{category:"Technology",question:"What does CPU stand for?",answers:["Central Processing Unit","Computer Personal Utility","Core Program User","Central Power Utility"],correct:0,explanation:"CPU means Central Processing Unit, the processor that executes instructions."},
{category:"History",question:"Which ancient civilization built Machu Picchu?",answers:["Romans","Maya","Inca","Egyptians"],correct:2,explanation:"Machu Picchu was built by the Inca civilization during the 15th century."},
{category:"Sport",question:"How many players does one football team have on the field?",answers:["9","10","11","12"],correct:2,explanation:"A football team normally has 11 players on the field, including the goalkeeper."}
];
const letters=["A","B","C","D"];
let current=0,timeLeft=10,timerId,answered=false;
const categoryLabel=document.getElementById("categoryLabel");
const questionCounter=document.getElementById("questionCounter");
const questionText=document.getElementById("questionText");
const answerGrid=document.getElementById("answerGrid");
const feedbackTitle=document.getElementById("feedbackTitle");
const explanationText=document.getElementById("explanationText");
const nextButton=document.getElementById("nextButton");
const timer=document.getElementById("timer");
const timerFill=document.getElementById("timerFill");

function render(){
  clearInterval(timerId);
  answered=false;
  timeLeft=10;
  const q=questions[current];
  categoryLabel.textContent=q.category;
  questionCounter.textContent=`Question ${current+1} of ${questions.length}`;
  questionText.textContent=q.question;
  feedbackTitle.textContent="Choose one answer.";
  explanationText.textContent="The answer and explanation will appear here.";
  nextButton.disabled=true;
  answerGrid.innerHTML="";
  q.answers.forEach((answer,i)=>{
    const b=document.createElement("button");
    b.className="answer-button";
    b.type="button";
    b.innerHTML=`<span class="answer-letter">${letters[i]}</span><span>${answer}</span>`;
    b.addEventListener("click",()=>choose(i));
    answerGrid.appendChild(b);
  });
  updateTimer();
  timerId=setInterval(()=>{
    timeLeft--;
    updateTimer();
    if(timeLeft<=0){
      clearInterval(timerId);
      reveal(null);
    }
  },1000);
}

function updateTimer(){
  timer.textContent=String(timeLeft).padStart(2,"0");
  timerFill.style.width=`${timeLeft*10}%`;
}

function choose(index){
  if(answered)return;
  clearInterval(timerId);
  reveal(index);
}

function reveal(selected){
  answered=true;
  const q=questions[current];
  [...document.querySelectorAll(".answer-button")].forEach((button,i)=>{
    button.disabled=true;
    if(i===q.correct)button.classList.add("correct");
    if(i===selected && i!==q.correct)button.classList.add("wrong");
  });

  if(selected===null){
    feedbackTitle.textContent=`Time is up! The answer is ${letters[q.correct]}: ${q.answers[q.correct]}.`;
  } else if(selected===q.correct){
    feedbackTitle.textContent=`Correct! The answer is ${letters[q.correct]}: ${q.answers[q.correct]}.`;
  } else {
    feedbackTitle.textContent=`The correct answer is ${letters[q.correct]}: ${q.answers[q.correct]}.`;
  }
  explanationText.textContent=q.explanation;
  nextButton.disabled=false;
}

nextButton.addEventListener("click",()=>{
  current=(current+1)%questions.length;
  render();
});

document.getElementById("newsletterForm").addEventListener("submit",(event)=>{
  event.preventDefault();
  document.getElementById("newsletterMessage").textContent="Thank you! You are on the list.";
  event.currentTarget.reset();
});

render();\n\n// Premium navigation and theme behavior\nconst themeToggle=document.getElementById("themeToggle");\nif(themeToggle){\n  themeToggle.addEventListener("click",()=>{\n    document.body.classList.toggle("dark");\n    themeToggle.textContent=document.body.classList.contains("dark")?"☀":"◐";\n  });\n}\n\ndocument.querySelectorAll("[data-category]").forEach(button=>{\n  button.addEventListener("click",()=>{\n    const category=button.dataset.category;\n    const index=questions.findIndex(question=>question.category===category);\n    if(index>=0){\n      current=index;\n      render();\n      document.getElementById("daily").scrollIntoView({behavior:"smooth"});\n    }\n  });\n});\n