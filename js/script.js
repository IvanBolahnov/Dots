let settings = {

    fps: 20,

    directionSpray : Math.PI / 20,

    // Dots
    dotVoiseLineColor : "#44D",
    dotsCount: 400,
    dotsRadius : 2,
    dotsColor : '#fff',
    dotsVoiseRange : 70,
    
    // Mothers
    mothersCount: 2,
    mothersRadius : 40,
    mothersColor : '#fff',
};

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

function clearCanvas() {
    cnv.width = document.documentElement.clientWidth;
    cnv.height = document.documentElement.clientHeight;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
};

function draw(unit) {
    ctx.fillStyle = unit.color
    ctx.beginPath();
    ctx.arc(unit.x, unit.y, unit.radius, 0, Math.PI * 2);
    ctx.fill();
}

function move(unit) {
    unit.rotate += Math.random() * settings.directionSpray - settings.directionSpray / 2;
    unit.x += Math.cos(unit.rotate) * unit.speed;
    unit.y += Math.sin(unit.rotate) * unit.speed * -1;
}

function counterUp (dot) {
    for (let i = 0; i < dot.counter.length; i++) {
        dot.counter[i] ++;
    }
}

function turn (main, target) {
    const dx = target.x - main.x;
    const dy = main.y - target.y;
    const d = distance(main, target);
    const ac = Math.acos(dx/d);
    if (dy > 0) {
        main.rotate = ac;
    } else {
        main.rotate = (-1 * ac);
    }
}

clearCanvas();

class Dot {
    constructor(x, y, rotate, speed) {
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.speed = speed;
        
        this.radius = settings.dotsRadius;
        this.color = settings.dotsColor;
        this.counter = [];
        this.targetID = 0
        this.target = MOTHERS[this.targetID];
    };

    static changeTarget (dot) {
        if (dot.targetID == MOTHERS.length - 1) {
            dot.targetID = 0;
        } else {
            dot.targetID ++;
            
        }
        dot.target = MOTHERS[dot.targetID];
    }


    static voiseRadar (a, b) {
        if (distance(a, b) > settings.dotsVoiseRange){
            return false;
        } else {
            ctx.strokeStyle = settings.dotVoiseLineColor;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            return true
        }

    }
};

class Mother {
    constructor(x, y, rotate, speed) {
        this.x = x;
        this.y = y;
        this.rotate = rotate;
        this.speed = speed;

        this.radius = settings.mothersRadius;
        this.color = settings.mothersColor;
    };
};

const DOTS = [];
const MOTHERS = [];

function distance (a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
};

for (let i = 0; i < settings.mothersCount; i++) {
    MOTHERS[i] = new Mother(cnv.width * Math.random(), cnv.height * Math.random(), 2 * Math.PI * Math.random(), .8 * Math.random() + .2);    
}
    // MOTHERS[0] = new Mother(cnv.width / 4, cnv.height / 2, 2 * Math.PI * Math.random(), 0);    
    // MOTHERS[1] = new Mother(cnv.width / 4 * 3, cnv.height /2, 2 * Math.PI * Math.random(), 0);    



for (let i = 0; i < settings.dotsCount; i++) {
    DOTS[i] = new Dot(cnv.width * Math.random(), cnv.height * Math.random(), 2 * Math.PI * Math.random(), 9.8 * Math.random() + .2);
    for (let j = 0; j < MOTHERS.length; j++) {
        DOTS[i].counter[j] = 0;
    }    
}

let stop = false;

function frame () {
    clearCanvas()
    for (let i = 0; i < MOTHERS.length; i++) {
        if (MOTHERS[i].x < 0) {MOTHERS[i].x = cnv.width;}
        if (MOTHERS[i].y < 0) {MOTHERS[i].y = cnv.height;}
        if (MOTHERS[i].x > cnv.width) {MOTHERS[i].x = 0;}
        if (MOTHERS[i].y > cnv.height) {MOTHERS[i].y = 0;}
        move(MOTHERS[i]);
        draw(MOTHERS[i]);
    }
    for (let i = 0; i < DOTS.length; i++) {
        if (DOTS[i].x < 0) {DOTS[i].x = cnv.width;}
        if (DOTS[i].y < 0) {DOTS[i].y = cnv.height;}
        if (DOTS[i].x > cnv.width) {DOTS[i].x = 0;}
        if (DOTS[i].y > cnv.height) {DOTS[i].y = 0;}
        
        move(DOTS[i]);
        draw(DOTS[i]);
        counterUp(DOTS[i]);
        for (let j = 0; j < MOTHERS.length; j++){
            if(distance(DOTS[i], MOTHERS[j]) <= settings.dotsRadius + settings.mothersRadius) {
                DOTS[i].counter[j] = 0;
                
                if (DOTS[i].target == MOTHERS[j]) {
                    DOTS[i].rotate += Math.PI;
                    Dot.changeTarget(DOTS[i]);
                }
            }

        }
        
        for (let j = i; j < DOTS.length; j++) {
            if (Dot.voiseRadar(DOTS[i], DOTS[j])) {
                for (let l = 0; l < DOTS[i].counter.length; l++) {
                    if (DOTS[i].counter[l] + settings.dotsVoiseRange < DOTS[j].counter[l]) {
                        DOTS[j].counter[l] = DOTS[i].counter[l] + settings.dotsVoiseRange
                        if (DOTS[j].targetID == l) {
                            turn(DOTS[j], DOTS[i])
                        }
                    }
                    if (DOTS[j].counter[l] + settings.dotsVoiseRange < DOTS[i].counter[l]) {
                        DOTS[i].counter[l] = DOTS[j].counter[l] + settings.dotsVoiseRange
                        if (DOTS[i].targetID == l) {
                            turn(DOTS[i], DOTS[j])
                        }
                    }
                }
            }
        }
    }

    // if (settings.dotsVoiseRange > 38) {
    //     settings.dotsVoiseRange -= .1
    // }
}

let simulation = setInterval(() => {
    if (stop != true) {
        frame();
    }
}, 1000/settings.fps)

