class GUIController {
    constructor () {
        this.score = 0;
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.gameOver = document.getElementById('gameOver');
        this.gameOverText = document.getElementById('gameOverText');
    }

    addScore(scoreIncrement) {
        this.score += scoreIncrement;
        this.scoreDisplay.textContent = this.score.toString();
    }

    setGameOverText (text) {
        this.gameOverText.textContent = text;
        this.gameOver.style.display = 'flex';
    }
}

const guiController = new GUIController();

export default guiController