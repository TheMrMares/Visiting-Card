export class Skills {
    constructor(){
        this.skills = [];
        let elements = document.querySelectorAll('.group__ability');
        this.pointer = 0;
        elements.forEach((item, index) => {
            let sbpower = item.getAttribute('sb-power');
            if(sbpower > this.pointer){
                this.pointer = sbpower;
            }
            this.skills.push({
                obj: item,
                power: sbpower,
                marker: item.querySelector('.group__marker'),
                perc: undefined
            });
        });
        this.skills.forEach((item,index) => {
            item.perc = item.power/this.pointer*100;
        });
        this.setSkills();
    }
    setSkills(){
        this.skills.forEach((item,index) => {
            item.marker.style.width = `${item.perc}%`;
        });
    }
}