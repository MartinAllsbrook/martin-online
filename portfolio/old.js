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

let selected_handle;
let selected_title;

let portfolio = false;
let portfolio_item = false;

console.log(document.getElementById('page-title').innerHTML);

// Determine the type of page we're on
if(document.getElementById('page-title').innerHTML == 'Portfolio Item'){
    portfolio_item = true;
} else if(document.getElementById('page-title').innerHTML == 'Portfolio') {
    portfolio = true;
}

// All page conditional statments done here
if(portfolio){
    for(let i = 0; i < titles.length; i++) {
        items.push(new Item(handles[i], titles[i]));
    }
    
    for(let i = 0; i < titles.length; i++) {
        document.getElementById('main-grid').innerHTML += '<div class="basic-container" id="cell' +[i]+ '"> </div>';
        document.getElementById('cell' + i).innerHTML += '<a href="portfolio-item"><img src="assets/' + items[i].getHandle() + '.svg" alt=""></a>';
        document.getElementById('cell' + i).innerHTML += '<a class="biglink" href="portfolio-item"><p> ' + items[i].getTitle() + ' </p></a>';

        document.getElementById('cell' + i).addEventListener("click", function(){
            selected_handle = items[i].getHandle();
            selected_title = items[i].getTitle();
        });
    }
}

    
// Could combine these two statements
if(portfolio_item){
    document.getElementById('page-title').innerHTML = selected_title;
}

