export class Sidebar {
    constructor(){
        this.anchors = [];
        this.container = document.querySelectorAll('.sidebar__container')[0];

        let myAnchors = document.querySelectorAll('.anchor');
        let body = document.querySelector('body');
        let webHeight = Math.max( body.scrollHeight, body.offsetHeight);

        myAnchors.forEach((item, index) => {
            let rect = item.getBoundingClientRect();
            let title = item.getAttribute('sb-title');

            let newCupholder = document.createElement('div');
            newCupholder.classList.add('sidebar__cupholder');
            this.container.appendChild(newCupholder);

            let newItem = document.createElement('div');
            newItem.classList.add('sidebar__item');
            newItem.innerText = title;
            newCupholder.appendChild(newItem);

            let newPoint = document.createElement('div');
            newPoint.classList.add('sidebar__point');
            newCupholder.appendChild(newPoint);

            let newInPoint = document.createElement('div');
            newInPoint.classList.add('sidebar__inpoint');
            newPoint.appendChild(newInPoint);

            this.anchors.push({
                obj: item,
                w: item.scrollWidth,
                h: item.scrollHeight,
                y: rect.top,
                x: rect.left,
                title: title,
                item: newItem,
                inpoint: newInPoint,
                state: false
            });
        });
        this.inMove();

    }
    inMove() {
        let scrollTop = document.querySelectorAll('.container')[0].scrollTop;
        this.anchors.forEach((item,index) => {
            if(this.anchors[index+1]){
                if(scrollTop >= item.y && scrollTop < this.anchors[index+1].y){
                    item.item.style.textDecoration = 'line-through';
                    this.toggleState(item, true)
                } else {
                    item.item.style.textDecoration = 'none';
                    this.toggleState(item, false)
                }
            } else {
                if(scrollTop >= item.y){
                    item.item.style.textDecoration = 'line-through';
                    this.toggleState(item, true)
                } else {
                    item.item.style.textDecoration = 'none';
                    this.toggleState(item, false)
                }
            }
        });
    }
    toggleState(item, state){

        let duration = 150;
    
        switch(state){
            case true:
            //activate
            if(item.state == false){
                $(item.inpoint).animate({
                    width: '100%'
                },duration,() => {
                    $(item.inpoint).animate({
                        height: '100%'
                    },duration);
                });
            }
            item.state = true;
            break;
            case false:
            //deactive
            if(item.state == true){
                $(item.inpoint).animate({
                    width: '0%'
                },duration,() => {
                    $(item.inpoint).animate({
                        height: '50%'
                    },duration);
                });
            }
            item.state = false;
            break;
        }
    }
}