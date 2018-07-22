// Load application styles
import 'styles/index.scss';
import 'videos/gm.mp4';

// Your app
import {Sidebar} from './classes/Sidebar';
import {Loader} from './classes/Loader';
import {SmoothAppear} from './classes/SmoothAppear';
import {Canvas} from './classes/Canvas';

document.addEventListener('DOMContentLoaded', () => {

    let sb = new Sidebar();
    let ld = new Loader(1000);
    let sp = new SmoothAppear(document.querySelectorAll('.container')[0], 0, 50,50);
    ld.hide(()=> {
        sp.check();
    });
    let cv = new Canvas(document.querySelectorAll('.canvas')[0], 1000/60, 50, 50);
    

    //Event
    document.addEventListener('mousemove', (event) => {
        cv.refreshMouse(event);
        cv.addFade();
    });
    document.addEventListener('click',() => {
        cv.addRipple();
    });
    document.querySelectorAll('.container')[0].addEventListener('scroll', ()=> {
        sb.inMove();
        sp.check();
    })

});
