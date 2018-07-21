// Load application styles
import 'styles/index.scss';
import 'videos/gm.mp4';

// Your app
import {Sidebar} from './classes/Sidebar';

document.addEventListener('DOMContentLoaded', () => {

    let sb = new Sidebar();
    document.querySelectorAll('.container')[0].addEventListener('scroll', ()=> {
        sb.inMove();
    })

});
