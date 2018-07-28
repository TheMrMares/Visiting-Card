import anime from 'animejs'

export class Loader {
    constructor(duration){
        this.duration = duration;
        this.loader = document.querySelectorAll('.loader')[0];
        this.holder = document.querySelectorAll('.loader__holder')[0];
        this.spin = document.querySelectorAll('.loader__spin')[0];
        this.greetings = document.querySelectorAll('.loader__greetings')[0];
        this.content = document.querySelectorAll('.container')[0];
        this.isHiding = false;
    }
    show(callback){
        let duration = this.duration;

        let tl = anime.timeline();
        tl.add({
            targets: this.spin,
            opacity: 1,
            duration: 600,
            offset: duration*1,
            easing: 'easeInOutQuart'
        }).add({
            targets: this.spin,
            rotate: 405,
            duration: 600,
            offset: duration*2,
            easing: 'easeInOutQuart'
        }).add({
            targets: this.greetings,
            opacity: 1,
            duration: 600,
            offset: duration*3,
            easing: 'easeInOutQuart',
            complete: () => {
                this.greetings.style.animation = 'flashfairtext linear 1s infinite';
            }
        });
    }
    hide(callback){
        this.isHiding = true;
        let duration = this.duration;
        let tl = anime.timeline();
        tl.add({
            targets: this.loader,
            top: '-100%',
            duration: 1000,
            easing: 'easeInOutQuart',
            offset: 0,
            complete: () => {
                this.loader.style.display = 'none';
                this.isHiding = false;
                callback();
            }
        });
    }
}