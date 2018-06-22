$(document).ready(function(){
    var triviaQ = [
        {
            question: "Sequoias have the thickest ______ on Earth?", 
            choice: ["Trunks", "Roots", "Bark", "Seeds"],
            answer: 2,
            photo: "assets/img/seq1.jpg"
        },
        {
            question: "Sequoias rely on ______ to reproduce?", 
            choice: ["Fires", "Flooding", "Asexual Reproduction", "Mountain Lightning"],
            answer: 0,
            photo: "assets/img/seq2.jpg"
        }, 
        {
            question: "Sequoias can live for over ______ years?", 
            choice: ["200", "500", "1000", "3000"],
            answer: 3,
            photo: "assets/img/seq3.jpg"
        }, 
        {
            question: "The death of two Sequoias led to the founding of ______?", 
            choice: ["The National Park Service", "The EPA", "The NRA", "The Flat Earth Society"],
            answer: 1,
            photo: "assets/img/seq4.jpg"
        }, 
        {
            question: "Sequoias are the ______ trees on Earth?", 
            choice: ["Tallest", "Strongest", "Heaviest", "Meanest"],
            answer: 2,
            photo: "assets/img/seq5.jpg"
        }
    ];

    var correctNum = 0;
    var wrongNum = 0;
    var skipNum = 0;
    var qNum = triviaQ.length;
    var timer = 20;
    var intervalId = "";
    var userGuess = "";
    var count = false;
    var pick = "";
    var index = "";
    var newArray = [];
    var newArray2 = [];

    $("#playAgain").hide();
    $("#startGame").on("click", function(){
        $("#startGame").hide();
        displayQuestion();
        runTimer();
        for(var i = 0; i < triviaQ.length; i++){
            newArray2.push(triviaQ[i]);
        }
    })

    function runTimer(){
        if (!count) {
            intervalId = setInterval(decrement, 1000); 
            count = true;
        }
    }

    function decrement(){
        $("#timeLeft").html("<h2>Time left: " + timer + "</h2>");
        timer --;
        if (timer === 0){
            skipNum++;
            stop();
            $("#answerDiv").html("<p>Times up! The answer is: " + pick.choice[pick.answer] + "</p>");
            hidePic();
        }	
    }

    function stop(){
        running = false;
        clearInterval(intervalId);
    }

    function displayQuestion(){
        index = Math.floor(Math.random()*triviaQ.length);
        pick = triviaQ[index];
        $("#questionDiv").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choice.length; i++){
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            userChoice.attr("guess", i);
        $("#answerDiv").append(userChoice);
        }

        $(".answerchoice").on("click", function(){
            userGuess = parseInt($(this).attr("guess"));
            if (userGuess === pick.answer){
                stop();
                correctNum++;
                userGuess="";
                $("#answerDiv").html("<p>Correct!</p>");
                hidePic();
            }
            else {
                stop();
                wrongNum++;
                userGuess="";
                $("#answerDiv").html("<p>Whoops! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidePic();
            }
        })
    }

    function hidePic(){
        $("#answerDiv").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        triviaQ.splice(index,1);
        var hidePic = setTimeout(function(){
            $("#answerDiv").empty();
            timer = 20;
            if ((wrongNum + correctNum + skipNum) === qNum){
                $("#questionDiv").empty();
                $("#questionDiv").html("<h2>Game Over!  Here's your overall score! </h2>");
                $("#answerDiv").append("<h3> Correct Answers: " + correctNum + "</h3>");
                $("#answerDiv").append("<h3> Incorrect Answers: " + wrongNum + "</h3>");
                $("#answerDiv").append("<h3> Skipped Questions: " + skipNum + "</h3>");
                $("#playAgain").show();
                correctNum = 0;
                wrongNum = 0;
                skipNum = 0;
            }
            else {
                runTimer();
                displayQuestion();
            }
        }, 2000);
    }

    $("#playAgain").on("click", function(){
        $("#playAgain").hide();
        $("#answerDiv").empty();
        $("#questionDiv").empty();
        for(var i=0; i<newArray2.length; i++){
            triviaQ.push(newArray2[i]);
        }
        runTimer();
        displayQuestion();
    })
})