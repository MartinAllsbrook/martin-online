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

let handles = ['type-specimen', 'hamburgefonstiv', 'big-worms', 'colorado-symphony', 'snake', 'glee-2023'];
let titles = ['TYPE SPECIMEN POSTER', 'HAMBURGEFONSTIV', 'BIG WORMS', 'COLORADO SYMPHONY', 'SNAKE', 'GLEE 2023'];

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

