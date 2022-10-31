class Obstacle {
    constructor(w, start, h, ctx, score) {
        this.ctx = ctx;
        this.w = 60;
        this.h = h;
        this.dx = 10;
        this.x = w;
        this.y = start;
        this.score = score
    }

    draw() {

        
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
        
        
        
        
        
    }

    move() {
        this.x -= this.dx;
        this.increase()
    }

    increase() {
        if(this.score >= 10){
            this.dx = 12
        }
        else if(this.score >=40){
            this.dx = 18
        }
    }
}

