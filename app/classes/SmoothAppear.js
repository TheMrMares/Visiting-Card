import 'jquery';
import 'jquery-ui';
import anime from 'animejs';

export class SmoothAppear {
    constructor(context, delay, borderStart, borderEnd){
        this.context = context;
        this.appearElem = [];
        let allElem = [
            ...context.querySelectorAll('p'),
            ...context.querySelectorAll('h1'),
            ...context.querySelectorAll('h2'),
            ...context.querySelectorAll('h3'),
            ...context.querySelectorAll('h4'),
            ...context.querySelectorAll('h5'),
            ...context.querySelectorAll('h6'),
            ...context.querySelectorAll('img'),
            ...context.querySelectorAll('.group__marker')
        ];
        allElem.forEach((item, index) => {
            this.appearElem.push({
                obj: item,
                visible: false
            });
        })
        this.growElem = [];
        document.querySelectorAll('.grownumber').forEach((item, index) => {
            this.growElem.push({
                obj: item,
                visible: false
            });
        });
        console.log(this.growElem);
        this.borderStart = borderStart;
        this.borderEnd = borderEnd;
        this.delay = delay;
    }
    inViewport(item){
        let rect = item.getBoundingClientRect();
        if(rect.top >= 0 + this.borderStart && rect.bottom <= window.innerHeight - this.borderEnd){
            return true;
        } else {
            return false;
        }
    }
    check(){
        let duration = 300;
        this.appearElem.forEach((item, index) => {
            if(this.inViewport(item.obj)){
                if(item.visible == false){
                    $(item.obj).delay(this.delay).animate({
                        opacity: 1
                    },duration);
                    item.visible = true;
                }
            } else {
                if(item.visible == true){
                    $(item.obj).delay(this.delay).animate({
                        opacity: 0.1
                    },duration);
                    item.visible = false;
                }
            }
        });
        this.growElem.forEach((item, index) => {
            console.log('xd');
            if(this.inViewport(item.obj)){
                console.log(item.obj);
                if(item.visible == false){
                    anime({
                        targets: item.obj,
                        textContent: `${item.obj.getAttribute('sb-grow')}%`,
                        round: 1,
                        easing: 'easeInOutExpo'
                    });
                    item.visible = true;
                }
            } else {
                if(item.visible == true){
                    anime({
                        targets: item.obj,
                        textContent: `${0}%`,
                        round: 1,
                        easing: 'easeInOutExpo'
                    });
                    item.visible = false;
                }
            }
        });
    }
}