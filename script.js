// script.js

const factEl = document.getElementById('fact');
const refreshFactBtn = document.getElementById('refreshFact');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const scoreSection = document.getElementById('score-section');
const questionSection = document.getElementById('question-section');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedChoice = null;

// Fetch and display a random fact
async function fetchFact() {
  factEl.innerHTML = '<span class="loader"></span> Fetching...';
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
    const data = await response.json();
    factEl.innerText = data.text || "No fact found.";
  } catch (error) {
    factEl.innerText = "Couldn't load fact. Try refreshing!";
  }
}

refreshFactBtn.addEventListener('click', fetchFact);

// Sample quiz questions
questions = [
  {
    question: "Who discovered penicillin?",
    choices: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"],
    answer: "Alexander Fleming"
  },
  {
    question: "What planet is known as the Red Planet?",
    choices: ["Mars", "Jupiter", "Saturn", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["H2O", "O2", "CO2", "NaCl"],
    answer: "H2O"
  }
];

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionNumberEl.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionTextEl.innerText = currentQuestion.question;
  choicesContainer.innerHTML = '';

  const optionLabels = ['a', 'b', 'c', 'd'];
  currentQuestion.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.classList.add('choice-btn');
    btn.innerText = `${optionLabels[index]}. ${choice}`;
    btn.onclick = () => {
      Array.from(choicesContainer.children).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedChoice = choice;
      nextBtn.disabled = false;
    };
    choicesContainer.appendChild(btn);
  });

  nextBtn.disabled = true;
  nextBtn.onclick = handleNext;
}

function handleNext() {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedChoice === currentQuestion.answer) {
    score++;
  }
  currentQuestionIndex++;
  selectedChoice = null;
  showQuestion();
}

function showResults() {
  questionSection.style.display = 'none';
  scoreSection.style.display = 'block';
  scoreSection.innerHTML = `<h2>Quiz Completed!</h2><p>Your score: ${score} out of ${questions.length}</p>`;
}

// Initialize
fetchFact();
showQuestion();
