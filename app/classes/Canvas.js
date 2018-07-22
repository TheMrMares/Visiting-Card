import {Tile} from './Tile';

export class Canvas {
    constructor(canvas,framerate,rows,columns){
        this.rows = rows;
        this.columns = columns;
        this.canvas = canvas;
        this.drawground = canvas.getContext('2d');
        this.framerate = framerate;
        this.h = canvas.height;
        this.w = canvas.width;
        this.tw = canvas.width/columns;
        this.th = canvas.height/rows;
        this.mx = 0;
        this.my = 0;
        this.ripples = [];
        this.tiles = [];
        for(let i = 0; i < this.rows;i++){
            for(let k = 0; k < this.columns;k++){
                this.tiles.push(new Tile(this.drawground, k*this.tw, i*this.th, this.tw,this.th));
            }
        }
        this.interval = window.setInterval(() =>{
            this.loop();
        }, this.framerate);
    }
    refreshMouse(event){
        this.mx = event.clientX;
        this.my = event.clientY;
    }
    addRipple(){
        this.ripples.push({
            x: this.mx,
            y: this.my,
            distance: 160,
            width: 70,
            opacity: 1.000,
            v: 30,
            vmod: 1.00
        });
    }
    loop(){
        console.log(this.ripples.length);
        this.drawground.fillStyle = 'rgba(2,2,2,1)';
        this.drawground.fillRect(0,0,this.w,this.h);

        this.tiles.forEach((item,index) => {
            this.drawground.fillStyle = 'rgba(0,0,0,1)';
            this.drawground.shadowColor = '#d6281b';
            this.drawground.shadowBlur = 0;
            item.draw();
        });
        this.tiles.forEach((item,index) => {
            if((this.mx >= item.x1 && this.mx <= item.x2) && (this.my >= item.y1 && this.my <= item.y2)){
                this.drawground.fillStyle = '#d6281b';
                this.drawground.shadowColor = '#d6281b';
                this.drawground.shadowBlur = 30;
                item.draw();
            }
        });
        this.ripples.forEach((item, index) => {
            item.distance += (item.v*item.vmod);
            item.vmod = (item.vmod-0.02).toFixed(2);
            item.opacity = (item.opacity-0.04).toFixed(2);
            if(item.opacity <= 0.00){
                this.ripples.splice(this.ripples.indexOf(item),1);
            }
            let rx = item.x;
            let ry = item.y;
            let rdistance = item.distance;
            let rwidth = item.width;
            let ropacity = item.opacity;
            this.tiles.forEach((item, index) => {
                let xdis = Math.abs(rx - item.cx);
                let ydis = Math.abs(ry - item.cy);
                let rdis =  Math.sqrt(xdis*xdis + ydis*ydis);
                if(rdis < rdistance && rdis > rdistance - rwidth){
                    this.drawground.fillStyle = `#d6281b`;
                    this.drawground.shadowColor = `#d6281b`;
                    this.drawground.shadowBlur = 20;
                    this.drawground.globalAlpha = ropacity;
                    item.draw();
                    this.drawground.globalAlpha = 1;
                }
            });
        });
    }
}