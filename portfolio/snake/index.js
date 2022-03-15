// Check that the JS is working
console.log("JS RUNNING");

let highScore = 0;
let boardSize = 16;
let gameOverText = "GAME OVER";
let tickSpeed = 100;
let mainCalled = false;

// Call grid generator
genDivs(boardSize);

// Create all variables for snake
// Bools to track direction of snake
let up = false;
let right = false;
let down = false;
let left = false;
// Strings to compare the position of the snakes head and tail to div ids
let snakeHead = ["0 0"];
let snakeTail = ["0 0"];
// Int to tarack the snakes length
let snakeLength = 3;
// Ints to track the x & y positions of the snakes head and tail
let xTail = 0;
let yTail = 0;
let xHead = 0;
let yHead = 0;
// Ints to track the current food items position
let xFood = 15;
let yfood = 15;
// String to compare the food's pos to the div ids
let foodPos = ["15 15"];
// Bool to track wether or not there is a food item on the board
let isFood = false;
// Arays to track where the snake currently is
let xHistory = [0];
let yHistory = [0];
// Bool to track if the player lost
let gameOver = false;
// Bool to keep track of wether an input was recived this tick
let gotInput = false;
// int to keep track of score
let snakeScore = 0;

// Event listener scanning for arrow key presses
window.addEventListener('keydown', function(e) {
  // console.log('You pressed ' + e.key); // TESTING LINE
  // If the ArrowUp key is pressed and the snake isnt going down, set the snakes current state to up
  if((e.key == "ArrowUp" || e.key == "w") && !down && !gotInput){
    // console.log('Up Sucess'); // TESTING LINE
    // Set up to true and all other directions to false
    up = true;
    right = false;
    down = false;
    left = false;
    gotInput = true;
  // Repeat with right/left
}else if((e.key == "ArrowRight" || e.key == "d") && !left && !gotInput){
    up = false;
    right = true;
    down = false;
    left = false;
    gotInput = true;
  // Repeat with down/up
}else if((e.key == "ArrowDown" || e.key == "s") && !up && !gotInput){
    up = false;
    right = false;
    down = true;
    left = false;
    gotInput = true;
  // Repeat with left/right
}else if((e.key == "ArrowLeft" || e.key == "a") && !right && !gotInput){
    up = false;
    right = false;
    down = false;
    left = true;
    gotInput = true;
  }else{
    console.log("BAD KEYPRESS");
  }
});

document.getElementById("restart").addEventListener('click', function(){
  document.getElementById("header").innerHTML = "JAVASCRIPT SNAKE";
  if(!mainCalled){
      main()
  }
})

document.getElementById("veryhard").addEventListener('click', function(){
  tickSpeed = 50;
  document.getElementById("difHead").innerHTML = ["CURRENT DIFFICULTY: VERY HARD [" + tickSpeed + "ms/tick]"];
})
document.getElementById("hard").addEventListener('click', function(){
  tickSpeed = 75;
    document.getElementById("difHead").innerHTML = ["CURRENT DIFFICULTY: HARD [" + tickSpeed + "ms/tick]"];
})
document.getElementById("medium").addEventListener('click', function(){
  tickSpeed = 100;
  document.getElementById("difHead").innerHTML = ["CURRENT DIFFICULTY: MEDIUM [" + tickSpeed + "ms/tick]"];
})
document.getElementById("easy").addEventListener('click', function(){
  tickSpeed = 175;
  document.getElementById("difHead").innerHTML = ["CURRENT DIFFICULTY: EASY [" + tickSpeed + "ms/tick]"];
})
document.getElementById("veryeasy").addEventListener('click', function(){
  tickSpeed = 300;
  document.getElementById("difHead").innerHTML = ["CURRENT DIFFICULTY: VERY EASY [" + tickSpeed + "ms/tick]"];
})

// TESTING LINES
// document.getElementById(snakeHead).classList.toggle('cellOn')
// console.log(document.getElementById(snakeHead).className);
// console.log(document.getElementById(snakeHead).className == "cell cellOn");

// Call main(), everything below this is functions
main();

//--------------------------------------------------------------------------------------------------------------//

function main(){
  console.log("MAIN CALLED");
  mainCalled = true;
  // reset snakeBoard
  // For each row
  for(var i = 0; i < boardSize; i++){
    // For each column in that row
    for(var x = 0; x <= boardSize-1; x++){
        // Reset div class name to "cell"
        document.getElementById(x + " " + i).className = "cell";
    }
  }


  // reset all variables for snake
  up = false;
  right = false;
  down = false;
  left = false;
  snakeHead = ["0 0"];
  snakeTail = ["0 0"];
  snakeLength = 3;
  xTail = 0;
  yTail = 0;
  xHead = 0;
  yHead = 0;
  xFood = 15;
  yfood = 15;
  foodPos = ["15 15"];
  isFood = false;
  xHistory = [0];
  yHistory = [0];
  gameOver = false;
  gotInput = false;
  snakeScore = 0;

  // Turn on the top left cell to indicate starting position
  document.getElementById(snakeHead).classList.toggle('cellOn');

  waitToStart();
}


// main() waits for the player to press a key, and then starts the game
function waitToStart() {
  // Run this function repeatedly every 100milisec
  setTimeout(function onTick() {
    // Only accepts a right or down keypress because left and up would immeadiately end the game
    // If one of these keys is pressed start the game with gameOn()
    if(right||down){
      gameOn();
    // Else call main again till a key is pressed
    }else{
      waitToStart();
    }
  }, 100)
}

function gameOn() {
  // Run this function repeatedly every 100milisec
  setTimeout(function onTick() {
    // console.log("up: "+ up); // TESTING LINE
    // console.log("right: "+ right); // TESTING LINE
    // console.log("down: "+ down); // TESTING LINE
    // console.log("left: "+ left); // TESTING LINE

    // If there isnt food on the board, generate a food item in any position except where the snake is
    if(!isFood){
      genFood();
    }

    //console.log(Math.floor(Math.random() * boardSize)); // TESTING LINE

    // Change xHead & yHead based on the snakes current movement state / the player's last button press
    if(up){
      // Must ask if yHead > 0 to keep the snake within the top bound
      if(yHead > 0){
        // Decrease yHead by one to move snake
        yHead--;
      }else{
        gameOver = true;
        gameOverText = "GAME OVER";
      }
    }else if(down){
      // Must ask if yHead < 15 to keep the snake within the bottom bound
      if(yHead < 15){
        yHead++;
      }else{
        gameOver = true;
        gameOverText = "GAME OVER";
      }
    }else if(left){
      // Must ask if xHead > 0 to keep the snake within the left bound
      if(xHead > 0){
        xHead--;
      }else{
        gameOver = true;
        gameOverText = "GAME OVER";
      }
    }else if(right){
      // Must ask if xHead < 15 to keep the snake within the right bound
      if(xHead < 15){
        xHead++;
      }else{
        gameOver = true;
        gameOverText = "GAME OVER";
      }
    }

    // Put the snake's head location into an array of where the snake has been
    xHistory.push(xHead);
    yHistory.push(yHead);

    // Set snakeHead string to hold the snakeHead's current location
    snakeHead = [xHead + " " + yHead];
    // console.log(snakeHead); // TESTING LINE;
    if(document.getElementById(snakeHead).className == "cell") {
      document.getElementById(snakeHead).classList.toggle('cellOn');
    }else if(document.getElementById(snakeHead).className == "cell cellFood"){
      document.getElementById(snakeHead).classList.toggle('cellFood');
      document.getElementById(snakeHead).classList.toggle('cellOn');
      snakeLength++;
      isFood = false;
    }else if(!gameOver){
      gameOver = true;
      gameOverText = "GAME OVER";
    }

    // Once the snake has moved enough start removing it's tail
    if(xHistory.length > snakeLength){
      // Set the tail location to be snakeLength units into the snakes history
      xTail = [xHistory[xHistory.length - 1 - snakeLength]];
      yTail = [yHistory[yHistory.length - 1 - snakeLength]];
      snakeTail = [xTail + " " + yTail];
      // Remove the items in snake history that are no longer part of the snake
      xHistory.splice(xHistory.length - 1 - snakeLength, 1);
      yHistory.splice(yHistory.length - 1 - snakeLength, 1);

      // console.log(xHistory); // TESTING LINE
      // console.log(yHistory); // TESTING LINE
      // console.log(snakeTail); // TESTING LINE
      if(document.getElementById(snakeTail).className == "cell cellOn") {
        // console.log("yes"); // TESTING LINE
        document.getElementById(snakeTail).classList.toggle('cellOn');
      }
    }

    // If the game is over call gameIsOver to end the game and don't call gameOn again
    if(gameOver){
      gameIsOver()
    // Else call gameOn again and prepare for another input next tick
    }else{
      snakeScore = (snakeLength-3);
      document.getElementById("score").innerHTML = ["SCORE: " + snakeScore]
      if(snakeScore > highScore){
        highScore = snakeScore;
      }
      document.getElementById("highscore").innerHTML = ["HIGH SCORE: " + highScore];
      gotInput = false;
      gameOn();
    }
  }, tickSpeed)
}

function genFood(){
  xFood = Math.floor(Math.random() * boardSize);
  yFood = Math.floor(Math.random() * boardSize);
  foodPos = [xFood + " " + yFood];

  // if the randomly chosen coords are an empty cell
  if(document.getElementById(foodPos).className == "cell") {
    // turn the randomly chosen coords into food
    document.getElementById(foodPos).classList.toggle('cellFood');
    // set isFood to true bcause there is now food on the board
    isFood = true;
  // Else the random coords must be part of the snake so we call genFood again to re-try
  }else{
    genFood();
  }
}

function gameIsOver(){
  document.getElementById("header").innerHTML = gameOverText;
  mainCalled = false;
}

// Funtion to generate snake board
function genDivs(v){
      // Generates board in snakeBoard section
      var e = document.getElementById("snakeBoard");
      // For each row
      for(var i = 0; i < v; i++){
        // Generate a div with class name "row"
        var row = document.createElement("div");
        row.className = "row";
        // For each column in that row
        for(var x = 0; x <= v-1; x++){
            // Generate a div with class name "cell"
            var cell = document.createElement("div");
            cell.className = "cell";
            // Set the id of each cell to be its coordinates in the grid x = left-->right, y = top-->bottom
            cell.setAttribute("id", x + " " + i);
            // Add the new div to the current row
            row.appendChild(cell);
        }
        // Add the new row to the section
        e.appendChild(row);
      }
    }
