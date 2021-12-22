//Hello canvas
const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');

//Project settings
let 
    countDot = 300, //Math.round(document.documentElement.clientWidth * document.documentElement.clientHeight * 0.0002 ),
    countMother = 2,
    voiseRange = 20,
    fps = 300;

//Basic settings and refill canvas
function canvasRefillAndAdaptive(){      
    cnv.width = document.documentElement.clientWidth;
    cnv.height = document.documentElement.clientHeight;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cnv.width, cnv.height);
}
canvasRefillAndAdaptive();

//Draw function
let drawThis = function(){
    ctx.fillStyle = this.color;
    if(this.rotate <= Math.PI){
        this.y -= Math.sqrt(1 - (Math.cos(this.rotate) * Math.cos(this.rotate))) * this.speed
        this.x += Math.cos(this.rotate) * this.speed
    }else {
        this.y += Math.sqrt(1 - (Math.cos(this.rotate) * Math.cos(this.rotate))) * this.speed
        this.x += Math.cos(this.rotate) * this.speed
    } 
    this.top =  this.y,
    this.left = this.x,
    this.bottom = this.top + this.height,
    this.right = this.left + this.width;

    //Collision with border
    if (this.left < 0){
        this.x = cnv.width;
    } 
    if (this.right > cnv.width + this.width){
        this.x = 0;
    }
    if (this.top < 0){
        this.y = cnv.height;
    }
    if (this.bottom > cnv.height + this.height){
        this.y = 0;
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
}

//VoiseRadar function
function voiseRadar(obj1, obj2){
    if((obj1.bottom + voiseRange) >= obj2.top
    && (obj1.top    - voiseRange) <= obj2.bottom
    && (obj1.left   - voiseRange) <= obj2.right
    && (obj1.right  + voiseRange) >= obj2.left){
        return true
    }else {
        return false;
    }
}

//Collision function
function collision(obj1, obj2){
    if(obj1.bottom >= obj2.top
    && obj1.top    <= obj2.bottom
    && obj1.left   <= obj2.right
    && obj1.right  >= obj2.left){
        return true
    }else {
        return false;
    }
}