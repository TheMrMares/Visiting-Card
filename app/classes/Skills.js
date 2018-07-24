export class Skills {
    constructor(){

        this.skillContainers = [];
        this.skillContainers[0] = {
            obj: document.querySelectorAll('.group > .group__skills')[0],
            skills: [
                {name: 'Javascript / ES6', power: 8}
            ]
        };
        this.skillContainers[1] = {
            obj: document.querySelectorAll('.group > .group__skills')[1],
            skills: [
                {name: 'CSS3', power: 7},
                {name: 'PHP', power: 6},
                {name: 'MySQL', power: 5},
                {name: 'HTML5', power: 7},
                {name: 'SCSS / SASS', power: 5},
                {name: 'Git', power: 5}
            ]
        };
        this.skillContainers[2] = {
            obj: document.querySelectorAll('.group > .group__skills')[2],
            skills: [
                {name: 'jQuery', power: 4},
                {name: 'Gulp', power: 3},
                {name: 'Webpack', power: 3},
                {name: 'C++', power: 2},
                {name: 'SFML v2.0', power: 1},
                {name: 'React', power: 4},
                {name: 'Styled-Components', power: 3},
                {name: 'Anime.js', power: 2}
            ]
        };

        this.pointer = 0;
        this.skillContainers.forEach((item,index)=>{
            item.skills.forEach((item,index)=>{
                if(item.power > this.pointer){
                    this.pointer = item.power;
                }
            });
        });

        this.fillSkills();
        this.setSkills();
    }
    fillSkills(){
        this.skillContainers.forEach((item,index)=>{
            let array = item.skills;
            let target = item.obj;
            array = array.sort((a, b) => {
                if(a.power < b.power){
                    return 1;
                } else if(a.power > b.power){
                    return -1;
                } else {
                    return 0;
                }
            });
            array.forEach((item,index) => {
                let elemAbility = document.createElement('div');
                elemAbility.classList.add('group__ability');
                target.appendChild(elemAbility);

                let elemTitle = document.createElement('h3');
                elemTitle.textContent = item.name;
                elemAbility.appendChild(elemTitle);

                let elemMarker = document.createElement('div');
                elemMarker.classList.add('group__marker');
                elemAbility.appendChild(elemMarker);
                item.marker = elemMarker;

                let elemDotA = document.createElement('div');
                elemDotA.classList.add('group__dot--left');
                elemMarker.appendChild(elemDotA);

                let elemDotB = document.createElement('div');
                elemDotB.classList.add('group__dot--right', 'group__dot--active');
                elemMarker.appendChild(elemDotB);

                let elemCounter = document.createElement('div');
                elemCounter.classList.add('group__counter');
                elemMarker.appendChild(elemCounter);
                elemCounter.textContent = '0';
            });
        });
    }
    setSkills(){
        this.skillContainers.forEach((item,index)=>{
            item.skills.forEach((item,index)=>{
                //item.marker.style.width = `${item.power/this.pointer*100}%`;
                item.marker.setAttribute('sb-power',item.power);
                item.marker.setAttribute('sb-expand',item.power/this.pointer*100);
            });
        });
    }
}