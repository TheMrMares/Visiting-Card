// Load application styles
import 'styles/index.scss';
import 'videos/gm.mp4';

// Your app
import {Sidebar} from './classes/Sidebar';
import {Loader} from './classes/Loader';
import {SmoothAppear} from './classes/SmoothAppear';

document.addEventListener('DOMContentLoaded', () => {

    let sb = new Sidebar();
    let ld = new Loader(1000);
    let sp = new SmoothAppear(document.querySelectorAll('.container')[0], 0, 50,50);
    ld.hide(()=> {
        sp.check();
    });
    

    //Event
    document.querySelectorAll('.container')[0].addEventListener('scroll', ()=> {
        sb.inMove();
        sp.check();
    })

});
