import GameObject from './GameObject.js';
import Laser from './Laser.js';
import gameBoard from './main.js';

export default class Enemy extends GameObject {
    map = [
        [0,1,1,1,1,1,0],
        [1,1,0,1,0,1,1],
        [1,1,1,1,1,1,1],
        [1,0,1,0,1,0,1]
    ];
    height = this.map.length;
    width = this.map[0].length;

    moveTimer = 4;
    moveTimerMax = 4;
    fireTimer = Math.random() * 100;
    path = [1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0];
    pathPosition = 0;

    constructor(row, col){
        super(row, col, 'enemy');
    }

    movementManager(){
        if(this.path[this.pathPosition] == 0){
            this.move(1, 0);
        }else{
            this.move(0, this.path[this.pathPosition]);
        }

        if(this.pathPosition < this.path.length - 1){
            this.pathPosition++;
        }else{
            this.pathPosition = 0;
        } 
    }

    fire(){
        if(this.fireTimer > 0){
            this.fireTimer--;
        }else{
            this.fireTimer = Math.random() * 100;
            gameBoard.lasers.push(new Laser(this.row, this.col, true));
        }
    }

    update(){
        if(this.moveTimer > 0){
            this.moveTimer--;
        }else{
            this.moveTimer = this.moveTimerMax;
            this.movementManager();
        }

        this.fire();
    }
}