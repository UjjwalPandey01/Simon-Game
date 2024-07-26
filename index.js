var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("level "+ level);
        nextSequence();
        started = true;
    }
});




$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    // var clickedSoundSource = "/sounds/"+userChosenColour+".mp3";
    // console.log(clickedSoundSource);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});






function checkAnswer(currentLevel){
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){
            nextSequence();
        },1000);
    }
   }
   else{
    console.log("wrong");
    var wrongSound = "/sounds/wrong.mp3";
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    setTimeout(function(){
        $("body").removeClass("game-over");
    },600);
    startOver();
   }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);


    // Random no generator for starting the game 
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);

    // it is used to find the colour of box.
    var randomChosenColour = buttonColours[randomNumber];
    
    
    gamePattern.push(randomChosenColour);
    
    // attach the animate flash
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // it plays the sound of the starting button
    // var soundSource = "/sounds/" + randomChosenColour + ".mp3";
    playSound(randomChosenColour);
  
}

function animatePress(currentColour){
    console.log(currentColour);
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },200);
}

function playSound(name){
    var audio = new Audio("/sounds/"+name+".mp3");
    audio.play();
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;

}









