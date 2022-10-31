const Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    fps: 60,
    keys: {
        SPACE: 32
    },
    floor: 642,
    minCol: 40,
    gapCols: 150,
    top: 0,
    randomInt: function (min,max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }, 
    

    init: function () {
        console.log("Cargado")
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext("2d");
        
        ScoreBoard.init(this.ctx);
        
        this.start()
        
    },
    start: function() {
        console.log("Empezando juego")
        this.nombre = prompt("Introduce tu nombre")
        

        this.reset();

        
        
        // Loop del juego

        this.interval = setInterval(() => {

            // frameCounter es el mecanismo para programar acciones periodicas por ejemplo cada 50 frame genera un obtaculo o cada 6 frame cambia el skin del personaje
            this.frameCounter++;

            this.score += 0.01;
            //este numero he cambiado de 1000 a 700 para que no se dupliquen
            if(this.frameCounter > 700) {
                this.frameCounter = 0;
            }

            // Cada 50 frame genera un obtaculo
            if(this.frameCounter % 90 === 0) {
                this.generateObstacle()
            }

            this.moveAll();
            this.drawAll();

            this.clearObstacles()

            if(this.isCollision()) {
                this.gameOver();
            }

        }, 1000 / this.fps)

    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys)
        // this.scoreBoard = ScoreBoard
        this.score = 0;
        this.obstacles = []
        this.scoreBoard = ScoreBoard;
        this.frameCounter = 0

        let canva = document.querySelector("canvas")
        let restart = document.querySelector(".restart")
        let menu = document.querySelector(".gameMenu")

        canva.style.display = "block"
        restart.style.display = "none"
        menu.style.display = "none"
    },

    moveAll: function() {
        this.background.move()
        this.player.move()

        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })
    },

    drawAll: function() {

        this.background.draw()
        this.player.draw(this.frameCounter)
        this.obstacles.forEach(obstacle => {
            obstacle.draw()
        })

        this.drawScore();
    },

    stop: function() {
        clearInterval(this.interval)
    },

    generateObstacle: function() {


        const hcol1 = this.randomInt(this.minCol, this.floor - (this.gapCols + this.minCol));
        const hcol2 = (this.floor-this.gapCols) - hcol1;

        this.obstacles.push(
            new Obstacle(this.canvas.width, this.floor - hcol1, hcol1, this.ctx, this.score),
            new Obstacle(this.canvas.width, 0, hcol2, this.ctx, this.score)
        )
    },

    clearObstacles: function() {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x >= -20)
    },

    isCollision: function() {
        
        return this.obstacles.some(obstacle => {
            return (this.player.x + this.player.w >= obstacle.x &&
                this.player.x < obstacle.x + obstacle.w &&
                this.player.y + (this.player.h -8) >= obstacle.y && this.player.y < obstacle.y + obstacle.h)
        },)
    },

    gameOver: function() {
        console.log("game OV")
        let canva = document.querySelector("canvas")
        let restart = document.querySelector(".restart")
        let menu = document.querySelector(".gameMenu")  
        this.stop();

        canva.style.display = "none"
        restart.style.display = "block"
        menu.style.display = "block"

        document.querySelector(".puntos").innerText = Math.floor(this.score)
        document.querySelector(".nombre").innerText = this.nombre

        
    },
    
    drawScore: function() {
        this.scoreBoard.update(this.score)
    },

    restart: function() {
        this.reset(), 
        this.start()
    },

}





