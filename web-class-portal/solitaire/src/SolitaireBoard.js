import React from 'react';
import PlayingCard from './PlayingCard';
import CardStack from './CardStack';
import CardColumn from './CardColumn';
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
            columns.push(<CardColumn 
                updateHandler={this.updateHandler} 
                cards={cards} 
                engine={this.state.engine}
            />);   
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