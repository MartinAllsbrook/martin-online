
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Draw the roof
ctx.fillStyle = "brown";
ctx.beginPath();
ctx.moveTo(150, 50);
ctx.lineTo(250, 150);
ctx.lineTo(50, 150);
ctx.closePath();
ctx.fill();

// Draw the walls
ctx.fillStyle = "yellow";
ctx.fillRect(75, 150, 150, 100);

// Draw the door
ctx.fillStyle = "blue";
ctx.fillRect(125, 200, 50, 50);

// Draw the windows
ctx.fillStyle = "white";
ctx.fillRect(90, 170, 30, 20);
ctx.fillRect(180, 170, 30, 20);