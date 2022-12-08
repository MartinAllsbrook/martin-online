import React from "react";
import PlayingCard from "./PlayingCard";

export default class CardColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: props.cards
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ cards: nextProps.cards });  
    }


    render() {
        // const cards=[];
        // for (let i = this.state.cards.length; i > 0; i--) {
        //     if(i > 1){
        //         cards.push(<PlayingCard rank={this.state.cards[i].rank} suit={this.state.cards[i].suit} />);
        //     }else{
        //         cards.push(<PlayingCard rank={this.state.cards[i].rank} suit={this.state.cards[i].suit} />);
        //     }
            
        // }
    
        return (
            <div class="card-column">
                {this.state.cards}
            </div>
        );
    }
}