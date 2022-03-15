

let handles = ['type-specimen', 'hamburgefonstiv', 'big-worms', 'colorado-symphony', 'snake', 'glee-2023'];
let titles = ['TYPE SPECIMEN POSTER', 'HAMBURGEFONSTIV', 'BIG WORMS', 'COLORADO SYMPHONY', 'SNAKE', 'GLEE 2023'];
let addresses =[];

for(let i = 0; i < titles.length; i++) {
    document.getElementById('main-grid').innerHTML += '<div class="basic-container" id="cell' +[i]+ '"> </div>';
    document.getElementById('cell' + i).innerHTML += '<a href="' + handles[i] + '"><img src="assets/' + handles[i] + '.svg" alt=""></a>';
    document.getElementById('cell' + i).innerHTML += '<a class="biglink" href="' + handles[i] + '"><p> ' + titles[i] + ' </p></a>';
}
