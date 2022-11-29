'use strict';

const e = React.createElement;
// import PlayingCard from "./PlayingCard.js";

class PlayingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suit: props.suit,
            rank: props.rank
        }
    }

    render() {
        return (
            <div class="playing-card empty-pile">
                <p>
                    {this.state.suit} 
                </p>
                <p>
                    {this.state.rank}
                </p>
            </div>
        )
    }
}

class CardStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topCard: 0
        }
    }

    render() {
        if(this.state.topCard == 0){
            return (
                <PlayingCard suit="poopoo" rank="Ace"/>
            )
        }
    
        return (
            <div class="playing-card">
                <h1>
                    2
                </h1>
                <h1>
                    SPADES
                </h1>
            </div>
        );
    }
}

const domContainer = document.querySelector('#card-stack-container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(CardStack));