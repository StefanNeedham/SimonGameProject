const buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;

let level = 0;

const gamePattern = [];
const userClickedPattern = [];

$(".btn").on("click", clickHandler);
gameStart();

function nextSequence() {    
    level++;
    $("h1").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animateButton(randomChosenColour);
    playSound(randomChosenColour);
}

function animateButton(name) {
    $("." + name).addClass("pressed");
    setTimeout(() => {
        $("." + name).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    (new Audio("./sounds/" + name + ".mp3")).play();
}

function clickHandler(name) {
    if (level > 0) {
        const userChosenColour = name.target.id;
        userClickedPattern.push(userChosenColour);
        animateButton(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length) {
            userClickedPattern.length = 0;
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gameStart();
    }
}

function gameStart() {
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    $(document).on("keydown", ()=>{
        nextSequence();
        $(document).off("keydown");
    });
}