import GameObject from './GameObject.js';

export default class Exaust extends GameObject{
    maps=[
        [
            [0,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        [
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0]
        ]/*,
        [
            [1,1,1,1,1],
            [0,1,1,1,0],
            [0,0,1,0,0]
        ]*/
    ]
    
    map=[
        [0,1,1,1,0],
        [0,0,1,0,0],
        [0,0,0,0,0]
    ]

    height = this.map.length;
    width = this.map[0].length;

    constructor(row, col){
        super(row, col, 'playerEngine');
        this.row = row;
        this.col = col;
    }

    move(rowMove, colMove){
        this.erase(); // Erase image
        const mapNumber = Math.trunc(Math.random() * this.maps.length);
        this.map = this.maps[mapNumber];
        this.row += rowMove; // Move character
        this.col += colMove;
        this.draw(); // Redraw image
    }

    update(){
        
    }
}