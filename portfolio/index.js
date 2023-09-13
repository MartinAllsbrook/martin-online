document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.setItem('linkedfrom', 'portfolio');

    class Item {
        constructor(link, title, image) {
            this.link = link;
            this.title = title;
            this.image = image;
        }

        getTitle() {
            return(this.title);
        }

        getTitle() {
            return(this.title);
        }

        getImage() {
            return(this.image);
        }
    }

    let items = [];

    let links = ['snake', 'glee-2023', 'growapp', 'type-specimen', 'handboard-poc', 'colorado-symphony', 'big-worms'];
    let titles = ['SNAKE', 'GLEE 2023', 'GROWAPP', 'TYPE SPECIMEN POSTER', 'HANDBOARD GAME POC', 'COLORADO SYMPHONY', 'BIG WORMS'];
    let images = ['snake.svg', 'glee-2023.svg', 'growapp.svg', 'type-specimen.svg', 'handboard-poc.svg', 'colorado-symphony.svg', 'big-worms.svg']

    items.push(new Item('https://www.youtube.com/watch?v=oaJc5zhMxUc&list=PLqE9DFQ0X_eID0jfSQ7aloYMET8LbvmW5&index=1', 'ROAD RUNNER', 'roadrunnerthumb.png'));
    items.push(new Item('xenoplanet', 'XENOPLANET', 'xenoplanet2.png'));
    items.push(new Item('guillotine', 'THE GUILLOTINE', 'the-guillotine.png'));
    items.push(new Item('glee-2023', 'GLEE 2023', 'glee 2.png'));
    items.push(new Item('handboard-poc', 'HANDBOARD GAME', 'handboard-poc2.png'));
    items.push(new Item('../arcade', 'ARCADE', 'snake.svg'));
    items.push(new Item('aire-ux', 'AIRE UX DESIGN', 'AIRE Dubai.png'));
    items.push(new Item('colorado-symphony', 'COLORADO SYMPHONY', 'colorado-symphony.svg'));
    items.push(new Item('type-specimen', 'TYPE SPECIMEN POSTER', 'type-specimen.svg'));
    items.push(new Item('growapp', 'GROWAPP', 'growapp.svg'));
    items.push(new Item('big-worms', 'BIG WORMS', 'big-worms.svg'));


    for(let i = 0; i < items.length; i++) {
        document.getElementById('main-grid').innerHTML += '<div class="basic-container" id="cell' +[i]+ '"> </div>';
        document.getElementById('cell' + i).innerHTML += '<a href="' + items[i].link + '"><img src="assets/' + items[i].image + '" alt=""><h5>' + items[i].title + '</h5></a>';
    }

    document.getElementById('main-grid').innerHTML += '<div class="basic-container" id="cellback"> </div>';
    document.getElementById('cellback').innerHTML += '<a href="../"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080"><defs><style>.cls-1{fill:#fff;}.cls-2,.cls-3{fill:none;stroke:#fff;stroke-width:14px;}.cls-2{stroke-miterlimit:10;}.cls-3{stroke-linejoin:bevel;}</style></defs><rect width="1080" height="1080"/><path class="cls-1" d="M433.91,535.11c-7.47,5.71-16.42,6.52-25.65,6.52H370V445.29h38.26c7.74,0,15.74,1.09,22.26,5.29a25,25,0,0,1,11.12,20.9c0,7.87-3.66,16.69-11.8,20.35a23.54,23.54,0,0,1,13.84,21.71C443.68,522.09,440.83,529.82,433.91,535.11Zm-25-74.76H387.37v24.16h22c7.87,0,14.52-2.85,14.52-11.94S416.81,460.35,408.94,460.35Zm.54,38.81H387.37v26.73h21.57c8.14,0,17-3,17-12.75C425.9,502.82,418.71,499.16,409.48,499.16Z"/><path class="cls-1" d="M516.53,541.49,510.29,523H472l-6.25,18.45H448.15l33.78-96.2h19.13l33.79,96.2Zm-25.37-74.76L477.45,507.3h27.41Z"/><path class="cls-1" d="M605,531.86a38.67,38.67,0,0,1-27.55,11.4c-10.31,0-19.94-3.4-27.27-10.72-10.45-10.45-11.94-23.34-11.94-39.08s1.49-28.63,11.94-39.08c7.33-7.32,17-10.85,27.27-10.85A38.42,38.42,0,0,1,605,454.66c5.56,5.69,8.41,13.29,9.23,20.89H596.3A17.8,17.8,0,0,0,592,465.37c-3.12-3.93-8.55-6-14.52-6a20.3,20.3,0,0,0-14.78,6.38C556,472.7,556,484.64,556,493.46s0,20.76,6.65,27.68a20.3,20.3,0,0,0,14.78,6.38c6,0,11.4-2.17,14.52-6.11a19,19,0,0,0,4.34-10.58h17.92C613.4,518.43,610.55,526.16,605,531.86Z"/><path class="cls-1" d="M689.38,541.49,663.32,496l-16.55,19.4v26h-17.5v-96.2h17.5v44.37l38.4-44.37h21.3l-30.93,36.37L710,541.49Z"/><line class="cls-2" x1="433.33" y1="607.22" x2="710" y2="607.22"/><polygon class="cls-3" points="433 636.47 403.11 621.84 373.22 607.22 403.11 592.59 433 577.97 433 636.47"/></svg></a>';
    document.getElementById('cellback').innerHTML += '<a href="../"></a>';
}, false);