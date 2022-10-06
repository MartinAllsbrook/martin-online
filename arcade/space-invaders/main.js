console.log("JS RUNNING");  // Check that the JS is working

class Cell {
    constructor(e, row, col) {
        this.e = e;
        this.row = row;
        this.col = col;
        this.state = 'empty'; // TODO: We'll see if this is useful
    }
}

class Enemy {
    constructor(row, col){
        this.row = row;
        this.col = col;

        this.map = [
            [0,1,1,1,1,1,0],
            [1,1,0,1,0,1,1],
            [1,1,1,1,1,1,1],
            [1,0,1,0,1,0,1]
        ];
        this.height = this.map.length;
        this.width = this.map[0].length;
    }

    draw() {
        // console.log('draw called');
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                // Draw that pixel
                if(this.map[i][j]){
                    gameBoard.cells[this.row + i][this.col + j].e.classList.add('enemy');
                }
                // console.log(this.map[i][j]);
            }
        }
    }
}

class Player {
    constructor() {
        this.row = 32;
        this.col = 24;
        this.map = [
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,1,1,1,0],
            [0,1,0,1,0],
            [0,1,1,1,0],
            [0,1,1,1,0],
            [1,1,1,1,1],
            [1,1,1,1,1],
            [0,1,1,1,0],
            [0,0,1,0,0]
        ]
        this.height = this.map.length;
        this.width = this.map[0].length;
    }

    draw() {
        console.log('draw called');
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                // Draw that pixel
                if(this.map[i][j]){
                    gameBoard.cells[this.row + i][this.col + j].e.classList.add('enemy');
                }
                // console.log(this.map[i][j]);
            }
        }
    }
}

const gameBoard = {
    width: 16,
    height: 16,
    tickspeed: 100,

    e: document.getElementById('gameboard'),
    cells: [],

    createBoard(width, height, tickspeed) {
        this.width = width;
        this.height = height;
        this.tickspeed = tickspeed;

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
}

gameBoard.createBoard(48,48,100);

let testEnemy = new Enemy(1,1);
testEnemy.draw();

let player = new Player();
player.draw();