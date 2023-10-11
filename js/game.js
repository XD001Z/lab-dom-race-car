class Game {
    constructor () {
        this.startScreen = document.getElementById("game-intro")
        this.gameScreen = document.getElementById("game-screen")
        this.gameEndScreen = document.getElementById("game-end")
        this.player = new Player(this.gameScreen,200,500,100,150,"./images/car.png")
        this.height = 600
        this.width = 500
        this.obstacles = []
        this.score = document.getElementById("score")
        this.lives = document.getElementById("lives")
        this.gameIsOver = false
    }

    start () {
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width = `${this.width}px`
        this.startScreen.style.display = "none"
        this.gameScreen.style.display = "block"
        this.gameLoop()
    }

    gameLoop () {
        if (this.gameIsOver) {
            return
        }
        this.update()
        window.requestAnimationFrame(() => this.gameLoop())
    }

    update () {
        this.player.move()

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives.innerHTML = Number(this.lives.innerHTML) - 1
                i--;
            }
            else if (obstacle.top > this.height) {
                this.score.innerHTML = Number(this.score.innerHTML) + 1
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                i--;
            }
        }

        if (Number(this.lives.innerHTML) === 0) {
            this.endGame();
        }

        if (Math.random() > 0.98 && this.obstacles.length < 1) {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }
    }

    endGame() {
        this.player.element.remove();
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.gameIsOver = true;
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";
      }
}