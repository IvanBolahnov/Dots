//Make mother
let mother = {};

function generateRandomMother(){

    const width  = 50;
    const height = 50;
    const x      = (cnv.width - (2 * width)) * Math.random() + width;
    const y      = (cnv.height - (2 * height)) * Math.random() + height;
    
    const top    = this.y;
    const left   = this.x;
    const bottom = this.top + this.height;
    const right  = this.left + this.width;
    
    const color  = '#f00';
    const speed  = 0; //Math.ceil(Math.random() * 2.9 + 0.1);
    const rotate = Math.random() * 2 * Math.PI;



    
    let mother = {
        x,
        y,
        width,
        height,
                
        top,
        left,
        bottom,
        right,        
                
        color,
        speed,
        rotate,
        
    };
    mother.draw = drawThis;

    return mother
}

//Make mothers array
let mothers = [];

for(let i = 0; i <= countMother - 1;i++){
    mothers[i] = generateRandomMother();
}

