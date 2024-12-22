import Vector2D from "./Vector2D.js";
import Ball from "./Ball.js";

export default class PhysicsEngine{
    physicsObjects = [];
    staticObjects = [];

    constructor(){
        const ballPosition = new Vector2D(200, 100);
        const ballVelocity = new Vector2D(0, 0);
        const ballAcceleration = new Vector2D(0, 0.05);

        const ball = new Ball(ballPosition, ballVelocity, ballAcceleration);

        this.physicsObjects.push(ball);
    }

    Update(){
        for(let i = 0; i < this.physicsObjects.length; i++){
            const physicsObject = this.physicsObjects[i];
            physicsObject.Update();
        }
        
        this.physicsObjects.forEach(object => {
            object.Update();
        });
    }

    Draw(p5){
        this.physicsObjects.forEach(object => {
            object.Draw(p5);
        });
    }
}