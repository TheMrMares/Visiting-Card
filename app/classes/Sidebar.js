export class Sidebar {
    constructor(){
        this.anchors = [];
        document.querySelectorAll('.anchor').forEach((item, index) => {
            let rect = item.getBoundingClientRect();
            this.anchors.push({
                obj: item,
                w: item.scrollWidth,
                h: item.scrollHeight,
                y: rect.top,
                x: rect.left
            });
        });

    }
    inMove() {
        let scrollTop = scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log(scrollTop);
        this.anchors.forEach((item,index) => {
            if(scrollTop >= item.y){
                //item.obj.style.backgroundColor = 'red';
            }
        });
    }
}