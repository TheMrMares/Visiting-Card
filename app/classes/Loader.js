export class Loader {
    constructor(duration){
        this.duration = duration;
        this.loader = document.querySelectorAll('.loader')[0];
        this.content = document.querySelectorAll('.container')[0];
    }
    hide(callback){
        let duration = 700;
        $(this.loader).delay(this.duration).animate({
            top: '-100%'
        },duration, () => {
            this.loader.style.display = 'none';
            callback();
        });
    }
}