function Cell(e, row, col){
    this.e = e;
    this.row = row;
    this.col = col;
    this.mine = false;
    this.nearbyMineCount = 0;

    this.setMine = function() {
        this.mine = true;
    }
}

const board = {
    e: document.getElementsByClassName('minesweeper-board')[0],
    width: 16,
    height: 16,
    cellCount: 16*16,
    mineCount: 16,
    cells: [],

    createBoard: function(width, height, mineCount) {
        this.width = width;
        this.height = height;
        this.mineCount = mineCount
        this.cellCount = this.width * this.height;

        for(let i = 0; i < this.width; i++){
            let row = document.createElement("div");
            row.className = "row";
            this.cells.push([]);
            for(let j = 0; j < this.height; j++){
                this.cells[i].push(new Cell(document.createElement("div"),i,j));
                this.cells[i][j].e.className = "cell";
                row.appendChild(this.cells[i][j].e);
            };
            this.e.appendChild(row);
        };
    },

    createMines: function() {
        let row = Math.floor(Math.random()*16);
        let col = Math.floor(Math.random()*16);
        if(!this.cells[row][col].mine){
            this.cells[row][col].mine = true;
        }else{
            this.createMines();
        }
    },

    populate: function() {
        console.log('pop');
        for(let i = 0; i < this.mineCount; i++){
            this.createMines();
        }
        for(let row = 0; row < this.width; row++){
            for(let col  = 0; col < this.height; col++){
                for(let i = -1; i <= 1; i++){
                    for(let j = -1; j <= 1; j++){
                        if(row+i >= 0 && row+i < this.height && col+j >= 0 && col+j < this.width){
                            if(this.cells[row+i][col+j].mine){
                                this.cells[row][col].nearbyMineCount++;
                            }
                        }
                    }
                }
            }
        }
    },

    printBoard: function() {
        out = '';
        for(let i = 0; i < this.width; i++){
            row = '';
            for(let j = 0; j < this.height; j++){
                if(this.cells[i][j].mine){
                    row += '# ';
                }else if(this.cells[i][j].nearbyMineCount > 0){
                    row += this.cells[i][j].nearbyMineCount + ' ';
                }else{
                    row += '. ';
                }
            }
            out += `
            ` + row;
        }
        console.log(out);
    },

    search: function(row, col) {
        if(this.cells[row][col].mine){
            this.e.classList.add('explode');
            return false;
        }else{
            let nearbyMineCount = 0
            this.e.classList.add('searched');
            return true;
        }
    }
};

board.createBoard(16,16,16);
board.populate();
board.printBoard();
console.log('JAVASCRIPT LOADED')