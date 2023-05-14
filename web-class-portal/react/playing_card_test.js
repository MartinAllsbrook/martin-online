'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="playing-card">
                <h1>
                    ACE
                </h1>
            </div>
        );
    }
}

const domContainer = document.querySelector('#hello-react-container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));