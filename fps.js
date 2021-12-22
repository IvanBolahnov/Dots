//FPS (simulation time)
setInterval(function(){

//Basic settings and refill canvas
canvasRefillAndAdaptive()

//Spawning mothers
for(let i = 0; i <= mothers.length - 1; i++){
    mothers[i].draw();
};

//Spawning dots
for(let i = 0; i <= dots.length - 1; i++){
    dots[i].rotate += ((Math.random() - 0.5) / 400) * Math.PI
    dots[i].draw();
    for(let j = 0; j <= mothers.length - 1; j++){
        dots[i].distanceToMothers[j]=+ dots[i].speed;
    }
};

//Voise dot
for(let i = 0; i <= dots.length - 1; i++){
    for(let j = 1 + i; j <= dots.length - 1; j++){
        if(voiseRadar(dots[i], dots[j])){
            for(let z = 0; z < mothers.length; z++){
                if(dots[i].distanceToMothers[z] < (dots[j].distanceToMothers[z] + voiseRange)){
                    dots[i].distanceToMothers[z] = (dots[j].distanceToMothers[z] + voiseRange);
                    
                    if(dots[i].motherID != dots[j].motherID){   
                        dots[i].rotate = dots[j].rotate;
                    }
                }
            }
        }
    }
    
}

//Checking dots
for(let i = 0; i <= dots.length - 1; i++){ 
    if(collision(dots[i], dots[i].target)){
        if(dots[i].rotate <= Math.PI){
            dots[i].rotate = dots[i].rotate + Math.PI;
        }
        else {
            dots[i].rotate = dots[i].rotate - Math.PI;
        };
        dots[i].distanceToMothers[dots[i].motherID] = 0;
        dots[i].targetAchieved++;
        dots[i].motherID = dots[i].targetAchieved % mothers.length;
        dots[i].target = mothers[dots[i].motherID];
    }
}



}, 1000/fps)