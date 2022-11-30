import React from "react";
import PlayingCard from "./PlayingCard";

export default class CardStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topCard: 0
        }
    }

    render() {
        if(this.state.topCard == 0){
            return (
                <PlayingCard suit="0" rank="0"/>
            )
        }
    
        return (
            <PlayingCard suit="0" rank="0"/>
        );
    }
}