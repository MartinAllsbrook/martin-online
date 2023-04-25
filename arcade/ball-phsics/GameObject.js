export default class GameObject {
    map = [
        [1]
    ];
    height = this.map.length;
    width = this.map[0].length;

    constructor(row, col, gameBoard, renderClass){
        this.row = row;
        this.col = col;
        this.renderClass = renderClass;
        this.gameBoard = gameBoard
        this.draw();
    }

    draw() {
        // console.log("draw gameobject")
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                if(this.map[i][j]){
                    if(this.row + i >= 0 && this.row + i < this.gameBoard.height && this.col + j >= 0 && this.col + j < this.gameBoard.width){
                        this.drawCell(this.row + i, this.col + j);
                    }
                }
            }
        }
    }

    drawCell(row, col) {
        // console.log(this.gameBoard.cells[row][col].e.classList);
        this.gameBoard.cells[row][col].e.classList.add(this.renderClass); // Draw that pixel
        this.gameBoard.cells[row][col].state = this.renderClass;
    }

    erase() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                if(this.map[i][j]){
                    if(this.row + i >= 0 && this.row + i < gameBoard.height && this.col + j >= 0 && this.col + j < gameBoard.width){
                        this.eraseCell(this.row + i, this.col + j);
                    }
                }
            }
        }
    }

    eraseCell(row, col) {
        gameBoard.cells[row][col].e.classList.remove(this.renderClass); // Draw that pixel
        gameBoard.cells[row][col].state = 'empty';
    }

    move(rowMove, colMove) {
        this.erase(); // Erase image
        this.row += rowMove; // Move character
        this.col += colMove;
        this.draw(); // Redraw image
    }

    remove(){
        this.erase();
        const index = gameBoard.gameObjects[this.renderClass].indexOf(this);
        gameBoard.gameObjects[this.renderClass].splice(index, 1);
    }

    BaseUpdate(){
        this.erase();
        this.Update();
        this.draw();
    }

    Update(){
        console.log("no move");
    }
}