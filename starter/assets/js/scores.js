// variable used to select HTML element with ID "highscores". Used to display highscores
var highscoresEl = document.getElementById("highscores");
// variable used to select HTML element with ID "clear". Used to clear highscores
var clearBtnEl = document.getElementById("clear");

// declares a function named "displayHighScores". Responsible for retreiving highscores form local strorage, and displaying in descedning order based on score.
function displayHighScores() {
    // parsed from JSON String to JavaScript Object
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // socre in descending order
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });
    
    // loop that interaates over each high score
    for (var i = 0; i < highScores.length; i++) {
        var scoreData = highScores[i];
        // creates new list item assigned to liE1
        var liEl = document.createElement("li");
        // allows for initals to be displayed
        liEl.textContent = scoreData.initials + " - " + scoreData.score;
        highscoresEl.appendChild(liEl);
    }
}
// function allows for clearing highscore from local storage and removing it from page
function clearHighScores() {
    localStorage.removeItem("highScores");
    highscoresEl.innerHTML = "";
}

// allows for highscores to be displayed
displayHighScores();
// allows for highscores to be cleared
clearBtnEl.addEventListener("click", clearHighScores);