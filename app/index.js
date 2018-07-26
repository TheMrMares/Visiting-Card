// Load application styles
import 'styles/index.scss';
import 'images/slog1mincom.png';
import 'images/slog2mincom.png';
import 'images/favicon1mincom.png';
import 'sounds/hiphop1.mp3';
import 'fonts/Oswald-Regular.ttf';

// Your app
import 'jquery';
import 'jquery-ui';

import {Sidebar} from './classes/Sidebar';
import {Loader} from './classes/Loader';
import {SmoothAppear} from './classes/SmoothAppear';
import {Canvas} from './classes/Canvas';
import {Skills} from './classes/Skills';



document.addEventListener('DOMContentLoaded', () => {
    let audio = document.querySelector('.audioBackground');
    audio.volume = 0.10;
    
    let ld = new Loader(400);
    
    let cv = new Canvas(document.querySelectorAll('.canvas')[0], 1000/60, 50, 50);
    let sk = new Skills();

    let sb = new Sidebar();
    let sp = new SmoothAppear(document.querySelectorAll('.container')[0], 0, 50,50);
    ld.show();

    //Event
    window.addEventListener('resize',() => {
        console.log('xd');
        sb.refreshAnchors();
    });
    document.querySelectorAll('.school__dot, .cert__dot, .group__dot, .group__dot--left, .group__dot--right, .media__dot--left, .media__dot--right').forEach((item, index) => {
        item.addEventListener('mouseenter', ()=>{
            cv.addRipple(1,50);
        });
        item.addEventListener('mouseleave', ()=>{
            cv.addRipple(1,50);
        });
    });
    document.addEventListener('keydown', (evt) => {
        cv.pushKey(evt);
    });
    document.addEventListener('mousemove', (event) => {
        cv.refreshMouse(event);
        cv.addFade();
    });
    document.addEventListener('click',() => {
        cv.addRipple(0,70);
        audio.play();
        ld.hide(()=> {
            sp.check();
        });
    });
    document.querySelectorAll('.container')[0].addEventListener('scroll', ()=> {
        sb.inMove();
        sp.check();
    })

});
