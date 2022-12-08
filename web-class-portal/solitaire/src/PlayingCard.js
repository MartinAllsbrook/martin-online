import React from "react";
import SolitaireBoard from "./SolitaireBoard";

export default class PlayingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateHandler: props.updateHandler,
            suit: props.suit,
            rank: props.rank,
            position: props.position,
            engine: props.engine,
            selected: props.selected,
            hidden: props.hidden
        }

        this.onCardSelect = this.onCardSelect.bind(this);
        // this.test = this.test.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            rank: nextProps.rank,
            suit: nextProps.suit,
            selected: nextProps.selected,
            hidden: nextProps.hidden 
        });  
    }

    onCardSelect() {
        this.state.engine.selectCard(this.state.position);
        this.state.updateHandler();
        // this.forceUpdate();
    }

    render() {
        // console.log("card update: " + this.state.hidden);
        if (this.state.hidden){
            return (
                <div class="playing-card hidden">
                    {/* <p> {this.state.suit} </p>
                    <p>,</p>
                    <p> {this.state.rank} </p> */}
                </div>
            )
        }
        if (this.state.selected){
            return (
                <div class="playing-card selected" onClick={this.onCardSelect}>
                    <p> {this.state.suit} </p>
                    <p>,</p>
                    <p> {this.state.rank} </p>
                </div>
            )
        }

        return (
            <div class="playing-card" onClick={this.onCardSelect}>
                <p> {this.state.suit} </p>
                <p>,</p>
                <p> {this.state.rank} </p>
            </div>
        )
    }
}