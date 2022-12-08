import React from 'react';
import PlayingCard from './PlayingCard';
import CardColumn from './CardColumn';
import Deck from './Deck';
// import HiddenCard from './HiddenCard';


export default class SolitaireBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            engine: props.engine
        }
        this.updateHandler = this.updateHandler.bind(this);
    }

    updateHandler(){
        this.forceUpdate();
        // console.log("handler functioning");
    }

    render() {
        // console.log("update");
        const columns = [];
        const gameState = this.state.engine.getGameState();
        // for the 7 columns
        for (let i = 0; i < 7; i++) {
            const cards = [];
            // add cards to that column depending on what column it is

            for (let j = 0; j < gameState.columns[i].length; j++) {
                const cardPosition = {
                    area: "columns",
                    column: i,
                    row: j
                }
                // console.log(gameState.columns[i][j].selected);
                const card = <PlayingCard 
                    updateHandler={this.updateHandler}
                    suit={gameState.columns[i][j].suit} 
                    rank={gameState.columns[i][j].rank} 
                    selected={gameState.columns[i][j].selected}
                    engine={this.state.engine} 
                    position={cardPosition}
                    hidden={gameState.columns[i][j].hidden}
                />;
                cards.push(card);
            }
            if(gameState.columns[i].length === 0){
                const cardPosition = {
                    area: "columns",
                    column: i,
                    row: -1
                }
                const card = <PlayingCard 
                    updateHandler={this.updateHandler}
                    engine={this.state.engine} 
                    suit={0} 
                    rank={0} 
                    selected={false}
                    position={cardPosition}
                    hidden={false}
                />;
                cards.push(card)
            }
            columns.push(<CardColumn 
                updateHandler={this.updateHandler} 
                cards={cards} 
                engine={this.state.engine}
            />);   
        }

        let topDeckCard;
        if(gameState.faceUpDeck.length-1 >= 0){
            const topDeckCardPosition = {
                area: "faceUpDeck",
            }
            // console.log(topDeckCardPosition);
            topDeckCard = <PlayingCard 
                updateHandler={this.updateHandler}
                engine={this.state.engine} 
                suit={gameState.faceUpDeck[gameState.faceUpDeck.length-1].suit} 
                rank={gameState.faceUpDeck[gameState.faceUpDeck.length-1].rank} 
                selected={gameState.faceUpDeck[gameState.faceUpDeck.length-1].selected}
                position={topDeckCardPosition}
                hidden={false}
            />;
        }else{
            topDeckCard = <PlayingCard
                updateHandler={this.updateHandler}
                engine={this.state.engine} 
                suit={0} 
                rank={0} 
            />
        }


        let cardPiles = [];
        for(let i = 0; i < 4; i++){
            const cardPilePosition = {
                area: "piles",
                row: i
            }
            cardPiles.push(<PlayingCard 
                updateHandler={this.updateHandler}
                engine={this.state.engine} 
                suit={gameState.piles[i].suit} 
                rank={gameState.piles[i].rank} 
                selected={false}
                position={cardPilePosition}
                hidden={false}
            />)
        }

        return (
            <div id="solitaire-board">
                <div id="draw-pile">
                    <Deck updateHandler={this.updateHandler} engine={this.state.engine}/>
                    {topDeckCard}
                </div>
                
                <div id="stacks">
                    {cardPiles}
                </div>

                <div id="columns">
                    {columns}
                </div>
            </div>
        );
    }
}