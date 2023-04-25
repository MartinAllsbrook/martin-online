import GameBoard from "./GameBoard.js";
import GameObject from "./GameObject.js";

console.log("JS RUNNING");  // Check that the JS is working
gameBoard = new GameBoard(32, 32, 100);

gameBoard.AddObject(new GameObject(16, 16, gameBoard, "test"))