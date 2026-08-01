const questions=[
{category:"Science",question:"Which planet is known as the Red Planet?",answers:["Venus","Jupiter","Mars","Mercury"],correct:2,explanation:"Mars is called the Red Planet because iron minerals on its surface oxidize and create a reddish appearance."},
{category:"Geography",question:"What is the capital city of Australia?",answers:["Sydney","Canberra","Melbourne","Perth"],correct:1,explanation:"Canberra was selected as Australia's capital as a compromise between Sydney and Melbourne."},
{category:"History",question:"Which civilization built Machu Picchu?",answers:["Roman","Maya","Inca","Egyptian"],correct:2,explanation:"Machu Picchu was built by the Inca civilization during the fifteenth century."},
{category:"Sport",question:"How many players are on one football team on the field?",answers:["9","10","11","12"],correct:2,explanation:"A football team normally has eleven players on the field, including the goalkeeper."},
{category:"Animals",question:"Which animal is the largest mammal on Earth?",answers:["African elephant","Blue whale","Giraffe","Whale shark"],correct:1,explanation:"The blue whale is the largest known animal to have lived on Earth."},
{category:"Technology",question:"What does CPU stand for?",answers:["Central Processing Unit","Computer Personal Utility","Core Program User","Central Power Utility"],correct:0,explanation:"CPU stands for Central Processing Unit, the processor that executes instructions."},
{category:"Science",question:"What gas do plants absorb from the atmosphere?",answers:["Oxygen","Hydrogen","Carbon dioxide","Nitrogen"],correct:2,explanation:"Plants absorb carbon dioxide and use it during photosynthesis."},
{category:"Geography",question:"Which ocean is the largest on Earth?",answers:["Atlantic","Pacific","Indian","Arctic"],correct:1,explanation:"The Pacific Ocean is the largest and deepest ocean on Earth."}
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
const skipButton=document.getElementById("skipButton");
const timer=document.getElementById("timer");
const timerFill=document.getElementById("timerFill");

function renderQuestion(){
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

  q.answers.forEach((answer,index)=>{
    const button=document.createElement("button");
    button.type="button";
    button.className="answer-button";
    button.innerHTML=`<span class="answer-letter">${letters[index]}</span><span>${answer}</span>`;
    button.addEventListener("click",()=>selectAnswer(index));
    answerGrid.appendChild(button);
  });

  updateTimer();
  timerId=setInterval(()=>{
    timeLeft--;
    updateTimer();
    if(timeLeft<=0){
      clearInterval(timerId);
      revealAnswer(null);
    }
  },1000);
}

function updateTimer(){
  timer.textContent=String(timeLeft).padStart(2,"0");
  timerFill.style.width=`${timeLeft*10}%`;
}

function selectAnswer(index){
  if(answered)return;
  clearInterval(timerId);
  revealAnswer(index);
}

function revealAnswer(selected){
  answered=true;
  const q=questions[current];

  document.querySelectorAll(".answer-button").forEach((button,index)=>{
    button.disabled=true;
    if(index===q.correct)button.classList.add("correct");
    if(index===selected && index!==q.correct)button.classList.add("wrong");
  });

  if(selected===null){
    feedbackTitle.textContent=`Time is up. The correct answer is ${letters[q.correct]}: ${q.answers[q.correct]}.`;
  }else if(selected===q.correct){
    feedbackTitle.textContent="Correct!";
  }else{
    feedbackTitle.textContent=`The correct answer is ${letters[q.correct]}: ${q.answers[q.correct]}.`;
  }

  explanationText.textContent=q.explanation;
  nextButton.disabled=false;
}

function nextQuestion(){
  current=(current+1)%questions.length;
  renderQuestion();
}

nextButton.addEventListener("click",nextQuestion);
skipButton.addEventListener("click",nextQuestion);

document.querySelectorAll("[data-category]").forEach(button=>{
  button.addEventListener("click",()=>{
    const index=questions.findIndex(q=>q.category===button.dataset.category);
    if(index>=0){
      current=index;
      renderQuestion();
      document.getElementById("quiz").scrollIntoView({behavior:"smooth"});
    }
  });
});

document.getElementById("themeToggle").addEventListener("click",event=>{
  document.body.classList.toggle("dark");
  event.currentTarget.textContent=document.body.classList.contains("dark")?"☀":"◐";
});

renderQuestion();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const type = document.getElementById("contactType").value;
    const message = document.getElementById("contactMessage").value.trim();
    const status = document.getElementById("contactStatus");

    if (!name || !email || !type || !message) {
      status.textContent = "Please complete all fields.";
      return;
    }

    const subject = `[Choose One Answer] ${type}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Message type: ${type}`,
      "",
      message
    ].join("\n");

    const mailto = `mailto:chooseoneanswer@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = "Opening your email application with the message ready to send...";
    window.location.href = mailto;
  });
}
