const ScoreBoard = {

    ctx: undefined,
    init: function(ctx) {
        ctx.font = "50px Permanent Maker, cursive "
        this.ctx = ctx;
    },

    update: function(score) {
        this.ctx.fillStyle = "black";
        this.ctx.fillText(Math.floor(score), 580 , 70);
        this.ctx.textShadow = 20;
    }

}