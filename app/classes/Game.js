export class Game {
    constructor(drawground,px,py,tw,th,w,h, columns, rows){
        this.drawground = drawground;
        this.startx = px;
        this.starty = py;
        this.px = px;
        this.py = py;
        this.tw = tw;
        this.th = th;
        this.w = w;
        this.h = h;
        this.columns = columns;
        this.rows = rows;
        this.vx = 0;
        this.vy = 0;
        this.frame = 1;
        this.tail = [];
        this.maxlen = 5;
    }
    pushKey(evt){
        switch(evt.keyCode){
            //top
            case 38:
            case 87:
                if(this.vy != 1){
                    this.vy = -1; this.vx = 0;
                }
            break;
            //bottom
            case 40:
            case 83:
                if(this.vy != -1){
                    this.vy = 1; this.vx = 0;
                }
            break;
            //left
            case 37:
            case 65:
                if(this.vx != 1){
                    this.vy = 0; this.vx = -1;
                }
            break;
            //right
            case 39:
            case 68:
                if(this.vx != -1){
                    this.vy = 0; this.vx = 1;
                }
            break;
            default:
            break;
        }
    }
    calculate(){
        this.tail.push({x:this.px, y:this.py})
        if(this.tail.length > this.maxlen){
            this.tail.shift();
        }
        this.px += this.vx*this.tw;
        this.py += this.vy*this.th;
        
        //map collision
        if(this.px < 0){
            this.px = this.columns*this.tw;
        }
        if(this.px > this.w){
            this.px = 0;
        }
        if(this.py < 0){
            this.py = this.rows*this.th;
        }
        if(this.py > this.h){
            this.py = 0;
        }
        //body collision 
        this.tail.forEach((item, index) => {
            if(this.px == item.x && this.py == item.y){
                this.tail = [];
                this.maxlen = 5;
                this.px = this.startx;
                this.py = this.starty;
            }
        });
    }
    loop(){
        this.frame ++;
        if(this.frame > 60){
            this.frame = 1;
        }
        if(this.frame % 5 == 0){
            this.calculate();
        }
        

        this.drawground.shadowBlur = 0;
        this.drawground.globalAlpha = 1;
        this.drawground.fillStyle = 'green';
        this.drawground.fillRect(this.px,this.py,this.tw,this.th);

        this.tail.forEach((item, index) => {
            this.drawground.fillStyle = 'green';
            this.drawground.fillRect(item.x, item.y,this.tw,this.th);
        });
    }
}