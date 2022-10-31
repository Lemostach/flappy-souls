// import { Game } from "./game";

class Player {

    constructor(w, h, ctx, keys) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        
        this.keys = keys;
        this.x = this.canvasW * 0.1

        // Posición original
        this.y0 = this.canvasH * 0.9;
        
        this.y = this.canvasH/2 - 100;

        this.img = new Image();
        this.img.src = "img/pajaro.png"
        
        this.img.frames = 4;
        this.img.frameIndex = 0;

        this.w = 70;
        this.h = 70;

        this.vy = 0;
        this.vx = 0;
        
        this.setListeners();        
    }


    setListeners() {
        
        // Vincular las teclas de los controladores de teclado
        document.onkeydown = function(event) {
            
            if (
                event.keyCode === this.keys.SPACE               
                ) {

                    this.y -= 3 ;
                    this.vy -= 7;
                    
                    

            }
        }.bind(this)
    }

    draw(frameCounter) {
        this.ctx.drawImage(

            // Cambiando imagen del personaje
            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.animateImg(frameCounter)

    }

    move() {
        console.log(this.y)
        // Gravedad del salto
        let gravity = 0.25;

        if (this.y >= this.y0) {
         this.vy = 1;
         this.y = this.y0;
        } else {
            this.vy += gravity;
            this.y += this.vy;
        }
        if(this.y <= 0 || this.y >= 570){
            Game.gameOver()
        }

    }

    animateImg(frameCounter) {

        if(frameCounter % 10 === 0) {
            this.img.frameIndex++;
        }

        if(this.img.frameIndex > 2) this.img.frameIndex = 0;
    }
    

}