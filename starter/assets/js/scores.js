var highscoresEl = document.getElementById("highscores");
var clearBtnEl = document.getElementById("clear");

function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < highScores.length; i++) {
        var scoreData = highScores[i];
        var liEl = document.createElement("li");
        liEl.textContent = scoreData.initials + " - " + scoreData.score;
        highscoresEl.appendChild(liEl);
    }
}

function clearHighScores() {
    localStorage.removeItem("highScores");
    highscoresEl.innerHTML = "";
}

displayHighScores();
clearBtnEl.addEventListener("click", clearHighScores);