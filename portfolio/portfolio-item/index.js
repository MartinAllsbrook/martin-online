class Item {
    constructor(handle, title) {
        this.handle = handle;
        this.title = title;
    }

    getHandle() {
        return(this.handle);
    }

    getTitle() {
        return(this.title);
    }
}

var clicked_item = sessionStorage.getItem('clicked item');
console.log(clicked_item);

var favoritemovie = sessionStorage.getItem("favoriteMovie");
console.log(favoritemovie);