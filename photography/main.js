import Image from "./Image.js";

const images = [];

images.push(new Image("Sleek Spikes", "sleek-spikes", "Macro Photo of the spikes produced by ferrofuid over a magnet"));

const imageGrid = document.getElementById("image-grid");

images.forEach(image => {
    imageGrid.appendChild(image.element);
});