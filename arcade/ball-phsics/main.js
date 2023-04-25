import GameBoard from "./GameBoard.js";
import GameObject from "./GameObject.js";
import Ball from "./Ball.js";

console.log("JS RUNNING");  // Check that the JS is working
gameBoard = new GameBoard(64, 64, 100);

gameBoard.AddObject(new Ball(16, 16, gameBoard, "test"));