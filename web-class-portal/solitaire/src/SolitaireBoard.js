import React from 'react';
import PlayingCard from './PlayingCard';
import CardStack from './CardStack';
import CardColumn from './CardColumn';
import HiddenCard from './HiddenCard';

export default class SolitaireBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            deck: []
        }
        this.createDeck();
        this.shuffleDeck();
    }
    createDeck() {
        for (let s = 1; s <= 4; s++) {
            for (let r = 1; r <= 13; r++) {
                this.state.deck.push(<PlayingCard rank={r} suit={s}/>)
            }
        }
    }

    shuffleDeck() {
        for (let i = this.state.deck.length; i > 0; i--) {
            const j = Math.floor(Math.random() * (i - 0) + 0);
            this.swapCards(i,j);
        }
    }

    swapCards(i, j) {
        const temp = this.state.deck[i];
        this.state.deck[i] = this.state.deck[j];
        this.state.deck[j] = temp;
    }

    render() {
        const columns = [];
    
        // for the 7 columns
        for (let i = 1; i <= 8; i++) {
            const cards = [];
            // add cards to that column depending on what column it is
            for (let j = i; j > 0; j--) {
                // if the card isnt the last card hide it
                if(j > 1){
                    cards.push(<HiddenCard card={this.state.deck.pop()}/>)
                }else{
                    cards.push(this.state.deck.pop());
                }
            }
            columns.push(<CardColumn cards={cards}/>);   
        }

        return (
            <div id="solitaire-board">
                <div id="draw-pile">
                    <PlayingCard suit="hide" rank="hide"/>
                    <PlayingCard suit="show" rank="show"/>
                </div>
                
                <div id="stacks">
                    <CardStack/>
                    <CardStack/>
                    <CardStack/>
                    <CardStack/>
                </div>

                <div id="columns">
                    {columns}
                </div>
            </div>
        );
    }
}