import GameObject from './GameObject.js';
import Laser from './Laser.js';
import gameBoard from './main.js';
import keys from './keysManager.js';

export default class Player extends GameObject {
    map = [
        [0,0,1,0,0],
        [0,0,1,0,0],
        [0,1,1,1,0],
        [0,1,0,1,0],
        [0,1,1,1,0],
        [0,1,1,1,0],
        [1,1,1,1,1],
        [1,1,1,1,1],
        [0,1,1,1,0],
        [0,0,1,0,0]
    ];
    height = this.map.length;
    width = this.map[0].length;
    readyToFire = true;

    constructor(row, col){
        super(row, col, 'player');
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
    }

    checkFire() {
        if(keys.Space & this.readyToFire){
            gameBoard.lasers.push(new Laser(this.row, this.col, false)); // Create new friendly laser
            this.readyToFire = false;
            setTimeout(() => {
                this.readyToFire = true;
            }, 1000);
        }
    }

    update() {
        this.checkMove();
        this.checkFire();
    }
}