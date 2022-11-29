'use strict';

const e = React.createElement;

export default class PlayingCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suit: 'TEST SUIT',
            rank: 'TEST RANK'
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

// const domContainer = document.querySelector('#playing-card-container');
// const root = ReactDOM.createRoot(domContainer);
// root.render(e(PlayingCard));