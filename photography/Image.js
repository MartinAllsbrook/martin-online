export default class Image {
    constructor(title, fileName, description) {
        this.title = title;
        this.fileName = fileName;
        this.description = description;

        this.element = this.CreateDOMElement();
    }

    CreateDOMElement() {
        this.adress = "images/" + this.fileName

        const element = document.createElement("div");
        const imageElement = document.createElement("img");

        imageElement.src = this.address;

        element.appendChild(imageElement);
        return element;
    }
}