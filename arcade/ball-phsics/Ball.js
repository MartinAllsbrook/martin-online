import GameObject from "./GameObject.js";

export default class Ball extends GameObject {
    xVelocity = 0.5;
    zVelocity = 1;

    xFloor;
    zFloor;
    xPercise;
    zPercise;

    constructor(row, col, gameBoard, renderClass){
        super(row, col, gameBoard, renderClass);

        this.xPercise = row;
        this.zPercise = col;
    }
    Update() {
        this.xPercise += this.xVelocity;
        this.zPercise += this.zVelocity;
        if (this.xFloor != Math.floor(this.xPercise) || this.zFloor != Math.floor(this.zPercise)) {
            this.xFloor = Math.floor(this.xPercise);
            this.zFloor = Math.floor(this.zPercise);
            this.moveTo(this.xFloor,this.zFloor);
        }
    }
}