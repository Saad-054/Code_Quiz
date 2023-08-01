// adds event listenertot he document object. When DOMContentLoaded eveent occurs, event listener will be executed
document.addEventListener("DOMContentLoaded", function() {

    // variables related to timer, seconds, questionindex and score
    var timer;
    var timeLeft = 60;
    var currentQuestionIndex = 0;
    var score = 0;

    // used for conatainer holding quiz content
    var containerEl = document.querySelector(".container");
    // used for timer displayed on page
    var timerEl = document.querySelector("#time");
    // used for start screen of quiz
    var startScreenEl = document.getElementById("start-screen");
    // used for question eleemnt content
    var questionsEl = document.getElementById("questions");
    // used for displaying question
    var questionTitleEl = document.getElementById("question-title");
    // used for holding answer choices
    var choicesEl = document.getElementById("choices");
    // used to provide feedback once answer seleected
    var feedbackEl = document.getElementById("feedback");
    // used for end screen when quiz completed
    var endScreenEl = document.getElementById("end-screen");
    // used for final score being displayed
    var finalScoreEl = document.getElementById("final-score");
    // used for button for putting initials for scores
    var initialsInputEl = document.getElementById("initials");
    // used for button for submitting initial for score
    var submitBtnEl = document.getElementById("submit");
    // used for link to select highscores
    var highscoresLinkEl = document.querySelector(".scores a");

    // function for starting quiz and timer countdown
    function startQuiz() {
        if (containerEl) {
            containerEl.style.display = "block";
        }
        if (startScreenEl) {
            startScreenEl.style.display = "none";
        }
        timer = setInterval(function() {
            timeLeft--;
            timerEl.textContent = timeLeft;

            if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
                endQuiz();
            }
        }, 1000);

        displayQuestion();
    }

    // fucntion for displaying question
    function displayQuestion() {
        questionsEl.classList.remove ("hide")
        var currentQuestion = questions[currentQuestionIndex];
        questionTitleEl.textContent = currentQuestion.question;
        choicesEl.innerHTML = "";

        for (var i =0; i < currentQuestion.choices.length; i++) {
            var choice = currentQuestion.choices[i];
            var choiceBtn = document.createElement("button");
            choiceBtn.textContent = choice;
            choiceBtn.setAttribute("class", "choice");
            choiceBtn.addEventListener("click", checkAnswer);
            choicesEl.appendChild(choiceBtn);
        }
    }

    // function for user's answer selection. If incorrect, timer goes down by 10
    function checkAnswer(event) {
        var selectedChoice = event.target.textContent
        var currentQuestion = questions[currentQuestionIndex];

        if (selectedChoice === currentQuestion.answer) {
            feedbackEl.textContent = "Correct!";
            score += 10;
        } else {
            feedbackEl.textContent = "Wrong!";
            timeLeft -= 10;
        }

        currentQuestionIndex++;
        displayQuestion();
    }

    // function for end of quiz and displayign final score
    function endQuiz() {
        clearInterval(timer);
        if (questionsEl) {
            questionsEl.style.display = "none";
        }
        if (endScreenEl) {
            endScreenEl.style.display = "block";
        }
        finalScoreEl.textContent = score;
    }

    // function for saving the high score with uder's initials
    function saveHighScore() {
        var initials = initialsInputEl.value.trim();

        if (initials !== "") {
            var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            var newScore = {
                initials: initials,
                score: score
            };

            highScores.push(newScore);
            localStorage.setItem("highScores", JSON.stringify(highScores));

            window.location.href = "highscores.html";
        }
    }

    // start button add events listner callign startquiz function when clicked
    var startBtn = document.getElementById("start");
    if (startBtn) {
        startBtn.addEventListener("click", startQuiz);
    }

    // adds event listener calling the saveHighScore when clicked
    if (submitBtnEl) {
        submitBtnEl.addEventListener("click", saveHighScore);
    }

    // redirects to highscores
    if (highscoresLinkEl) {
        highscoresLinkEl.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "highscores.html";
        });
    }
});