console.log("JS RUNNING");  // Check that the JS is working



const settingsForm = document.getElementById('settings-form');
settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

const backToGameButton = document.getElementById('back-to-game');
backToGameButton.addEventListener('click', () => {
    document.getElementById('settings').style.display = 'none';
    console.log('press');
});

const settingsButtom = document.getElementById('settings-button');
settingsButtom.addEventListener('click', () => {
    document.getElementById('settings').style.display = 'block';
});

let highScore = 0;
let height = 16;
let width = 24;
let gameOverText = "GAME OVER";
let tickSpeed = 100;
let mainCalled = false;

let up = false;             // Bools to track direction of snake
let right = false;
let down = false;
let left = false;
let snakeHead = ["0 0"];    // Strings to compare the position of the snakes head and tail to div ids
let snakeTail = ["0 0"];
let snakeLength = 3;        // Int to tarack the snakes length
let xTail = 0;              // Ints to track the x & y positions of the snakes head and tail
let yTail = 0;
let xHead = 0;
let yHead = 0;
let xFood = 15;             // Ints to track the current food items position
let yfood = 15;
let foodPos = ["15 15"];    // String to compare the food's pos to the div ids
let isFood = false;         // Bool to track wether or not there is a food item on the board
let xHistory = [0];         // Arays to track where the snake currently is
let yHistory = [0];
let gameOver = false;       // Bool to track if the player lost
let gotInput = false;       // Bool to keep track of wether an input was recived this tick
let snakeScore = 0;         // int to keep track of score
let foodcolor = '#d90504'

// Deal with form
const applyButton = document.getElementById('applyButton'); // Create button element
applyButton.addEventListener('click', () => {
    const difficultyInput = document.getElementById('difficulty');
    const difficultyInputOptions = difficultyInput.getElementsByTagName('input');
    for(const difficultyOption of difficultyInputOptions){
        if(difficultyOption.checked){
            console.log(difficultyOption.id);
            if(difficultyOption.id == 'veryhard'){
                tickSpeed = 50
            }else if(difficultyOption.id == 'hard'){
                tickSpeed = 75
            }else if(difficultyOption.id == 'medium'){
                tickSpeed = 100
            }else if(difficultyOption.id == 'easy'){
                tickSpeed = 150
            }else if(difficultyOption.id == 'veryeasy'){
                tickSpeed = 200;
            }
        }
    }
    const extrasInput =  document.getElementById('extras');
    const extrasInputOptions = extrasInput.getElementsByTagName('input');
    for(const extrasOption of extrasInputOptions){
        console.log(extrasOption.value)
        if(extrasOption.checked){
            document.getElementById('death-info').innerHTML = "The game ends if the snake hits its self (wrapping enabled)";
        }else{
            document.getElementById('death-info').innerHTML = "The game ends if the snake hits its self or the walls";
        }
    }
    const widthInput = document.getElementById('width-input');
    width = widthInput.value;
    const heightInput = document.getElementById('height-input');
    height = heightInput.value;
    document.getElementById('snakeBoard').innerHTML = ' ';
    foodcolor = document.getElementById('food-color').value;
    console.log(document.getElementById('food-color').value)
    genDivs(width, height);
}, false);

// Call grid generator
genDivs(width, height);

// Event listener scanning for arrow key presses
window.addEventListener('keydown', function(e) {
    // If the ArrowUp key is pressed and the snake isnt going down, set the snakes current state to up
    // And Repeat for all other directions 
    if((e.key == "ArrowUp" || e.key == "w") && !down && !gotInput){
        // Set up to true and all other directions to false
        up = true;      
        right = false;
        down = false;
        left = false;
        gotInput = true;
    }else if((e.key == "ArrowRight" || e.key == "d") && !left && !gotInput){
        up = false;
        right = true;
        down = false;
        left = false;
        gotInput = true;
    }else if((e.key == "ArrowDown" || e.key == "s") && !up && !gotInput){
        up = false;
        right = false;
        down = true;
        left = false;
        gotInput = true;
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

// Restart button press event listener
document.getElementById("restart").addEventListener('click', function(){
    document.getElementById("header").innerHTML = "PLAY SNAKE";
    if(!mainCalled){
        main()
    }
})

// Call main(), everything below this is function
main();

//--------------------------------------------------------------------------------------------------------------//

function main(){
  console.log("MAIN CALLED");
  mainCalled = true;
  // reset snakeBoard
  // For each row
  for(var i = 0; i < height; i++){
    // For each column in that row
    for(var x = 0; x <= width-1; x++){
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
        // If there isnt food on the board, generate a food item in any position except where the snake is
        if(!isFood){
            genFood();
        }
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
            if(yHead < height-1){   // Must ask if yHead < 15 to keep the snake within the bottom bound
                yHead++;
            }else{
                gameOver = true;
                gameOverText = "GAME OVER";
            }
        }else if(left){
            if(xHead > 0){  // Must ask if xHead > 0 to keep the snake within the left bound
                xHead--;
            }else{
                gameOver = true;
                gameOverText = "GAME OVER";
            }
        }else if(right){
            if(xHead < width-1){  // Must ask if xHead < 15 to keep the snake within the right bound
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
            // document.getElementById(snakeHead).style.removeProperty(backgroundColor);
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

            if(document.getElementById(snakeTail).className == "cell cellOn") {
                document.getElementById(snakeTail).classList.toggle('cellOn');
            }
        }

        if(gameOver){   // If the game is over call gameIsOver to end the game and don't call gameOn again
            gameIsOver()
        }else{  // Else call gameOn again and prepare for another input next tick
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
    xFood = Math.floor(Math.random() * width);
    yFood = Math.floor(Math.random() * height);
    foodPos = [xFood + " " + yFood];
    if(document.getElementById(foodPos).className == "cell") {    // if the randomly chosen coords are an empty cell
        document.getElementById(foodPos).classList.toggle('cellFood');  // turn the randomly chosen coords into food
        document.getElementById(foodPos).style.backgroundColor = foodcolor;
        isFood = true;  // set isFood to true bcause there is now food on the board
    }else{
        genFood();  // Else the random coords must be part of the snake so we call genFood again to re-try
    }
}

function gameIsOver(){
  document.getElementById("header").innerHTML = gameOverText;
  mainCalled = false;
}

// Funtion to generate snake board
function genDivs(width, height){
    var e = document.getElementById("snakeBoard"); // Generates board in snakeBoard section
    for(var i = 0; i < height; i++){ // For each row
        var row = document.createElement("div");    // Generate a div with class name "row"
        row.className = "row";
        for(var x = 0; x <= width-1; x++){  // For each column in that row
            var cell = document.createElement("div");   // Generate a div with class name "cell"
            cell.className = "cell";
            cell.setAttribute("id", x + " " + i);   // Set the id of each cell to be its coordinates in the grid x = left-->right, y = top-->bottom
            row.appendChild(cell);  // Add the new div to the current row
        }
        e.appendChild(row); // Add the new row to the section
    }
}