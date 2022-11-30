import React from "react";
import PlayingCard from "./PlayingCard";

export default class HiddenCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: props.card
        }
    }

    render() {
        return (
            <div class="playing-card hidden">
                <p> {this.state.suit} </p>
                <p>,</p>
                <p> {this.state.rank} </p>
            </div>
        )
    }
}