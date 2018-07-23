import 'jquery';
import 'jquery-ui';

export class SmoothAppear {
    constructor(context, delay, borderStart, borderEnd){
        this.context = context;
        this.elem = [];
        let allElem = [
            ...context.querySelectorAll('p'),
            ...context.querySelectorAll('h1'),
            ...context.querySelectorAll('h2'),
            ...context.querySelectorAll('h3'),
            ...context.querySelectorAll('h4'),
            ...context.querySelectorAll('h5'),
            ...context.querySelectorAll('h6'),
            ...context.querySelectorAll('article')
        ];
        allElem.forEach((item, index) => {
            this.elem.push({
                obj: item,
                visible: false
            });
        })
        this.borderStart = borderStart;
        this.borderEnd = borderEnd;
        this.delay = delay;
    }
    check(){
        let duration = 300;
        this.elem.forEach((item, index) => {
            let rect = item.obj.getBoundingClientRect();
            if(rect.top >= 0 + this.borderStart && rect.bottom <= window.innerHeight - this.borderEnd){
                if(item.visible == false){
                    $(item.obj).delay(this.delay).animate({
                        opacity: 1
                    },duration);
                }
                item.visible = true;
            } else {
                if(item.visible == true){
                    $(item.obj).delay(this.delay).animate({
                        opacity: 0.1
                    },duration);
                }
                item.visible = false;
            }
        });
    }
}