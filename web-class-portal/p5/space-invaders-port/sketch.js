// var serial; //variable to hold an instance of the serial port library
// var portName = 'COM4'; //fill in with YOUR port

const keys = {}; // Create empty keys object

// If a key is pressed add it to the list of currently pressed keys
window.addEventListener("keydown", function(e){
    if(e.key != ' '){
        eval('keys.' + e.key + ' = true');
    }else{
        eval('keys.space = true');
    }
}, false);

// If a key is released remove it from the list of currently pressed keys
window.addEventListener('keyup', function(e){
    if(e.key != ' '){
        eval('keys.' + e.key + ' = false');
    }else{
        eval('keys.space = false');
    }
}, false);

let x_input;
let y_input;
let button_input;
let player;
let projectiles = [];
let invaders = [];
var game_over = 0;
var game_won = 0;

const canvas_size = 500;

function setup() {
  createCanvas(canvas_size + 20 , canvas_size + 20);

  console.log('setup')

  // serial = new p5.SerialPort(); //a new instance of serial port library

  // set up events for serial communication
  // serial.on('connected', serverConnected);
  // serial.on('open', portOpen);
  // serial.on('data', serialEvent);
  // serial.on('error', serialError);
  // serial.on('close', portClose);

  //open our serial port
  // serial.open(portName);

  // let's figure out what port we're on - useful for determining your port
  // serial.on('list', printList); //set a callback function for the serialport list event
  // serial.list(); //list the serial ports
  
  // CREATE PLAYER
  player = new Player();
  
  // CREATE INVADERS
  for(let i = 0; i < 9; i++) {
    invaders.push(new Invader((-240 + 50 * i), -230, 20, 20));
    invaders.push(new Invader((-240 + 50 * i), -170, 20, 20));
  }
  for(let i = 0; i < 8; i++) {
    invaders.push(new Invader((-215 + 50 * i), -200, 20, 20));
    invaders.push(new Invader((-215 + 50 * i), -140, 20, 20));
  }
}

function draw() {
  x_input = 0;
  y_input = 0;

  if (keys.a) {
    x_input--;
  } else if (keys.d) {
    x_input++;
  }

  if (keys.w) {
    y_input--;
  } else if (keys.s) { 
    y_input++;
  }

  button_input = keys.space;
  console.log(button_input);

  player.step(x_input, y_input);
  player.fire(button_input);
  
  if(invaders.length <= 0){
    game_won = 1;
  }
  
  for (let i = 0; i < invaders.length; i++) {
    invaders[i].step();
    invaders[i].fire();
  }
  
  for (let i = 0; i < projectiles.length; i++) {
    projectiles[i].move();
    if(projectiles[i].getY() < (-canvas_size / 2 - 10) || projectiles[i].getY() > (canvas_size / 2 + 20)) {
      projectiles.splice(i, 1);
    }
  }
  
  // HIT DETECTION
  for(let i = 0; i < invaders.length; i++) {
    for (let j = 0; j < projectiles.length; j++) {
      if(projectiles[j].fromInvader()) {
        if((player.getX() <= projectiles[j].getX() && 
        (player.getX() + 20) >= projectiles[j].getX() || 
        player.getX() <= (projectiles[j].getX() + projectiles[j].getW()) &&
        (player.getX() + 20) >= (projectiles[j].getX() + projectiles[j].getW())) &&
        (player.getY() <= projectiles[j].getY() && 
        (player.getY() + 20) >= projectiles[j].getY() || 
        player.getY() <= (projectiles[j].getY() + projectiles[j].getH()) &&
        (player.getY() + 20) >= (projectiles[j].getY() + projectiles[j].getH()))) {
          projectiles.splice(j, 1);
          game_over = 1;
        }
      } else {
        if((invaders[i].getX() <= projectiles[j].getX() && 
        (invaders[i].getX() + 20) >= projectiles[j].getX() || 
        invaders[i].getX() <= (projectiles[j].getX() + projectiles[j].getW()) &&
        (invaders[i].getX() + 20) >= (projectiles[j].getX() + projectiles[j].getW())) &&
        (invaders[i].getY() <= projectiles[j].getY() && 
        (invaders[i].getY() + 20) >= projectiles[j].getY() || 
        invaders[i].getY() <= (projectiles[j].getY() + projectiles[j].getH()) &&
        (invaders[i].getY() + 20) >= (projectiles[j].getY() + projectiles[j].getH()))) {
          invaders.splice(i, 1);
          projectiles.splice(j, 1);
        }
      }
    }
  }

  if(game_over) {
    textSize(32);
    fill('red');
    text('GAME OVER', 10, 30);
  } else if(game_won) {
    textSize(32);
    fill('green');
    text('YOU WON!', 10, 30);
  } else {
    background('black');
  
    for (let i = 0; i < projectiles.length; i++) {
      projectiles[i].display();
    }

    for (let i = 0; i < invaders.length; i++) {
      invaders[i].display();
    }

    player.draw();
  }
}

// CLASSES FOR OBJECTS YAYAYAYAY
class Player {
  constructor() {
    this.x_input = 0;
    this.y_input = 0;
    
    this.x_move = 0;
    this.y_move = 0;
    
    this.x_pos = 0;
    this.y_pos = 200;
    
    this.x_new = 0;
    this.y_new = 0;
    
    this.sensitivity = 3;
    
    this.coolmax = 25;
    this.cooldown = this.coolmax;
  }
  
  getX(){
    return(this.x_pos);
  }
  getY(){
    return(this.y_pos);
  }
  
  step(x_in, y_in) {
    this.x_move = x_in * this.sensitivity;
    this.y_move = y_in * this.sensitivity;

    this.x_new = this.x_pos + this.x_move;
    this.y_new = this.y_pos + this.y_move;

    if(this.x_new < (canvas_size/2) && this.x_new > -(canvas_size/2)){
      this.x_pos = this.x_new;
    }
  
    if(this.y_new < (canvas_size/2) && this.y_new > -(canvas_size/2)){
      this.y_pos = this.y_new;
    }
  }
  
  fire(button_in) {
    if(button_in == 1) {
      if(this.cooldown == 0) {
        projectiles.push(new Projectile(this.x_pos, this.y_pos, 0));
        this.cooldown = this.coolmax;
      } else {
        this.cooldown--;
      }
    } else {
      this.cooldown = 0;
    }
  }
  
  draw(){
    fill('white');
    rect(this.x_pos  + (canvas_size / 2), this.y_pos  + (canvas_size / 2), 20, 20);
  }
}

class Projectile {
  constructor(x, y, inv) {
    this.x = x + 7;
    this.y = y;
    this.invader = inv;
    
    this.height = 20;
    this.width = 6;
    
    this.speed = 2;
  }
  
  getX(){
    return(this.x);
  }
  getY(){
    return(this.y);
  }
  getH() {
    return(this.height);
  }
  getW() {
    return(this.width);
  }
  
  fromInvader() {
    return(this.invader);
  }
  
  move() {
    if(this.invader){
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }
  } 
  
  display() {
    if(this.invader){
      fill('purple');
    } else {
      fill('lightblue');
    }
    rect(this.x  + (canvas_size / 2), this.y  + (canvas_size / 2), this.width, this.height);
  }
  

}

class Invader {
  constructor(ix, iy, iw, ih) {
    this.x = ix;
    this.y = iy;
    this.width = iw;
    this.height = ih;
    
    this.firerate = 300
    this.cooldown = random(this.firerate);
    
    this.velocity = 1;
    this.counter = 100;
    this.downCount = 0;
  }
  
  getX(){
    return(this.x);
  }
  getY(){
    return(this.y);
  }  
  
  step() {
    if(this.downCount >= 5) {
      if(this.counter > 30) {
        this.x += this.velocity;
        this.counter--;
      } else if(this.counter > -20) {
        this.y += this.velocity;
        this.counter--;
      } else if(this.counter > -90) {
        this.x -= this.velocity;
        this.counter--;
      } else if(this.counter > -120) {
        this.y -= this.velocity;
        this.counter--;
      } else {
        this.downCount = 0;
        this.counter = 100;
      }
    } else {
      if(this.counter > 30) {
        this.x += this.velocity;
        this.counter--;
      } else if(this.counter > 0) {
        this.y += this.velocity;
        this.counter--;
      } else if(this.counter > -70) {
        this.x -= this.velocity;
        this.counter--;
      } else if(this.counter > -100) {
        this.y -= this.velocity;
        this.counter--;
      } else {
        this.downCount++;
        this.counter = 100;
      }
    }
    
  }
  
  display() {
    fill('red');
    rect(this.x  + (canvas_size / 2), this.y  + (canvas_size / 2), this.width, this.height);
  }
  
  fire() {
    if(this.cooldown <= 0) {
      projectiles.push(new Projectile(this.x, this.y, 1));
      this.cooldown = random(this.firerate) + this.firerate;
    } else {
      this.cooldown--;
    }
  }
}

function serialError(err){
  console.log('something went wrong with the port. ' + err);
}

function portClose(){
  console.log('the port was closed');
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
  // Display the list the console:
  print(i + " " + portList[i]);
  }
}