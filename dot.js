//Make dot
function generateRandomDot(){
    const x      = cnv.width * Math.random();
    const y      = cnv.height * Math.random();
    const width  = 5;
    const height = 5;

    const top    = y;
    const left   = x;
    const bottom = y + width;
    const right  = x + height;

    const speed  = Math.ceil(Math.random() * 2 + 0.1) ;
    const color  = '#fff';

    const target = mothers[0];
    const motherID = 0;
    const targetAchieved = 0;
    const step   = 0;

    const targetVectorX = target.x - x + (target.height / 2);
    const targetVectorY = target.y - y + (target.width / 2);

    let rotate = 0;

    if(targetVectorY < 0){
        rotate = Math.atan(targetVectorX / targetVectorY) - 3*Math.PI/2 + 2*Math.PI;
    }else if(targetVectorY >= 0){
        rotate = Math.atan(targetVectorX / targetVectorY) + 3*Math.PI/2;
    }

    if(rotate >= 2*Math.PI){
        rotate -= 2*Math.PI
    }
    
    const distanceToMothers = [];

    for(let i = 0; i <= mothers.length - 1; i++){
        distanceToMothers[i] = 0;
    }
    let dot = {
        width,
        height,
        x,
        y,

        top,
        left,
        bottom,
        right,

        speed, 
        rotate,
        color,

        target,
        motherID,
        targetAchieved,
        step,
        distanceToMothers,
    }

    

    dot.draw = drawThis;

    return dot
}

//Make dots array
let dots = [];

for(let i = 0; i <= countDot - 1;i++){
    dots[i] = generateRandomDot();
}