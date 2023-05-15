export default class Vector2D{
    x = 0;
    z = 0;

    constructor(x, z){
        this.x = x;
        this.z = z;
    }

    Add(vector2D){
        this.x += vector2D.X();
        this.z += vector2D.Z();
    }

    Set(x, z){
        this.x = x;
        this.z = z;
    }

    Floor(){
        return new Vector2D(Math.floor(this.x), Math.floor(this.z));
    }

    X(){
        return this.x;
    }

    Z(){
        return this.z;
    }
}