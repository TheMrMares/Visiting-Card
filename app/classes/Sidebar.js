export class Sidebar {
    constructor(){
        this.anchors = [];
        this.list = document.querySelectorAll('.sidebar__list')[0];
        this.pointer = document.querySelectorAll('.sidebar__pointer')[0];

        let myAnchors = document.querySelectorAll('.anchor');
        let body = document.querySelector('body');
        let webHeight = Math.max( body.scrollHeight, body.offsetHeight);

        myAnchors.forEach((item, index) => {
            let rect = item.getBoundingClientRect();
            let title = item.getAttribute('sb-title');

            let newItem = document.createElement('div');
            newItem.classList.add('sidebar__item');
            newItem.innerText = title;
            this.list.appendChild(newItem);

            let newPoint = document.createElement('div');
            newPoint.classList.add('sidebar__point');
            newPoint.innerText = title;
            this.pointer.appendChild(newPoint);

            this.anchors.push({
                obj: item,
                w: item.scrollWidth,
                h: item.scrollHeight,
                y: rect.top,
                x: rect.left,
                title: title,
                item: newItem,
                point: newPoint
            });
        });

    }
    inMove() {
        let scrollTop = document.querySelectorAll('.container')[0].scrollTop;
        this.anchors.forEach((item,index) => {
            console.log(scrollTop);
            if(scrollTop >= item.y && scrollTop < item.y + item.h){
                item.item.style.textDecoration = 'line-through';
            } else {
                item.item.style.textDecoration = 'none';
            }
        });
    }
}