// Load application styles
import 'styles/index.scss';
import 'images/slog1mincom.png';
import 'images/slog2mincom.png';
import 'images/favicon1min.png';

// Your app
import 'jquery';
import 'jquery-ui';

import audioURL from 'sounds/hiphop1.mp3';
let audioState = false;

import {Sidebar} from './classes/Sidebar';
import {Loader} from './classes/Loader';
import {SmoothAppear} from './classes/SmoothAppear';
import {Canvas} from './classes/Canvas';
import {Skills} from './classes/Skills';



document.addEventListener('DOMContentLoaded', () => {

    let ld = new Loader(0);
    
    let cv = new Canvas(document.querySelectorAll('.canvas')[0], 1000/60, 50, 50);
    let sk = new Skills();

    let sb = new Sidebar();
    let sp = new SmoothAppear(document.querySelectorAll('.container')[0], 0, 50,50);
    ld.hide(()=> {
        sp.check();
    });

    //Event
    document.querySelectorAll('.school__dot, .cert__dot, .group__dot, .group__dot--left, .group__dot--right, .media__dot--left, .media__dot--right').forEach((item, index) => {
        item.addEventListener('mouseenter', ()=>{
            cv.addRipple(1,50);
        });
        item.addEventListener('mouseleave', ()=>{
            cv.addRipple(1,50);
        });
    });
    document.addEventListener('mousemove', (event) => {
        cv.refreshMouse(event);
        cv.addFade();
        goAudio();
    });
    document.addEventListener('click',() => {
        cv.addRipple(0,70);
    });
    document.querySelectorAll('.container')[0].addEventListener('scroll', ()=> {
        sb.inMove();
        sp.check();
    })

});

//Audio avoid browser block
function goAudio() {
    if(audioState == false){
        let audio = new Audio(audioURL);
        audio.volume = 0.15;
        audio.loop = true;
        audio.play();
        audioState = true;
    }
}
