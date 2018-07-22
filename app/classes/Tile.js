export class Tile {
    constructor(drawground,x1,y1,w,h){
        this.drawground = drawground;
        this.x1 = x1;
        this.y1 = y1;
        this.w = w;
        this.h = h;
        this.x2 = x1 + w;
        this.y2 = y1 + h;
        this.cx = x1 + w/2;
        this.cy = y1 + h/2;
    }
    refresh(){
        this.x2 = this.x1 + this.w;
        this.y2 = this.y1 + this.h;
    }
    drawNormal(){
        let rt = [];
        rt.push([
            this.drawground.fillStyle = '#000000',
            this.drawground.shadowBlur = 0,
            this.drawground.fillRect(this.x1+1, this.y1+1, this.w-2, this.h-2)
        ]);
        return rt;
    }
    drawGlow(opacity, blur){
        let rt = [];
        rt.push([
            this.drawground.fillStyle = `#d6281b`,
            this.drawground.shadowColor = `#d6281b`,
            this.drawground.shadowBlur = blur,
            this.drawground.globalAlpha = opacity,
            this.drawground.fillRect(this.x1+1, this.y1+1, this.w-2, this.h-2),
            this.drawground.globalAlpha = 1
        ]);
        return rt;
    }
}