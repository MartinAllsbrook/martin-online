export default class SolitaireEngine {
    constructor(){
        this.deck = [];
        this.cardSelected = false;
        this.selectedCardPosition = null;
        this.gameState = {
            columns: [],
            faceUpDeck: [],
            piles: []
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
        for(let i = 1; i <= 4; i++){
            const card = {
                rank: 0,
                suit: i,
                selected: false
            }
            this.gameState.piles.push(card);
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

        if(row === -1){


            if(this.selectedCardPosition.area == "columns"){
                const movingCard = this.gameState.columns[this.selectedCardPosition.column][this.selectedCardPosition.row];
                if(movingCard.rank == 13){
                    movingCard.selected = false;
                    this.cardSelected = false;

                    let lastCardPulled
                    const cardsToMove = [];
                    while(lastCardPulled != movingCard){
                        lastCardPulled = this.gameState.columns[this.selectedCardPosition.column].pop();
                        cardsToMove.push(lastCardPulled);
                    }
                    for(let i = cardsToMove.length - 1; i >= 0; i--){
                        this.gameState.columns[column].push(cardsToMove[i]);
                    }
                }
            }else if(this.selectedCardPosition.area == "faceUpDeck"){
                const movingCard = this.gameState.faceUpDeck[this.gameState.faceUpDeck.length-1];
                if(movingCard.rank == 13){
                    movingCard.selected = false;
                    this.cardSelected = false;

                    const cardToMove = this.gameState.faceUpDeck.pop();
                    this.gameState.columns[column].push(cardToMove);
                }
            }
        }else{
            let clickedCard
            if(area == "columns"){
                clickedCard = this.gameState[area][column][row];
            }else if(area == "faceUpDeck"){
                clickedCard = this.gameState[area][this.gameState[area].length - 1];
            }
    
            if(area == "columns" || area == "faceUpDeck"){
    
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
    
                    // if there is already card selected, and the player click on the columns
                    }else if(area == "columns"){
                        // const selectedColumn = this.selectedCardPosition.column;
                        const targetCard = this.gameState.columns[column][this.gameState.columns[column].length-1];
                        let movingCard;
                        if(this.selectedCardPosition.area == "columns"){
                            movingCard = this.gameState.columns[this.selectedCardPosition.column][this.selectedCardPosition.row];
                        }else if(this.selectedCardPosition.area == "faceUpDeck"){
                            movingCard = this.gameState.faceUpDeck[this.gameState.faceUpDeck.length-1];
                        }
    
                        //if the card can be moved to the clicked on pile
                        const oddMoving = movingCard.suit % 2;
                        const oddTarget = targetCard.suit % 2;
    
                        // 
                        if(oddMoving != oddTarget && movingCard.rank === (targetCard.rank - 1)){
                            movingCard.selected = false;
                            this.cardSelected = false;
    
                            if(this.selectedCardPosition.area == "columns"){
                                let lastCardPulled
                                const cardsToMove = [];
                                while(lastCardPulled != movingCard){
                                    lastCardPulled = this.gameState.columns[this.selectedCardPosition.column].pop();
                                    cardsToMove.push(lastCardPulled);
                                }
                                for(let i = cardsToMove.length - 1; i >= 0; i--){
                                    this.gameState.columns[column].push(cardsToMove[i]);
                                }
                            }else if(this.selectedCardPosition.area == "faceUpDeck"){
                                const cardToMove = this.gameState.faceUpDeck.pop();
                                this.gameState.columns[column].push(cardToMove);
                            }
                            // this.gameState.columns[column].push(cardToMove);
                        }
                    }
                }
            }else if(area == "piles"){
                let movingCard;
                if(this.selectedCardPosition.area == "columns"){
                    if(this.gameState.columns[this.selectedCardPosition.column].length-1 == this.selectedCardPosition.row){
                        movingCard = this.gameState.columns[this.selectedCardPosition.column][this.selectedCardPosition.row];
                    }
                }else if(this.selectedCardPosition.area == "faceUpDeck"){
                    movingCard = this.gameState.faceUpDeck[this.gameState.faceUpDeck.length-1];
                }
                const targetCard = this.gameState.piles[row];
    
                console.log("suit: " + movingCard.suit + " row: " + row+1);
    
                if(movingCard.suit == row+1 && movingCard.rank == targetCard.rank+1){
                    movingCard.selected = false;
                    this.cardSelected = false;
    
                    let cardToMove;
                    if(this.selectedCardPosition.area == "columns"){
                        cardToMove = this.gameState.columns[this.selectedCardPosition.column].pop();
                    }else if(this.selectedCardPosition.area == "faceUpDeck"){
                        cardToMove = this.gameState.faceUpDeck.pop();
                    }
                    this.gameState.piles[row] = cardToMove;
                }
            }
        }
    }

    clickDeck() {
        if(this.deck.length > 0){
            this.gameState.faceUpDeck.push(this.deck.pop());
        }else{
            this.resetDeck();
        }
    }

    resetDeck() {
        for(let i = 0; i < this.gameState.faceUpDeck.length; i++){
            this.deck.push(this.gameState.faceUpDeck.pop());
        }
    }

    getGameState(){
        return this.gameState;
    }
}

