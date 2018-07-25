import anime from 'animejs';

import {Tile} from './Tile';
import {Game} from './Game';

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
        this.fades = [];
        this.tiles = [];

        this.solution = 'game';
        this.secret = '';
        this.game = null;
        this.gamestate = false;

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
    addFade(){
        this.fades.push({
            x: this.mx,
            y: this.my,
            opacity: 1.00
        });
    }
    addRipple(mode = 0,w = 70){
        this.ripples.push({
            x: this.mx,
            y: this.my,
            distance: 160,
            width: w,
            opacity: 1.00,
            v: 30,
            vmod: 1.00,
            mode: mode
        });
    }
    gameIn(){
        let snakeIn = document.querySelectorAll('.snake__in')[0];
        let snakeOut = document.querySelectorAll('.snake__out')[0];
        anime({
            targets: [snakeIn,document.querySelector('.container, .sidebar')],
            opacity: 0,
            duration: 1000,
            easing: 'easeInOutQuart',
            complete: () => {
                snakeIn.style.display = 'none';
                snakeOut.style.display = 'block';
                anime({
                    targets: snakeOut,
                    opacity: 1,
                    duration: 1000,
                    easing: 'easeInOutQuart',
                });
            }
        });
    }
    gameOut(){
        let snakeIn = document.querySelectorAll('.snake__in')[0];
        let snakeOut = document.querySelectorAll('.snake__out')[0];
        anime({
            targets: snakeOut,
            opacity: 0,
            duration: 1000,
            easing: 'easeInOutQuart',
            complete: () => {
                snakeOut.style.display = 'none';
                snakeIn.style.display = 'block';
                anime({
                    targets: [snakeIn,document.querySelector('.container, .sidebar')],
                    opacity: 1,
                    duration: 1000,
                    easing: 'easeInOutQuart',
                });
            }
        });
    }
    //game fxs
    pushKey(evt){
        switch(this.gamestate){
            case false:
                this.secret += (String.fromCharCode(evt.keyCode)).toLocaleLowerCase();
                if(this.secret[this.secret.length-1] != this.solution[this.secret.length-1]){
                    this.secret = '';
                }
                if(this.secret.length == this.solution.length && this.secret == this.solution) {
                    this.game = new Game(this.drawground, Math.floor(this.columns/2), Math.floor(this.rows/2), this.tw,this.th,this.w,this.h,this.columns,this.rows);
                    this.gamestate = true;
                    this.gameIn();
                    this.secret = '';
                }
            break;
            case true:
                this.game.pushKey(evt);
            break;
        }
        
    }
    loop(){
        //draw background
        this.drawground.fillStyle = '#000000';
        this.drawground.fillRect(0,0,this.w,this.h);
        //draw tiles
        this.tiles.forEach((item,index) => {
            item.draw('#000000', null, 1, 0);
        });
        //draw mouse grid tiles
        this.tiles.forEach((item,index) => {
            if((this.mx >= item.x1 && this.mx <= item.x2) || (this.my >= item.y1 && this.my <= item.y2)){
                item.draw('#010101', null, 1, 0);
            }
        });
        //draw crooss lines
        for(let i = 0; i< this.rows;i++){
            if(i % 1 == 0){
                this.drawground.fillStyle = 'rgba(2,2,2,1)';
                this.drawground.fillRect(0,0+i*this.th,this.w,1);
                this.drawground.fillRect(0,0+i*this.th+this.th-1,this.w,1);
            }
        }
        for(let i = 0; i< this.columns;i++){
            if(i % 1 == 0){
                this.drawground.fillStyle = 'rgba(2,2,2,1)';
                this.drawground.fillRect(0+i*this.tw,0,1,this.h);
                this.drawground.fillRect(0+i*this.tw+this.tw-1,0,1,this.h);
            }
        }
        //draw mouse tile
        this.tiles.forEach((item,index) => {
            if((this.mx >= item.x1 && this.mx <= item.x2) && (this.my >= item.y1 && this.my <= item.y2)){
                item.draw('#d6281b', '#d6281b', 1, 30);
            }
        });
        //draw ripples
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
            let rmode = item.mode;
            this.tiles.forEach((item, index) => {
                let xdis = Math.abs(rx - item.cx);
                let ydis = Math.abs(ry - item.cy);
                let rdis =  Math.sqrt(xdis*xdis + ydis*ydis);
                if(rdis < rdistance && rdis > rdistance - rwidth){
                    switch(rmode){
                        case 0:
                            item.draw('#d6281b', '#d6281b', ropacity, 20);
                        break;
                        case 1:
                            item.draw('#010101', null, ropacity, 0);
                        break;
                    }
                }
            });
        });
        //fades aftermouse..
        this.fades.forEach((item, index) => {
            item.opacity = (item.opacity-0.04).toFixed(2);
            if(item.opacity <= 0){
                this.fades.splice(this.fades.indexOf(item),1);
            }
            let fx = item.x;
            let fy = item.y;
            let fopacity = item.opacity;
            this.tiles.forEach((item, index) => {
                if((fx >= item.x1 && fx <= item.x2) && (fy >= item.y1 && fy <= item.y2)){
                    item.draw('#d6281b', '#d6281b', fopacity, 0);
                }
            });
        });
        //game
        if(this.gamestate == true){
            let callback = this.game.loop();
            if(callback == false){
                this.gamestate = false;
                delete this.game;
                this.gameOut();
            }
        }
    }
}