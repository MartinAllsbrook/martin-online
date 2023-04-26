import GameObject from "./GameObject.js";
import Vector2D from "./Vector2D.js";

export default class Ball extends GameObject {
    velocity = new Vector2D(0.3, 0.9);

    posFloor = new Vector2D(0, 0);
    posPercise = new Vector2D(0, 0);

    constructor(row, col, gameBoard, renderClass){
        super(row, col, gameBoard, renderClass);

        this.posPercise.Set(row, col) ;
    }

    Update() {
        this.posPercise.Add(this.velocity);
        if (this.posFloor.X() != Math.floor(this.posPercise.X()) || this.posFloor.Z() != Math.floor(this.posPercise.Z())) {
            this.posFloor = this.posPercise.Floor();
            this.moveTo(this.posFloor.X(), this.posFloor.Z());
        }
    }

    AddForce(vector2D){

    }
}