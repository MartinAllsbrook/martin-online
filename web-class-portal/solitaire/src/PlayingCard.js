import React from "react";

export default class PlayingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateHandler: props.updateHandler,
            engine: props.engine,
            suit: props.suit,
            rank: props.rank,
            position: props.position,
            selected: props.selected,
            hidden: props.hidden
        }

        this.onCardSelect = this.onCardSelect.bind(this);
        // this.test = this.test.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            suit: nextProps.suit,
            rank: nextProps.rank,
            position: nextProps.position,
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
        let suit;
        if(this.state.suit === 1){
            suit = 'S';
        }else if(this.state.suit === 2){
            suit = 'H';
        }else if(this.state.suit === 3){
            suit = 'C';
        }else if(this.state.suit === 4){
            suit = 'D';
        }

        let rank = this.state.rank;
        if(rank === 13){
            rank = "K";
        }else if(rank === 12){
            rank = "Q";
        }else if(rank === 11){
            rank = "J";
        }

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
            if(suit === 'S' || suit === 'C'){
                return (
                    <div class="playing-card black selected" onClick={this.onCardSelect}>
                        <p> {suit} </p>
                        <p> , </p>
                        <p> {rank} </p>
                    </div>
                )
            }else if(suit === 'H' || suit === 'D'){
                return (
                    <div class="playing-card red selected" onClick={this.onCardSelect}>
                        <p> {suit} </p>
                        <p> , </p>
                        <p> {rank} </p>
                    </div>
                )
            }
        }

        if(suit === 'S' || suit === 'C'){
            return (
                <div class="playing-card black" onClick={this.onCardSelect}>
                    <p> {suit} </p>
                    <p> , </p>
                    <p> {rank} </p>
                </div>
            )
        }else if(suit === 'H' || suit === 'D'){
            return (
                <div class="playing-card red" onClick={this.onCardSelect}>
                    <p> {suit} </p>
                    <p> , </p>
                    <p> {rank} </p>
                </div>
            )
        }
        return (
            <div class="playing-card" onClick={this.onCardSelect}>
                <p> Blank </p>
            </div>
        )
    }
}