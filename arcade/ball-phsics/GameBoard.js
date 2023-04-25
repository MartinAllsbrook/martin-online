import Cell from "./Cell.js";

// Document must have section with gameBoard Id
export default class GameBoard {
    width = 16;
    height = 16;
    tickSpeed = 100;

    e = document.getElementById('gameBoard'); 

    cells = [];
    gameObjects = [];

    gameOver = false;

    constructor(width, height, tickSpeed) {
        this.width = width;
        this.height = height;
        this.tickSpeed = tickSpeed;

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
    }

    AddObject(gameObject) {
        this.gameObjects.push(gameObject);
    }
}