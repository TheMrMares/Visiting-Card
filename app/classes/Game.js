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
        this.ax = 0;
        this.ay = 0;
        this.lost = false;
        this.started = false;

        this.solution = 'stop';
        this.secret = '';

        this.createApple();
    }
    pushKey(evt){

        this.secret += (String.fromCharCode(evt.keyCode)).toLocaleLowerCase();
        if(this.secret[this.secret.length-1] != this.solution[this.secret.length-1]){
            this.secret = '';
        }
        if(this.secret.length == this.solution.length && this.secret == this.solution) {
            this.lost = true;   
        }

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
    createApple(){
        
        let modX = Math.floor(this.columns*0.3);
        let genX = this.columns - 2 * modX;
        Math.floor((Math.random*genX)+modX);

        let modY = Math.floor(this.rows*0.3);
        let genY = this.rows - 2 * modY;
        let rx = Math.floor((Math.random() * genX) + modX);
        let ry = Math.floor((Math.random() * genY) + modY);
        this.ax = rx;
        this.ay = ry;
    }
    calculate(){
        if(this.started == false && (this.px != this.startx || this.py != this.starty)){
            this.started = true;
        }
        this.tail.push({x:this.px, y:this.py})
        if(this.tail.length > this.maxlen){
            this.tail.shift();
        }
        this.px += this.vx;
        this.py += this.vy;

        //apple eat
        if(this.px == this.ax && this.py == this.ay){
            this.maxlen++;
            this.createApple();
        }
        //map collision
        if(this.px < 0){
            this.px = this.columns;
        }
        if(this.px > this.columns){
            this.px = 0;
        }
        if(this.py < 0){
            this.py = this.rows;
        }
        if(this.py > this.rows){
            this.py = 0;
        }
        //body collision 
        for(let i=0;i<this.tail.length;i++){
            let item = this.tail[i];
            if(this.px == item.x && this.py == item.y && this.started == true){
                this.tail = [];
                this.maxlen = 5;
                this.px = this.startx;
                this.py = this.starty;
                return false;
            }
        }
        return true;
    }
    loop(){
        if(this.lost == true){
            return false;
        }
        this.frame ++;
        if(this.frame > 60){
            this.frame = 1;
        }
        if(this.frame % 7 == 0){
            if(!this.calculate()){
                this.lost = true;
            }
        }
        
        this.drawground.shadowBlur = 20;
        this.drawground.shadowColor = 'white';
        this.drawground.globalAlpha = 1;
        this.drawground.fillStyle = 'white';
        this.drawground.fillRect(this.px*this.tw,this.py*this.th,this.tw,this.th);

        this.tail.forEach((item, index) => {
            this.drawground.fillRect(item.x*this.tw, item.y*this.th,this.tw,this.th);
        });
        this.drawground.shadowColor = '#33d61a';
        this.drawground.fillStyle = '#33d61a';
        this.drawground.fillRect(this.ax*this.tw, this.ay*this.th, this.tw, this.th);
    }
}