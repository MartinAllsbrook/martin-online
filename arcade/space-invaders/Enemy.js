import GameObject from './GameObject.js';
import EnemyLaser from './EnemyLaser.js';
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

    checkDeath() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                if(this.map[i][j]){
                    if(gameBoard.cells[this.row + i][this.col + j].e.classList.contains('playerLaser')){
                        this.remove();
                    }                    
                }
            }
        }
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
        length;
        if(this.fireTimer > 0){
            this.fireTimer--;
        }else{
            this.fireTimer = Math.random() * 100;
            new EnemyLaser(this.row + this.height - 1, this.col + Math.trunc(this.width/2), true);
            // gameBoard.lasers.push(new EnemyLaser(this.row + this.height - 1, this.col + Math.trunc(this.width/2), true));
        }
    }

    update(){
        if(this.moveTimer > 0){
            this.moveTimer--;
        }else{
            this.moveTimer = this.moveTimerMax;
            this.movementManager();
        }
        this.checkDeath();
        this.fire();
    }
}