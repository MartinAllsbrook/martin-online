'use strict';

const e = React.createElement;

class PlayingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suit: props.suit,
            rank: props.rank
        }
    }

    render() {
        if(this.state.suit == "hide"){
            return (
                <div class="playing-card hidden">
                    <p> {this.state.suit} </p>
                    <p> {this.state.rank} </p>
                </div>
            )
        }

        if(this.state.rank == "empty"){
            return (
                <div class="playing-card empty">
                    <p> {this.state.suit} </p>
                    <p> {this.state.rank} </p>
                </div>
            )
        }

        return (
            <div class="playing-card">
                <p> {this.state.suit} </p>
                <p> {this.state.rank} </p>
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
                <PlayingCard suit="show" rank="empty"/>
            )
        }
    
        return (
            <PlayingCard suit="show" rank="show"/>
        );
    }
}

class CardColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numCards: props.numCards
        }
    }

    render() {
        const cards=[];
        for (let i = this.state.numCards; i > 0; i--) {
            if(i > 1){
                cards.push(<PlayingCard suit="hide" rank="hide"/>);
            }else{
                cards.push(<PlayingCard suit="show" rank="show"/>);
            }
            
        }
    
        return (
            <div class="card-column">
                {cards}
            </div>
        );
    }
}

class SolitaireBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [];
        for (let i = 1; i <= 8; i++) {
            columns.push(<CardColumn numCards={i}/>);   
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

const domContainer = document.querySelector('#solitaire-board-container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(SolitaireBoard));