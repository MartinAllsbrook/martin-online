import GameObject from "./GameObject.js";

export default class Ball extends GameObject {
    constructor(row, col, gameBoard, renderClass){
        super(row, col, gameBoard, renderClass);
    }
    Update() {
        this.move(1,0);
    }
}