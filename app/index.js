// Load application styles
import 'styles/index.scss';
import 'videos/gm.mp4';

// Your app
import {Sidebar} from './classes/Sidebar';

document.addEventListener('DOMContentLoaded', () => {
    let sb = new Sidebar();
    sb.anchors.forEach((item, index)=>{
        console.log(item.y);
    })
    document.addEventListener('scroll', ()=> {
        sb.inMove();
    })
});
