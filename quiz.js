const questions = [
  {
    question: "Article related to Equality of opportunity is?",
    options: [ "Articles 14", "Articles 15 ", "Articles 16", "Articles 17"],
    correct: 2,
  },
  {
    question:  "Fundamental duties are added in which amendment?",
    options: [ "Amendment 42", "Amendment 35", "Amendment 40", "Amendment 46"],
    correct: 0,
  },
    
  {
    question:  "How many writs can be issued by the supreme court?",
    options: [ "Six", "Four", "Five", "Seven"],
    correct: 2,
  }
 

   
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option');
const feedbackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.querySelector('.quiz-container');
const certificateContainer = document.getElementById('certificate-container');
const userNameElement = document.getElementById('user-name');
const userScoreElement = document.getElementById('user-score');
const totalQuestionsElement = document.getElementById('total-questions');

 
loadQuestion();

function loadQuestion() {
  feedbackElement.textContent = '';
  nextBtn.style.display = 'none';
  
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionButtons.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.disabled = false;
    button.style.backgroundColor = '#3498db';
  });
}

function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  optionButtons.forEach(button => button.disabled = true);
  
  if (selectedIndex === currentQuestion.correct) {
    feedbackElement.textContent = 'Correct!';
    optionButtons[selectedIndex].style.backgroundColor = '#27ae60'; // Green
    score++;
  } else {
    feedbackElement.textContent = 'Incorrect!';
    optionButtons[selectedIndex].style.backgroundColor = '#e74c3c'; // Red
    optionButtons[currentQuestion.correct].style.backgroundColor = '#27ae60'; // Green
  }
  
  nextBtn.style.display = 'block';
}

function nextQuestion() {
  quizContainer.classList.add('animate');
  
  setTimeout(() => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      quizContainer.classList.remove('animate');
    } else {
      showCertificate();
    }
  }, 500);
}

function showCertificate() {
  quizContainer.style.display = 'none';
  certificateContainer.style.display = 'block';
  
  const userName = prompt("Enter your name for the certificate:");
  userNameElement.textContent = userName ? userName : 'User';
  userScoreElement.textContent = score;
  totalQuestionsElement.textContent = questions.length;
}

function downloadCertificate() {
  const certificateElement = document.querySelector('.certificate');
  html2canvas(certificateElement).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'certificate.png';
    link.click();
  });
}
