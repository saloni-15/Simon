//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColors = ["red", "blue", "green", "yellow"];

//5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

//12. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

var started = false;

//21.Create a new variable called level and start at level 0.
var level = 0;


//20.Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
//21.The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//10.Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
//11.Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
//13.Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern.
//14.In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played.
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  //console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  playSound(userChosenColor);

  animatePress(userChosenColor);

//25.Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});


//24.Create a new function called checkAnswer(), it should take one input with the name currentLevel.
function checkAnswer(currentLevel) {


//26.Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
//27.If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (gamePattern.length === userClickedPattern.length) {
//28. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    //console.log("wrong");

//30.In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

//31. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

//32.Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong
    $("#level-title").text("Game Over, Press Any Key to Restart");

//35.Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}


//16.Create a new function called animatePress(), it should take a single input parameter called currentColour.
//17.Take a look inside the styles.css file, you can see there is a class called "pressed", it will add a box shadow and changes the background colour to grey.
//18.Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
//19.Use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//1. Inside game.js create a new function called nextSequence()
function nextSequence() {

//29.Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

//22.Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

//23.Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

//2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

//4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColor = buttonColors[randomNumber];

//6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColor);

//7. Use jQuery to select the button with the same id as the randomChosenColour
//8.Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 7.
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}


//15.Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
//9. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 7.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//34.Create a new function called startOver().
//36.Inside this function, you'll need to reset the values of level, gamePattern and started variables.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
