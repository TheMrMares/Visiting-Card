import anime from 'animejs';

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
        this.event = this.item.addEventListener('click',this.scrollTo.bind(this));
    }
    scrollTo() {
        anime({
            targets: document.querySelectorAll('.container')[0],
            scrollTop: this.y,
            duration: 500,
            round: 1,
            easing: 'easeInOutQuart'
        });
    }
}