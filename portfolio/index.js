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

let items = [];

let handles = ['snake', 'glee-2023', 'colorado-symphony', 'big-worms', 'type-specimen',];
let titles = ['SNAKE', 'GLEE 2023', 'COLORADO SYMPHONY', 'BIG WORMS', 'TYPE SPECIMEN POSTER'];

// Testing variable passing
var favoritemovie = "Shrek";
sessionStorage.setItem("favoriteMovie", favoritemovie);

for(let i = 0; i < titles.length; i++) {
    items.push(new Item(handles[i], titles[i]));
}

for(let i = 0; i < titles.length; i++) {
    document.getElementById('main-grid').innerHTML += '<div class="basic-container" id="cell' +[i]+ '"> </div>';
    document.getElementById('cell' + i).innerHTML += '<a href="' + items[i].getHandle() + '"><img src="assets/' + items[i].getHandle() + '.svg" alt=""></a>';
    document.getElementById('cell' + i).innerHTML += '<a class="biglink" href="' + items[i].getHandle() + '"><p> ' + items[i].getTitle() + ' </p></a>';

    document.getElementById('cell' + i).addEventListener("click", function(){
        sessionStorage.setItem('clicked item', items[i].getTitle());
    });
}

