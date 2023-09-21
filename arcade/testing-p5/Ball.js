import Vector2D from "./Vector2D.js"

export default class Ball{
    position = new Vector2D(0,0);
    velocity = new Vector2D(0,0);
    acceleration = new Vector2D(0,0);

    radius;
    
    constructor(position, velocity, acceleration){
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }

    Update(){
        this.position.Add(this.velocity);

        if(this.position.Y() > 360){
            this.velocity.Set(this.velocity.X(), -this.velocity.Y())
        } else {
            this.velocity.Add(this.acceleration);
        }
    }

    GetPosition(){
        return this.position;
    }

    Draw(){
        
    }
}