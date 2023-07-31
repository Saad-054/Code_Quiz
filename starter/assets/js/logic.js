document.addEventListener("DOMcontentLoaded", function() {
    var timer;
    var timeLeft = 60;
    var currentQuestionsIndex = 0;
    var score = 0;

    var containerE1 = document.querySelector(".container");
    var timerE1 = document.querySelector("#time");
    var startScreenE1 = document.getElementById("start-screen");
    var questionsE1 = document.getElementById("questions");
    var questionTitleE1 = document.getElementById("question-title");
    var choicesE1 = document.getElementById("choices");
    var feedbackE1 = document.getElementById("feedback");
    var endScreenE1 = document.getElementById("end-screen");
    var finalScoreE1 = document.getElementById("final-score");
    var initialsInputE1 = document.getElementById("initials");
    var submitBTnE1 = document.getElementById("submit");
    var highscoresLinkE1 = document.querySelector(".scores a");

    function startQuiz() {
        if (containerE1) {
            containE1.style.display = "block";
        }
        If (startScreenE1) {
            startScreenE1.style.display = "none";
        }
        timer = setInterval(function() {
            timeLeft--;
            timerE1.textContent = timeLeft;

            if (timeLeft <= 0 || currentQuestionsIndex === questions.length) {
                endQuiz();
            }
        }, 1000;

        displayQuestion();
    }

    function displayQuestion() {
        questionsE1.classList.remove ("hide")
        var currentQuestion = questions[currentQuestionIndex];
        questionTitleE1.textContent = currentQuestion.question;
        choicesE1.innerHTML = "";

        for (var i =0; i < currentQuestion.choices.length; i++) {
            var choice = currentQuestion.choices[i];
            var choiceBtn = document.createElement("button");
            choiceBtn.textContent = choice;
            choiceBtn.setAttribute("class", "choice");
            choiceBtn.addEventListener("click", checkAnswer);
            choicesE1.appendChild(choiceBtn);
        }
    }

    function checkAnswer(event) {
        var selectedChoice = event.target.textContent
        var currentQuestion = questions[currentQuestionsIndex];

        if (selectedChoice === currentQuestion.answer {
            feedbackE1.textContent = "Correct!";
            score += 10;
        } else {
            feedbackE1.textContent = "Wrong!";
            timeLeft -= 10;
        }

        currentQuestionIndex++;
        displayQuestion();
    }

    function endQuiz() {
        clearInterval(timer);
        if (questionsE1) {
            questionsE1.style.display = "none";
        }
        if (endScreenE1) {
            endScreenE1.style.display = "block";
        }
        finalScoreE1.textContent = score;
    }

    function saveHighScore() {
        var initials = initialsInputE1.value.trim();

        if (initials !== "") {
            var highSscores = JSON.parse(localStorage.getItem("highScores")) || [];
            var mewScore = {
                initials: initials,
                score: score
            };

            highSscores.push(newScore);
            localStorage.setItem("highScores", JSON.stringify(highSscores));

            window.location.href = "highscores.html";
        }
    }

    var startBtn = document.getElementById("start");
    if (startBtn) {
        startBtn.addEventListener("click", startQuiz);
    }

    if (submitBTnE1) {
        submitBTnE1.addEventListener("click, saveHighScore");
    }

    if








        
    }

}   











)