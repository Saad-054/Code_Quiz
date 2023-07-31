var highscoresE1 = document.getElementById("highscores");
var clearBtnE1 - document.getElementById("clear");

function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < highScores.length; i++) {
        var scoreData = highScores[i];
        var liE1 = document.createElement("li");
        liE1.textContent = scoreData.iniitals + " - " + scoreData.score;
        highscoresE1.appendChild(liE1);
    }
}

function clearHighScores() {
    localStorage.removeItem("highScores");
    highscoresE1.innerHTML = "";
}

displayHighScores();
clearBtnE1.addEventListener("click", clearHighScores);