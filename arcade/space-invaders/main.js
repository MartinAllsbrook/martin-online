console.log("JS RUNNING");  // Check that the JS is working

import Cell from './Cell.js';
import Enemy from './Enemy.js';
import Player from './Player.js';
import guiController from './GUIController.js';

const gameBoard = {
    width: 16,
    height: 16,
    tickSpeed: 100,

    e: document.getElementById('gameBoard'),
    cells: [],
    gameObjects: {},

    gameOver: false,

    createBoard(width, height, tickSpeed) {
        this.width = width;
        this.height = height;
        this.tickSpeed = tickSpeed;
        // gameBoard.player = new Player(24,32);

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
    },

    populateEnemies()   {
        for(let i = 0; i < 5; i++) {
            new Enemy(2, i * 8 + 1);
        }
    },

    startGame() {
        setTimeout(() => { // Recursive call with setTimeout() calls the method every tickSpeed milisecconds
            console.log('creating enemies');
            gameBoard.populateEnemies();
            new Player(24,32);
            this.mainUpdate();
        }, 500); 
    },

    endGame() {
        this.gameOver = true;
        guiController.setGameOverText('Game Over');
    },

    mainUpdate() {  // What happens each gametick
        setTimeout(() => { // Recursive call with setTimeout() calls the method every tickSpeed milisecconds
            if (this.gameObjects['enemy'].length == 0) {
                gameBoard.populateEnemies();
            }
            if (this.gameObjects['player'].length == 0){
                this.endGame();
            }
            for (const renderClass in this.gameObjects) {
                for (let i = 0; i < this.gameObjects[renderClass].length; i++) {
                    this.gameObjects[renderClass][i].update();
                }
            }

            if (!this.gameOver) {
                gameBoard.mainUpdate(); // Call next game tick
            }
        }, this.tickSpeed);
    }
}

gameBoard.createBoard(96,96,100);
gameBoard.startGame();

export default gameBoard;
