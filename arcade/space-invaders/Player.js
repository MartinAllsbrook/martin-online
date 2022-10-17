import GameObject from './GameObject.js';
import PlayerLaser from './PlayerLaser.js';
import gameBoard from './main.js';
import keys from './keysManager.js';
import Exaust from './Exaust.js';

export default class Player extends GameObject {
    map = [
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,1,1,1,0],
        [0,1,0,1,0],
        [0,1,1,1,0],
        [0,1,1,1,0],
        [1,1,1,1,1],
        [1,1,1,1,1]
    ];
    height = this.map.length;
    width = this.map[0].length;
    readyToFire = true;

    constructor(row, col){
        super(row, col, 'player');
        this.exaust = new Exaust(row + this.height, col);
    }

    checkDeath() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                if(this.map[i][j]){
                    const cellClassList = gameBoard.cells[this.row + i][this.col + j].e.classList;
                    if (cellClassList.contains('enemyLaser') || cellClassList.contains('enemy')){
                        this.remove();
                        this.exaust.remove();
                        return true;
                    }
                }
            }
        }
    }

    checkMove() {
        var moveRow = 0;
        if(keys.ArrowDown || keys.s){
            // console.log('down');
            moveRow++;
        }
        if(keys.ArrowUp || keys.w){
            // console.log('up');
            moveRow--;
        }

        var moveCol = 0;
        if(keys.ArrowLeft || keys.a){
            moveCol--;
        }
        if(keys.ArrowRight || keys.d){
            moveCol++;
        }
        
        // console.log('row: ' + moveRow + 'col: ' + moveCol);
        this.move(moveRow, moveCol);
        this.exaust.move(moveRow, moveCol);
    }

    checkFire() {
        if(keys.Space & this.readyToFire){
            new PlayerLaser(this.row - 2, this.col + 2); // Create new friendly laser
            // gameBoard.lasers.push(new PlayerLaser(this.row - 2, this.col + 2)); // Create new friendly laser
            this.readyToFire = false;
            setTimeout(() => {
                this.readyToFire = true;
            }, 1000);
        }
    }

    update() {
        this.checkMove();
        this.checkFire();
        this.checkDeath();
    }
}