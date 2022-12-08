import React from "react";
import PlayingCard from "./PlayingCard";

export default class CardColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: props.cards,
            engine: props.engine,
            updateHandler: props.updateHandler
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ cards: nextProps.cards });  
    }

    render() {
        if(this.state.cards.length > 0){
            if(this.state.cards[this.state.cards.length-1].props.hidden){
                const position = this.state.cards[this.state.cards.length-1].props.position
                this.state.engine.revealCard(position);
                this.state.updateHandler();
                // console.log(this.state.cards[this.state.cards.length-1].props.position);
            }
        }

        return (
            <div class="card-column">
                {this.state.cards}
            </div>
        );
    }
}