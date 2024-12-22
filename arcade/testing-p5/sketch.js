import PhysicsEngine from "./PhysicsEngine.js";

new p5(function(p5)
{
    let colorHue; 

    let physicsEngine;

    p5.setup = function() {
        p5.createCanvas(400, 400);
    
        p5.colorMode(p5.HSB, 100);
        
        colorHue = 0;
    
        physicsEngine = new PhysicsEngine();
    }
      
    p5.draw = function() {
        p5.background(20);
        
        if (colorHue < 100){
            colorHue++;
        } else {
            colorHue = 0;
        }

        physicsEngine.Update();

        p5.line(0, 60, 400, 60);
    
        p5.fill(p5.color(colorHue, 100, 100));

        physicsEngine.Draw(p5);
        // p5.ellipse(ball.position.x, ball.position.y, 80, 80);
    }
});