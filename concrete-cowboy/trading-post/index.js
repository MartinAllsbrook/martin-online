let items = [];

let handles = ['beatles','jordan-grey','jordan-white','led-zeppelin','marilyn-manson','marilyn-manson-2'];
let titles = ['VINTAGE BEATLES SHIRT','VINTAGE CLASSIC GREY JORDAN','VINTAGE WHITE JORDAN','VINTAGE LED ZEPPELIN','VINTAGE MARILYN','VINTAGE MARILYN'];
let addresses =[];

for(let i = 0; i < titles.length; i++) {
    document.getElementById('main-grid').innerHTML += '<div class="basic-container" id="cell' +[i]+ '"> </div>';
    document.getElementById('cell' + i).innerHTML += '<a href="' + handles[i] + '"><img src="clothing-assets/' + handles[i] + '/thumbnail.JPG" alt=""></a>';
    document.getElementById('cell' + i).innerHTML += '<a href="' + handles[i] + '"> ' + titles[i] + ' </a>';

    items.push()
}

// document.getElementsByClassName('basic-container').addEventListener("click", );

class ClothingItem {
  constructor(h, t) {
      this.handle = h;
      this.title = t;
  }
}