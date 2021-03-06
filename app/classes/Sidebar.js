import 'jquery';
import 'jquery-ui';
import anime from 'animejs'

import {Anchor} from './Anchor';

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

            let newItem = document.createElement('button');
            newItem.classList.add('sidebar__item');
            newItem.innerText = title;
            newCupholder.appendChild(newItem);

            let newPoint = document.createElement('div');
            newPoint.classList.add('sidebar__point');
            newCupholder.appendChild(newPoint);

            let newInPoint = document.createElement('div');
            newInPoint.classList.add('sidebar__inpoint');
            newPoint.appendChild(newInPoint);

            this.anchors.push(new Anchor(item, item.scrollWidth, item.scrollHeight, rect.top, rect.left, title, newItem, newInPoint, false));
        });
        this.inMove();

    }
    refreshAnchors(){
        let myAnchors = document.querySelectorAll('.anchor');
        let compense = null;
        myAnchors.forEach((item, index) => {
            let anchor = this.anchors[index];
            let rect = anchor.obj.getBoundingClientRect();
            let compense = this.anchors[0].obj.getBoundingClientRect().top;
            anchor.y = rect.top - compense;
        });
    }
    inMove() {
        let scrollTop = document.querySelectorAll('.container')[0].scrollTop;
        let websiteHeight = document.querySelectorAll('.container')[0].scrollHeight - window.innerHeight;
        let perc = scrollTop/websiteHeight * 100;
        document.querySelectorAll('.sidebar__fluid')[0].style.height = `${perc}%`;
        document.querySelectorAll('.sidebar__fluid')[1].style.height = `${0.85*perc}%`;
        document.querySelectorAll('.sidebar__fluid')[2].style.height = `${0.6*perc}%`;
        document.querySelectorAll('.sidebar__fluid')[3].style.height = `${0.35*perc}%`;

        this.anchors.forEach((item,index) => {
            if(this.anchors[index+1]){
                if(scrollTop + window.innerHeight/2 >= item.y && scrollTop + window.innerHeight/2 < this.anchors[index+1].y){
                    this.toggleState(item, true)
                } else {
                    this.toggleState(item, false)
                }
            } else {
                if(scrollTop + window.innerHeight/2 >= item.y){
                    this.toggleState(item, true)
                } else {
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
                anime({
                    targets: item.item,
                    offset: 0,
                    borderColor: 'rgba(255,255,255,1)'
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
                        height: '20%'
                    },duration);
                });
                anime({
                    targets: item.item,
                    offset: 0,
                    borderColor: 'rgba(255,255,255,0)'
                });
            }
            item.state = false;
            break;
        }
    }
}