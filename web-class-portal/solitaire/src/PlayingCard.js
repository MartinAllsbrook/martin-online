import React from "react";

export default class PlayingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suit: props.suit,
            rank: props.rank,
        }
    }

    render() {
        return (
            <div class="playing-card">
                <p> {this.state.suit} </p>
                <p>,</p>
                <p> {this.state.rank} </p>
            </div>
        )
    }
}