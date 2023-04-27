import GameObject from "./GameObject.js";
import Vector2D from "./Vector2D.js";

export default class Ball extends GameObject {
    velocity = new Vector2D(0, 0);

    posFloor = new Vector2D(0, 0);
    posPercise = new Vector2D(0, 0);

    constructor(row, col, gameBoard, renderClass){
        super(row, col, gameBoard, renderClass);

        this.posPercise.Set(row, col) ;
    }

    Update() {
        if(this.posPercise.X() > this.gameBoard.height){
            console.log("test");
            this.velocity.x = -this.velocity.x;
            this.posPercise = new Vector2D(this.gameBoard.height - 1, this.posPercise.Z());
            this.TestPx()
            return;
        }

        this.TestPx();
        this.ApplyVelocity();
        this.ApplyGravity();
    }

    ApplyVelocity(){
        this.posPercise.Add(this.velocity);
    }

    TestPx(){
        if (this.posFloor.X() != Math.floor(this.posPercise.X()) || this.posFloor.Z() != Math.floor(this.posPercise.Z())) {
            this.SetPx();
        }
    }

    SetPx(){
        this.posFloor = this.posPercise.Floor();
        this.moveTo(this.posFloor.X(), this.posFloor.Z());
    }

    AddForce(vector2D){
        this.velocity.Add(vector2D);
    }

    ApplyGravity(){
        this.AddForce(new Vector2D(0.098 ,0));
    }
}