console.log("JS RUNNING");  // Check that the JS is working

class Cell {
    constructor(e, row, col) {
        this.e = e;
        this.row = row;
        this.col = col;
        this.state = 'empty'; // TODO: We'll see if this is useful
    }
}

class GameObject {
    constructor(row, col){
        this.row = row;
        this.col = col;
    }

    draw() {
        // console.log('draw called');
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                // console.log(this.map[i][j]);
                if(this.map[i][j]){
                    // console.log('' + this.row + i + ' : ' + this.col + j);
                    gameBoard.cells[this.row + i][this.col + j].e.classList.add('enemy'); // Draw that pixel
                }
            }
        }
    }

    erase() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                if(this.map[i][j]){
                    gameBoard.cells[this.row + i][this.col + j].e.classList.remove('enemy'); // erase that pixel
                }
            }
        }
    }

    move(rowMove, colMove) {
        this.erase(); // Erase image
        this.row += rowMove; // Move character
        this.col += colMove;
        this.draw(); // Redraw image
    }
}

class Enemy extends GameObject {
    map = [
        [0,1,1,1,1,1,0],
        [1,1,0,1,0,1,1],
        [1,1,1,1,1,1,1],
        [1,0,1,0,1,0,1]
    ];
    height = this.map.length;
    width = this.map[0].length;
}

class Player extends GameObject {
    map = [
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
    ];
    height = this.map.length;
    width = this.map[0].length;

    update() {
        var moveRow = 0;
        if(keys.ArrowDown || keys.s){
            // console.log('down');
            moveRow++;
        }
        if(keys.ArrowUp || keys.w){
            // console.log('up');
            moveRow--;
        }

        var moveCol = 0;
        if(keys.ArrowLeft || keys.a){
            moveCol--;
        }
        if(keys.ArrowRight || keys.d){
            moveCol++;
        }
        
        // console.log('row: ' + moveRow + 'col: ' + moveCol);
        this.move(moveRow, moveCol);
    }
}

class Laser extends GameObject {
    map = [
        [1],
        [1],
        [1]
    ];
    height = this.map.length;
    width = this.map[0].length;

    
}

const gameBoard = {
    width: 16,
    height: 16,
    tickSpeed: 100,

    e: document.getElementById('gameboard'),
    cells: [],

    createBoard(width, height, tickSpeed) {
        this.width = width;
        this.height = height;
        this.tickSpeed = tickSpeed;
        gameBoard.player = new Player(24,32);

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

    startGame() {
        this.mainUpdate();
    },

    mainUpdate() {  // What happens each gametick
        setTimeout(function() { // Recursive call with setTimeout() calls the method every tickSpeed milisecconds
            gameBoard.player.update();

            gameBoard.mainUpdate(); // Call next game tick
            // console.log('TICK: mainUpdate() Called. Tickspeed: ' + gameBoard.tickSpeed);
        }, this.tickSpeed);
    }
}

gameBoard.createBoard(48,48,100);
gameBoard.startGame();

const keys = {}; // Create empty keys object

// If a key is pressed add it to the list of currently pressed keys
window.addEventListener("keydown", function(e){
    eval('keys.' + e.key + ' = true');
}, false);

// If a key is released remove it from the list of currently pressed keys
window.addEventListener('keyup', function(e){
    eval('keys.' + e.key + ' = false');
}, false);



let testEnemy = new Enemy(1,1);
testEnemy.draw();

let testlaser = new Laser(10, 10);
testlaser.draw();



