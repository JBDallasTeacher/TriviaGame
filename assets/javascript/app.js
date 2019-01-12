$(document).ready(function () {
    // Create a function that creates the start button and initial screen

    function openingPage() {
        //alert('entro');
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Trivia</a></p>";
        $("#mainArea").append(openScreen);
    }

    openingPage();

    //on-click event for start button to begin name

    $("#mainArea").on("click", ".start-button", function (event) {
        //alert ('paso');
        event.preventDefault();  // added line to test issue on GitHub Viewer
        //clickSound.play();
        $('.jumbotron').hide();
        generateQuestions();
        timerWrapper();

    }); // Closes start-button click

    $("body").on("click", ".answer", function (event) {

        //clickSound.play();
        selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert("correct");
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert("wrong answer!");
                clearInterval(theClock),
                generateLoss()
            )
    });

    $("body").on("click", ".reset-button", function (event) {
        //clickSound.play();
        resetGame();
    }); // Closes reset-button click

});  //  Closes jQuery wrapper

function timeoutLoss() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrongAnswer.gif'>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
    $("#mainArea").html(gameHTML);

    setTimeout(wait, 3000);  //end generatewin
}

function generateLoss() {
    incorrectTally++;
    //alert('llego');
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrongAnswer.gif'>";
    $("#mainArea").html(gameHTML);
    setTimeout(wait, 3000);
}
//end generate loss

function generateQuestions() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $("#mainArea").html(gameHTML);
}; //end generate question

function wait() {
    //ternary operator replacing if/else for generate more questions
    questionCounter < 7 ?
        (questionCounter++ ,
            generateQuestions(),
            counter = 30,
            timerWrapper()) :

        (finalScreen())
}; //end function

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            timeoutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Completed, here are your results!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Trivia!</a></p>";
    $("#mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateQuestions();
    timerWrapper();
}

var openScreen;
var gameHTML;
var counter = 30;
var questionArray =
    ["Which country was the first Soccer World Cup winner in 1930?",
        "Country winner in Mexico 1970?",
        "Country winner in Italy 1934?",
        "Country winner in Brasil 2014?",
        "Country winner in England 1966?",
        "Country winner in Argentina 1978?",
        "Country winner in France 1998?",
        "Country winner in Moscow 2018?"];

var answerArray = [
    ["Brazil", "Italy", "Uruguay", "England"],
    ["Germany", "Netherlands", "Brazil", "Mexico"],
    ["France", "Italy", "Spain", "Argentina"],
    ["Brasil", "Germany", "Argentina", "Chile"],
    ["Netherland", "England", "Germany", "Brazil"],
    ["Colombia", "Germany", "Argentina", "Italy"],
    ["Spain", "Italy", "France", "Mexico"],
    ["France", "Rusia", "Croatia", "Belgium"]];

var imageArray = new Array();
imageArray[0] = "<img class='center-block' src='assets/images/Uruguay.jpg'>";
imageArray[1] = "<img class='center-block' src='assets/images/Brazil.jpg'>";
imageArray[2] = "<img class='center-block' src='assets/images/Italy.png'>";
imageArray[3] = "<img class='center-block' src='assets/images/Germany.jpg'>";
imageArray[4] = "<img class='center-block' src='assets/images/England.png'>";
imageArray[5] = "<img class='center-block' src='assets/images/Argentina.jpg'>";
imageArray[6] = "<img class='center-block' src='assets/images/France.jpg'>";
imageArray[7] = "<img class='center-block' src='assets/images/France.jpg'>";

var correctAnswers =
    ["C. Uruguay",
        "C. Brazil",
        "B. Italy",
        "B. Germany",
        "B. England",
        "C. Argentina",
        "C. France",
        "A. France"];

var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
    