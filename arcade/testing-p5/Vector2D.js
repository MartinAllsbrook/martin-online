export default class Vector2D{
    x = 0;
    y = 0;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    Add(vector2D){
        this.x += vector2D.X();
        this.y += vector2D.Y();
    }

    Set(x, y){
        this.x = x;
        this.y = y;
    }

    X(){
        return this.x;
    }

    Y(){
        return this.y;
    }
}