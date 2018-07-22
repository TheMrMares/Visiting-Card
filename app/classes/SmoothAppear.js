export class SmoothAppear {
    constructor(context, delay, borderStart, borderEnd){
        this.context = context;
        this.elem = [];
        context.querySelectorAll('p').forEach((item, index) => {
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
            if(rect.top >= 0 + this.borderStart && rect.top + item.obj.offsetHeight <= window.innerHeight - this.borderEnd){
                if(item.visible == false){
                    $(item.obj).delay(this.delay).animate({
                        opacity: 1
                    },duration);
                }
                item.visible = true;
            } else {
                if(item.visible == true){
                    $(item.obj).delay(this.delay).animate({
                        opacity: 0
                    },duration);
                }
                item.visible = false;
            }
        });
    }
}