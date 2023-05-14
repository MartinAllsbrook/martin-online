import Box from "./Box.js";

export default class BlueBox extends Box{
    constructor(width, height, delay){
        super('#2C2C54', width, height, 0, 0);

        this.el.style.zIndex = '-1';
        // document.addEventListener('mou')

        document.addEventListener('mousemove', (event) => {
            setTimeout(() => {
                this.el.style.left = `${event.pageX}px`;
                this.el.style.top = `${event.pageY}px`;
            }, delay);
        });
    }

}