// Simple class to group cell elements and their position
class Cell {
    constructor(e, row, col) {
        this.e = e;
        this.row = row;
        this.com = col;
    }
}

// Player controlled paddle class
// Constroctor sets which player
class Paddle {
    constructor(isPlayerTwo) {
        this.row = gameBoard.height/2;
        this.isPlayerTwo = isPlayerTwo;
        this.movementState = 0;
    
        if(isPlayerTwo){
            this.column = gameBoard.width - 1;
        } else {
            this.column = 0;
        }

        this.radius = 2;
    }

    // Set the current state of the paddle based on keypresses logged in the keys[] array
    setMovementState = function() {
        // Use arrow keys for player two and wasd for player one
        if(this.isPlayerTwo){
            if(keys.ArrowDown){
                this.movementState = 1;
            }else if(keys.ArrowUp){
                this.movementState = -1;
            }
        } else {
            if(keys.s){
                this.movementState = 1;
            }else if(keys.w){
                this.movementState = -1;
            }
        }
    }

    // Moves the paddle based on the updated variables from setMovementState()
    move = function() {
        this.setMovementState();
        // Only move if the paddle if it is fully within the bondaries of the map
        if(this.row + this.radius < gameBoard.height - 1 && this.movementState == 1) {
            this.row += this.movementState;
        } 
        if(this.row - this.radius > 0 && this.movementState == -1) {
            this.row += this.movementState;
        }
    }

    // Add and remove classes from html elements using .add() and .remove()
    draw = function() {
        for(let i = -this.radius; i <= this.radius; i++) {
            // This is getting the class list from the cell element from the cell in the cells array in th gameBoard object
            gameBoard.cells[this.row + i][this.column].e.classList.add('active');
        }
        if(this.movementState == 1){
            gameBoard.cells[this.row - 3][this.column].e.classList.remove('active');
        }
        if(this.movementState == -1){
            gameBoard.cells[this.row + 3][this.column].e.classList.remove('active');
        }
    }

    // Update the object, should be called by univeral gameBoard update
    update = function() {
        // Set movement state to zero to remove old inputs
        this.movementState = 0;
        this.move();
        this.draw();
    }
}

// Ball class is only instanced once to create ball object that bounces
// Constroctor sets starting velocity and direction
class Ball {
    constructor(startVelocity) {
        this.row = gameBoard.height/2;
        this.col = gameBoard.width/2 + 1;
        this.colMultiplier = 1;

        this.lastRow = undefined;
        this.lastCol = undefined;
        
        this.velocityRow = 0;
        this.velocityCol = startVelocity;
    }

    // Bounce method controlls how the ball reflects off the paddles
    bounce = function() {
        let velocityChange;
        // Distiguises which paddle to query
        if(this.velocityCol > 0){
            velocityChange = this.row - gameBoard.playerTwo.row; // Reflects with a slope ==to the distance to the center of the paddle
        } else {
            velocityChange = this.row - gameBoard.playerOne.row;
        }
        this.velocityCol = -this.velocityCol;
        this.velocityRow = velocityChange;
    }

    // returns the next row position of the ball, accounting for reflections
    nextRow = function() {
        let nextRow
        if((this.velocityRow > 0 && this.row + this.velocityRow <= gameBoard.height - 1) || (this.velocityRow < 0 && this.row + this.velocityRow >= 0)) {
            nextRow = this.row + this.velocityRow;
        } else if(this.velocityRow != 0) {
            nextRow = this.row - this.velocityRow;
        } else {
            nextRow = this.row;
        }
        return nextRow;
    }

    // returns the next col position of the ball
    nextCol = function() {
        let nextCol = this.col + this.colMultiplier * this.velocityCol;
        return nextCol;
    }

    // moves the ball accounting for reflections
    move = function() {
        this.lastRow = this.row;
        this.lastCol = this.col;

        // If the next cell the ball will hit is a paddle cell, refect it
        if(gameBoard.cells[this.nextRow()][this.nextCol()].e.classList.contains('active')){
            if(this.velocityCol > 0){
                this.bounce(gameBoard.playerTwo.movementState);
            } else if(this.velocityCol < 0) {
                this.bounce(gameBoard.playerOne.movementState);
                console.log(gameBoard.playerOne.movementState);
            }
        }

        // Move the ball based on the col & row velocity
        this.col = this.nextCol();
        if((this.velocityRow > 0 && this.row + this.velocityRow <= gameBoard.height - 1) || (this.velocityRow < 0 && this.row + this.velocityRow >= 0)) {
            this.row += this.velocityRow;
        } else if(this.velocityRow != 0) {
            this.velocityRow = -this.velocityRow;
            this.row += this.velocityRow;
        }
    }

    // draws the ball using classes
    draw = function() {
        gameBoard.cells[this.row][this.col].e.classList.add('ball');
        gameBoard.cells[this.lastRow][this.lastCol].e.classList.remove('ball');
    }

    // Updates the ball, should be called by central update function
    update = function() {
        // console.log('ballUpdate');
        this.move();
        this.draw();
    }
}

// gameBoard object to track HTML gameBoard
const gameBoard = {
    e: document.getElementById('gameBoard'), // Get board div from the page
    tickSpeed: 100, // Set the update speed of the game
    height: 1, // Initializations
    width: 1,
    cellCount: 1,
    cells: [],

    // createBoard method to render the gameboard in HTML and create an array to refrence it in JS
    createBoard: function (height, width) {
        console.log('creating gameBoard'); // DEBUG

        this.height = height;
        this.width = width;
        this.cellCount = this.height * this.width;    
        gameBoard.playerOne = new Paddle(false);
        gameBoard.playerTwo = new Paddle(true);
        gameBoard.ball = new Ball(-1);
    
        // For each row
        for(let i = 0; i < this.height; i++){
            let row = document.createElement("div"); // Create a div flex element to act as that row;
            row.className = "row"; // Give it a class name
            this.cells.push([]); // Push an emply array into the cells array to represent that row

            // For each column
            for(let j = 0; j < this.width; j++){
                this.cells[i].push(new Cell(document.createElement("div"),i,j)); // Create new cell object in the current row
                this.cells[i][j].e.className = "cell"; // Give it a class name
                row.appendChild(this.cells[i][j].e); // Add cell HTML element to the row HTML element
            };
            this.e.appendChild(row); // Add row HTML element to gameBoard HTML element
        }

        console.log('gameBoard created'); // DEBUG
    },

    startGame: function() {
        this.mainUpdate();
    },

    // What happens each gametick
    mainUpdate: function () {
        // Recursive call with setTimeout() calls the method every tickSpeed milisecconds
        setTimeout(function() {
            // Call all updates
            gameBoard.playerOne.update();
            gameBoard.playerTwo.update();
            gameBoard.ball.update();

            // Call next game tick
            gameBoard.mainUpdate();
            console.log('TICK: mainUpdate() Called');
        }, this.tickSpeed);
    }
};

// Create empty keys object
const keys = {};
// If a key is pressed add it to the list of currently pressed keys
window.addEventListener("keydown", function(e){
    eval('keys.' + e.key + ' = true');
}, false);

// If a key is released remove it from the list of currently pressed keys
window.addEventListener('keyup', function(e){
    eval('keys.' + e.key + ' = false');
}, false);

gameBoard.createBoard(16,16); // Render the board
gameBoard.startGame(); // Code to start the game