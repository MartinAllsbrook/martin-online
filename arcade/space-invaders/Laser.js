import GameObject from './GameObject.js';
import gameBoard from './main.js';

export default class Laser extends GameObject {
    map = [
        [1],
        [1],
        [1]
    ];
    height = this.map.length;
    width = this.map[0].length;
    
    constructor(row, col, enemy){
        if(enemy){
            super(row, col, 'enemy-laser');
        }else{
            super(row, col, 'player-laser')
        }
        this.enemy = enemy;
    }

    update() {
        if(!this.enemy && this.row + this.height > 0){
            this.move(-1, 0); // Move laser forward 1 unit
        }else if(this.enemy && this.row < gameBoard.height){
            this.move(1, 0);
        }else{
            this.erase();
            const index = gameBoard.lasers.indexOf(this);
            gameBoard.lasers.splice(index, 1);
        }
    }
}