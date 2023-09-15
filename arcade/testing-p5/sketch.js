import Vector2D from "./Vector2D.js";

new p5(function(p5)
{
    let colorHue; 

    let ballPosition;
    let ballVelocity;

    p5.setup = function() {
        p5.createCanvas(400, 400);
    
        p5.colorMode(p5.HSB, 100);
    
        p5.noStroke();
    
        colorHue = 0;
    
        ballPosition = new Vector2D(200, 200);
        ballVelocity = new Vector2D(0, 0);
    }
      
    p5.draw = function() {
        p5.background(0);
        
        if (colorHue < 100){
            colorHue++;
        } else {
            colorHue = 0;
        }
    
        p5.fill(p5.color(colorHue, 100, 100));
        p5.ellipse(ballPosition.X(), ballPosition.Y(), 80, 80);
    }
});