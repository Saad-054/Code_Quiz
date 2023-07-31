document.addEventListener("DOMContentLoaded", function() {
    var timer;
    var timeLeft = 60;
    var currentQuestionIndex = 0;
    var score = 0;

    var containerEl = document.querySelector(".container");
    var timerEl = document.querySelector("#time");
    var startScreenEl = document.getElementById("start-screen");
    var questionsEl = document.getElementById("questions");
    var questionTitleEl = document.getElementById("question-title");
    var choicesEl = document.getElementById("choices");
    var feedbackEl = document.getElementById("feedback");
    var endScreenEl = document.getElementById("end-screen");
    var finalScoreEl = document.getElementById("final-score");
    var initialsInputEl = document.getElementById("initials");
    var submitBtnEl = document.getElementById("submit");
    var highscoresLinkEl = document.querySelector(".scores a");

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

    var startBtn = document.getElementById("start");
    if (startBtn) {
        startBtn.addEventListener("click", startQuiz);
    }

    if (submitBtnEl) {
        submitBtnEl.addEventListener("click", saveHighScore);
    }

    if (highscoresLinkEl) {
        highscoresLinkEl.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "highscores.html";
        });
    }
});