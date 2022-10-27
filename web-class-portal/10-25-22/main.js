import BlueBox from './BlueBox.js';
import RedBox from './RedBox.js'

const box = new RedBox(100, 200, 50, 50);


document.body.appendChild(box.getElement());

const box1 = new BlueBox(100, 100, 50);
document.body.appendChild(box1.getElement());

const blueBox = new BlueBox(100, 100, 100);
document.body.appendChild(blueBox.getElement());

// const boxes = [];
for(let i = 0; i < 100; i++){
    // boxes.push(new BlueBox(100, 100, 50 * i))
    document.body.appendChild(new BlueBox(100, 100, 5 * i).getElement());
}