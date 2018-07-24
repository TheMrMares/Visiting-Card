import 'jquery';
import 'jquery-ui';

export class Anchor {
    constructor(obj, w, h, y, x, title, item, inpoint, state){
        this.obj = obj;
        this.w = w;
        this.h =h;
        this.y = y;
        this.x = x;
        this.title = title;
        this.item = item;
        this.inpoint = inpoint;
        this.state = state;

        this.item.addEventListener('click',this.scrollTo.bind(this));
    }
    scrollTo() {
        let rect = this.obj.getBoundingClientRect();
        $('.container').animate({
            scrollTop: rect.top
        },500);
    }
}