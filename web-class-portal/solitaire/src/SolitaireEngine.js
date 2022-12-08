export default class SolitaireEngine {
    constructor(){
        this.deck = [];
        this.cardSelected = false;
        this.selectedCardPosition = null;
        this.gameState = {
            columns: [],
            deck: [],
            piles: [],
        }
        this.createDeck();
        this.shuffleDeck();
        this.deal();
    }

    createDeck() {
        for (let s = 1; s <= 4; s++) {
            for (let r = 1; r <= 13; r++) {
                const card = {
                    rank: r,
                    suit: s,
                    selected: false
                }
                this.deck.push(card)
            }
        }
        // this.deck.forEach(element => {
        //     console.log(element);
        // });
    }

    shuffleDeck() {
        for (let i = this.deck.length-1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i - 0) + 0);
            this.swapCards(i,j);
        }
    }
    
    swapCards(i, j) {
        // console.log("i: " + i + " card: " + this.deck[i]);
        // console.log("j: " + j + " card: " + this.deck[j]);

        const temp = this.deck[i];
        this.deck[i] = this.deck[j];
        this.deck[j] = temp;
    }

    deal() {

        // for the 7 columns
        for (let i = 1; i <= 7; i++) {
            const cards = [];
            // add cards to that column depending on what column it is
            for (let j = i; j > 0; j--) {
                // if the card isnt the last card hide it
                const card = this.deck.pop();
                let hidden = false;
                if(j > 1){
                    hidden = true;
                }
                // console.log(card);
                card.hidden = hidden;
                // console.log(card);
                cards.push(card);
            }
            this.gameState.columns.push(cards);   
        }
    }

    revealCard(cardPosition) {
        const area = cardPosition["area"];
        const row = cardPosition["row"];
        const column = cardPosition["column"];

        if(area == "columns"){
            const card = this.gameState[area][column][row];
            card.hidden = false;
        }
    }

    selectCard(cardPosition) {
        const area = cardPosition["area"];
        const row = cardPosition["row"];
        const column = cardPosition["column"];

        if(area == "columns"){
            const clickedCard = this.gameState[area][column][row];

            // if the clicked card is already selected
            if(clickedCard.selected){
                this.cardSelected = false;
                clickedCard.selected = false;
                this.selectedCardPosition = null;

            }else{
                // if there is no card selected
                if(!this.cardSelected){
                    this.cardSelected = true;
                    clickedCard.selected = true;
                    this.selectedCardPosition = cardPosition;

                // if there is already card selected
                }else{
                    const selectedColumn = this.selectedCardPosition.column
                    const movingCard = this.gameState.columns[selectedColumn][this.gameState.columns[selectedColumn].length-1];
                    const targetCard = this.gameState.columns[column][this.gameState.columns[column].length-1];

                    //if the card can be moved to the clicked on pile
                    const oddMoving = movingCard.suit % 2;
                    const oddTarget = targetCard.suit % 2;
                    if(oddMoving != oddTarget && movingCard.rank === (targetCard.rank - 1)){
                        const cardToMove = this.gameState.columns[this.selectedCardPosition.column].pop();
                        cardToMove.selected = false;
                        this.gameState.columns[column].push(cardToMove);
                        this.cardSelected = false;
                    }


                }
            }
            // console.log(this.gameState[area][column][row]);
        }
        // this.updateApp();
    }

    getGameState(){
        return this.gameState;
    }
}

