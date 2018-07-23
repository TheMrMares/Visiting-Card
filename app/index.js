// Load application styles
import 'styles/index.scss';
import 'sounds/hiphop1.mp3';

// Your app
import 'jquery';
import 'jquery-ui';

import {Sidebar} from './classes/Sidebar';
import {Loader} from './classes/Loader';
import {SmoothAppear} from './classes/SmoothAppear';
import {Canvas} from './classes/Canvas';

document.addEventListener('DOMContentLoaded', () => {

    let abckg = document.querySelectorAll('.audioBackground')[0];
    abckg.volume = 0.15;
    let sb = new Sidebar();
    let ld = new Loader(0);
    let sp = new SmoothAppear(document.querySelectorAll('.container')[0], 0, 50,50);
    ld.hide(()=> {
        sp.check();
    });
    let cv = new Canvas(document.querySelectorAll('.canvas')[0], 1000/60, 50, 50);

    //Event
    document.querySelectorAll('.school__dot, .cert__dot').forEach((item, index) => {
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
    });
    document.addEventListener('click',() => {
        cv.addRipple(0,70);
        let xd = document.querySelector('#ed');
        let rect = xd.getBoundingClientRect();
        console.log(`JS ${xd.offsetTop}`);
    });
    document.querySelectorAll('.container')[0].addEventListener('scroll', ()=> {
        sb.inMove();
        sp.check();
    })

});
