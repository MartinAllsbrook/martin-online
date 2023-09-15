let colorHue; 

function setup() {
    createCanvas(400, 400);

    colorMode(HSB, 100);

    noStroke();

    colorHue = 0;
}
  
function draw() {
    background(0);
    
    if (colorHue < 100){
        colorHue++;
    } else {
        colorHue = 0;
    }

    fill(color(colorHue, 100, 100));
    ellipse(mouseX, mouseY, 80, 80);
}

