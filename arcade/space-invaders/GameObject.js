import gameBoard from './main.js';

export default class GameObject {
    constructor(row, col, renderClass){
        this.row = row;
        this.col = col;
        this.renderClass = renderClass;
    }

    draw() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                if(this.map[i][j]){
                    if(this.row + i >= 0 && this.row + i < gameBoard.height && this.col + j >= 0 && this.col + j < gameBoard.width){
                        gameBoard.cells[this.row + i][this.col + j].e.classList.add(this.renderClass); // Draw that pixel
                    }
                }
            }
        }
    }

    erase() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                if(this.map[i][j]){
                    if(this.row + i >= 0 && this.row + i < gameBoard.height && this.col + j >= 0 && this.col + j < gameBoard.width){
                        gameBoard.cells[this.row + i][this.col + j].e.classList.remove(this.renderClass); // erase that pixel
                    }
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