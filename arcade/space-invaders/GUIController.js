import gameBoard from "./main.js";

class GUIController {
    constructor () {
        this.score = 0;
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.gameOver = document.getElementById('gameOver');
        this.gameOverText = document.getElementById('gameOverText');
        
        document.getElementById('restart').addEventListener('click', () => {
            this.restart();
        }, false);
    }

    addScore(scoreIncrement) {
        this.score += scoreIncrement;
        this.scoreDisplay.textContent = 'Score: ' + this.score.toString();
    }

    restart() {
        this.gameOver.style.display = 'none';
        gameBoard.restartGame();
    }

    setGameOverText (text) {
        this.gameOverText.textContent = text;
        this.gameOver.style.display = 'flex';
    }
}

const guiController = new GUIController();

export default guiController