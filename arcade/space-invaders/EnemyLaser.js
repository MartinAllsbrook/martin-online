import GameObject from './GameObject.js';
import gameBoard from './main.js';

export default class EnemyLaser extends GameObject {
    map = [
        [1],
        [1],
        [1]
    ];
    height = this.map.length;
    width = this.map[0].length;
    
    constructor(row, col){
        super(row, col, 'enemyLaser');
    }

    update() {
        if(this.row < gameBoard.height){
            this.move(1, 0);
            return false;
        }else{
            return true;
        }
    }
}