import GameObject from './GameObject.js';
import gameBoard from './main.js';

export default class PlayerLaser extends GameObject {
    map = [
        [1],
        [1],
        [1]
    ];
    height = this.map.length;
    width = this.map[0].length;
    
    constructor(row, col){
        super(row, col, 'playerLaser');
    }

    update() {
        if(this.row + this.height > 0){
            this.move(-1, 0); // Move laser forward 1 unit
            return false;
        }else{
            return true;
        }
    }
}