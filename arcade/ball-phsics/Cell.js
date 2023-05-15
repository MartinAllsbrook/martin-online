export default class Cell {
    constructor(e, row, col) {
        this.e = e;
        this.row = row;
        this.col = col;
        this.state = 'empty'; // TODO: We'll see if this is useful
    }
}