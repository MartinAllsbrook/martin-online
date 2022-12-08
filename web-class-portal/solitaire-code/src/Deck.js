import React from "react";

export default class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateHandler: props.updateHandler,
            engine: props.engine,
        }

        this.onDeckClick = this.onDeckClick.bind(this);
    }

    onDeckClick() {
        this.state.engine.clickDeck();
        this.state.updateHandler();
    }

    render() {
        return (
            <div class="playing-card" onClick={this.onDeckClick}>
                <p> DECK </p>
            </div>
        )
    }
}