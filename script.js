const questionImage = document.getElementById('question-image');
const questionText = document.getElementById('question');
const options = document.querySelectorAll('.option');
const feedback = document.getElementById('feedback');

const scoreElement = document.createElement('div');
const opportunitiesElement = document.createElement('div');
const gameOverMessage = document.createElement('div');
gameOverMessage.id = 'game-over';
gameOverMessage.style.display = 'none';
gameOverMessage.style.position = 'absolute';
gameOverMessage.style.top = '50%';
gameOverMessage.style.left = '50%';
gameOverMessage.style.transform = 'translate(-50%, -50%)';
gameOverMessage.style.fontSize = '3em';
gameOverMessage.style.color = 'red';
gameOverMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
gameOverMessage.style.padding = '20px';
gameOverMessage.style.borderRadius = '10px';
gameOverMessage.style.textAlign = 'center';
gameOverMessage.style.animation = 'fadeIn 2s ease-in-out';

document.body.appendChild(gameOverMessage);

const questions = [
    {
        image: 'dog.png',
        question: 'What is this word?',
        answers: ['Dog', 'Cat', 'Rabbit'],
        correct: 'Dog'
    },
    {
        image: 'cat.png',
        question: 'What is this word?',
        answers: ['Rabbit', 'Cat', 'Dog'],
        correct: 'Cat'
    },
    {
        image: 'rabbit.png',
        question: 'What is this word?',
        answers: ['Cat', 'Rabbit', 'Dog'],
        correct: 'Rabbit'
    },
    {
        image: 'ostrich.png',
        question: 'What is this word?',
        answers: ['Ostrich', 'Elephant', 'Owl'],
        correct: 'Ostrich'
    },
    {
        image: 'owl.png',
        question: 'What is this word?',
        answers: ['Elephant', 'Owl', 'Ostrich'],
        correct: 'Owl'
    },
    {
        image: 'elephant.png',
        question: 'What is this word?',
        answers: ['Dog', 'Elephant', 'Rabbit'],
        correct: 'Elephant'
    }
];

let shuffledQuestions = []; // To store shuffled questions
let currentQuestionIndex = 0;
let score = 0;
let opportunities = 3; // Number of opportunities left

// Shuffle questions
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

function updateUI() {
    scoreElement.textContent = `Score: ${score}`;
    opportunitiesElement.textContent = `Opportunities Left: ${opportunities}`;
    gameOverMessage.innerHTML = `GAME OVER<br>Score: ${score}<br>Opportunities Left: ${opportunities}`;
}

function loadQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionImage.src = currentQuestion.image;
    questionText.textContent = currentQuestion.question;

    options.forEach((option, index) => {
        option.textContent = currentQuestion.answers[index];
        option.onclick = () => checkAnswer(option.textContent);
    });
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correct) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        score += 10; // Increment score for correct answer
        currentQuestionIndex++;

        if (currentQuestionIndex < shuffledQuestions.length) {
            setTimeout(() => {
                feedback.textContent = '';
                updateUI();
                loadQuestion();
            }, 1000);
        } else {
            setTimeout(() => {
                feedback.textContent = `Congratulations, you finished the game with a score of ${score}!`;
                updateUI();
            }, 1000);
        }
    } else {
        feedback.textContent = 'Try again';
        feedback.style.color = 'red';
        opportunities--;
        updateUI();

        if (opportunities === 0) {
            setTimeout(() => {
                feedback.textContent = '';
                gameOverMessage.style.display = 'block';
                setTimeout(() => {
                    gameOverMessage.style.display = 'none';
                    currentQuestionIndex = 0;
                    score = 0;
                    opportunities = 3;
                    shuffleQuestions();
                    updateUI();
                    loadQuestion();
                }, 4000);
            }, 1000);
        }
    }
}

// Initialize the game
shuffleQuestions();
updateUI();
loadQuestion();
