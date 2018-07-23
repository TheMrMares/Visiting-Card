export class Loader {
    constructor(duration){
        this.duration = duration;
        this.loader = document.querySelectorAll('.loader')[0];
        this.spin = document.querySelectorAll('.loader__spin')[0];
        this.greetings = document.querySelectorAll('.loader__greetings')[0];
        this.content = document.querySelectorAll('.container')[0];
    }
    hide(callback){
        let duration = this.duration;

        let tl = anime.timeline();
        tl.add({
            targets: this.spin,
            marginTop: 0,
            easing: 'easeOutExpo',
            offset: 0*duration
        }).add({
            targets: this.spin,
            rotate: 225,
            easing: 'easeOutExpo',
            offset: 1*duration
        }).add({
            targets: this.spin,
            backgroundColor: '#d6281b',
            easing: 'easeOutExpo',
            offset: 2*duration
        }).add({
            targets: this.greetings,
            opacity: 1,
            easing: 'easeOutExpo',
            offset: 3*duration
        }).add({
            targets: this.loader,
            top: '-100%',
            duration: 1000,
            easing: [.91,-0.54,.29,1.56],
            offset: 4*duration,
            complete: () => {
                this.loader.style.display = 'none';
                callback();
            }
        });
    }
}