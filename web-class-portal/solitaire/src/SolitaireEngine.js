import PlayingCard from "./PlayingCard";
import HiddenCard from "./HiddenCard";
import App from "./App";

export default class SolitaireEngine {
    constructor(){
        this.deck = [];
        this.gameState = {
            columns: [],
            deck: [],
            piles: [],
            cardSelected: false
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

    selectCard(cardPosition) {
        const area = cardPosition["area"];
        const row = cardPosition["row"];
        const column = cardPosition["column"];
        if(area == "columns"){
            
            const selectedCard = this.gameState[area][column][row]
            if(selectedCard.selected){
                this.gameState.cardSelected = false;
                selectedCard.selected = false;
            }else{
                if(!this.gameState.cardSelected){
                    this.gameState.cardSelected = true;
                    selectedCard.selected = true;
                }
            }
            console.log(this.gameState[area][column][row]);
        }
        // this.updateApp();
    }

    updateApp(){
        App();
    }

    getGameState(){
        return this.gameState;
    }
}

