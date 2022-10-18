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

    populateEnemies () {
        for(let i = 0; i < 11; i++) {
            new Enemy(2, i * 8 + 1);
        }
        for(let i = 0; i < 11; i++) {
            new Enemy(8, i * 8 + 1);
        }
    },

    startGame() {
        setTimeout(() => { // Recursive call with setTimeout() calls the method every tickSpeed milisecconds
            console.log('creating enemies');
            gameBoard.populateEnemies();
            new Player(24,32);
            this.gameOver = false;
            this.mainUpdate();
        }, 500); 
    },

    endGame() {
        this.gameOver = true;
        guiController.setGameOverText('Game Over');
    },

    restartGame() {
        this.gameOver = true;
        this.eraseGameObjects(); // erase all game objects
        this.gameObjects = {}; // erase refrences to all game objects
        this.startGame();
    },

    mainUpdate() {  // What happens each gametick
        setTimeout (() => { // Recursive call with setTimeout() calls the method every tickSpeed milisecconds
            if (!this.gameOver) {
                if (this.gameObjects['enemy'].length == 0) {
                    gameBoard.populateEnemies();
                }
                if (this.gameObjects['player'].length == 0){
                    this.endGame();
                }
                
                this.updateGameObjects(); // Update all game objects
                gameBoard.mainUpdate(); // Call next game tick
            }
        }, this.tickSpeed);
    },

    updateGameObjects () {
        // console.log(this.gameObjects['enemy']);
        // console.log(this.gameObjects['enemy'].length);
        for (const renderClass in this.gameObjects) {
            // console.log(`${renderClass} length: ${this.gameObjects[renderClass].length}`);
            // var testingLength = this.gameObjects[renderClass].length;
            var toRemove = [];
            for (let i = 0; i < this.gameObjects[renderClass].length; i++) {
                // console.log(`updating : ${renderClass} #${i}`)
                if(this.gameObjects[renderClass][i].update()){
                    toRemove.push(i);
                }
            }
            for (let i = 0; i < toRemove.length; i++){
                this.gameObjects[renderClass][toRemove[i]].remove();
            }
        }
    },

    eraseGameObjects () {
        for (const renderClass in this.gameObjects) {
            for (let i = 0; i < this.gameObjects[renderClass].length; i++) {
                this.gameObjects[renderClass][i].erase();
            }
        }
    }
}

gameBoard.createBoard(96,96,100);
gameBoard.startGame();

export default gameBoard;
