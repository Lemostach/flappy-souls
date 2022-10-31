class Background {
    constructor(w, h, ctx) {
        this.ctx = ctx;
        this.w = w;
        this.h = h;

        this.img = new Image();
        this.img.src = "img/background.png"


        this.x = 0;
        this.y = 0;
        
        // desplazamiento
        this.dx = 5;
    }
    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.ctx.drawImage(
            this.img,
            this.x + this.w,
            this.y,
            this.w,
            this.h
        )
    }

    move() {
        this.x -= this.dx
        
        if( this.x < -this.w) this.x = 0;
    }
}