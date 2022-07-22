let buttonColour =["red", "blue", "green", "yellow"]
let gamePattern =[]
let userClickPattern=[]
let hasStart = false
let level = 0

;
 $(".btn").click(handle)

 function handle() {
   // this represent the button ".btn"
   // here we say, take the id property from btn using this as reference
   let userChosenColour = $(this).attr("id")
    userClickPattern.push(userChosenColour)
      playSound(userChosenColour)
      animatePress(userChosenColour)

      // use the last color clicked as parameter to check the pattern
      checkAnswer(userClickPattern.length-1)
 }

// use any key to start the game
 $(document).on("keydown", function() {
     if(!hasStart){
       $("h1").text("Level "+level)
       nextSequence()
       hasStart = true
     }
 })
// check if the user is following the pattern
 function checkAnswer(currentLevel) {
   //if the color show is what the user peicked
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
      console.log("success");

        // then checked if the length of each array is the same to see if it's the same pattern
        if (userClickPattern.length ===gamePattern.length ) {
          // if yes give another color after a timeout by calling nextSequence
          setTimeout(function () {
            nextSequence()
            }, 1000)
        }
      }

      // if user not following the pattern,
      else {
            console.log("wrong");
            // play the song by calling playSound
            playSound("wrong")
            // change the background-color by adding a class for style
            $("body").addClass("game-over")
            // then remove the class
            setTimeout(function () {
              $("body").removeClass("game-over")
            }, 200)

            // Tell the user he lost
            $("#level-title").text("Game Over, Press Any Key to Restart")

            // start Over by calling the function startOver
            startOver()
          }
 }


function nextSequence() {
  userClickPattern = []
  level++
  $("h1").text("Level "+level)

  // creaate  random number
  const randomNumber = Math.floor(Math.random()*4)
  // get random color from the color array
  const randomChosenColour = buttonColour[randomNumber]
  // add them to gamePattern array
  gamePattern.push(randomChosenColour)

  // create an effect when a color is picked
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    // paly the color song
    playSound(randomChosenColour)

}
// create a function to create song
function playSound(name) {
  // with a parameter, we can use the function call the fucntion use it later
  let audio = new Audio("sounds/" + name +".mp3")
  audio.play()
}

// create a function to get animation for the caolor clicked on
function animatePress(currentColour) {
  // use the parameter to get the right color cliked on and add the class for animation
  $("#" +currentColour ).addClass("pressed")

  // then removethe animation after clicked
  setTimeout(function() {
    $("#" +currentColour ).removeClass("pressed")
  }, 100)
}

// create a function to start the over when game over
function startOver() {
    level=0;
    gamePattern=[]
    hasStart = false
}
