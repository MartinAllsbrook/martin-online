function Cell(e, row, col){
    this.e = e;
    this.row = row;
    this.col = col;
    this.mine = false;

    this.setMine = function() {
        this.mine = true;
    }
}

const board = {
    e: document.getElementsByClassName('minesweeper-board')[0],
    width: 16,
    height: 16,
    cellCount: 16*16,
    bombCount: 16,
    cells: [],

    createBoard: function(width, height, bombCount) {
        this.width = width;
        this.height = height;
        this.bombCount = bombCount
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

    populate: function() {
        for(let i = 0; i < this.bombCount; i++){
            this.cells[Math.floor(Math.random()*16)][Math.floor(Math.random()*16)].setMine()
        };
    }
};

board.createBoard(16,16,16);

console.log(board.cellCount);


console.log('JAVASCRIPT LOADED')