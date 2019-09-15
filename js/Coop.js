canv=document.getElementById("gc2");
ctx=canv.getContext("2d");
document.addEventListener("keydown",moveCoop);
px2=py2=10; //play2er position
gs2=tc2=30; //grid size, tile count
ax2=ay2=15; //apple starting position
xv2=yv2=0;
trail2=[];
tail2 = 5;
// bs=[0] //best score
started = false;
var collision= JSON.parse(window.sessionStorage.getItem("collision"))==null ? false : JSON.parse(window.sessionStorage.getItem("collision"));
var music=JSON.parse(window.sessionStorage.getItem("music"))==null ? true : JSON.parse(window.sessionStorage.getItem("music"));
var speed=JSON.parse(window.sessionStorage.getItem("difficulty"))==null ? 10: JSON.parse(window.sessionStorage.getItem("difficulty"));
var playCoop;
function gameCoop() {
px2+=xv2;
py2+=yv2;
if(collision==false){
if(px2<0) {
    px2= tc2-1;
}
if(px2>tc2-1) {
    px2= 0;
}
if(py2<0) {
    py2= tc2-1;
}
if(py2>tc2-1) {
    py2= 0;
}
}
ctx.fillStyle="black";
ctx.fillRect(0,0,canv.width,canv.height);
// ctx.fillStyle="black";
// ctx.fillRect(0,0,canv.width-100,canv.height-100);
ctx.fillStyle="cyan";
for(var i=0;i<trail2.length;i++) {
    document.getElementById("scores2").innerHTML= tail2-5
    ctx.fillRect(trail2[i].x*gs2,trail2[i].y*gs2,gs2-2,gs2-2);
    if(yv2 != 0 || xv2 != 0){
        if(collision==false){
    if(trail2[i].x==px2 && trail2[i].y==py2) {
        // window.sessionStorage.setItem('bestScore', JSON.stringify(Math.max2.apply(null,bs)));
        // console.log(JSON.parse(sessionStorage.getItem("bestScore")))
        px2 = py2 = 15;
        yv2 = xv2 = 0;
        tail2 = 5;
    }
}else{
    if(trail2[i].x==px2 && trail2[i].y==py2 || px2<0 || px2 > tc2-1 || py2 <0 || py2 > tc2-1) {
        // window.sessionStorage.setItem('bestScore', JSON.stringify(Math.max2.apply(null,bs)));
        // console.log(JSON.parse(sessionStorage.getItem("bestScore")))
        px2 = py2 = 15;
        yv2 = xv2 = 0;
        tail2 = 5;
    }
}

}
}
trail2.push({x:px2,y:py2});
while(trail2.length>tail2) {
trail2.shift();
}
if(ax2==px2 && ay2==py2) {
    tail2++;
    ax2=Math.floor(Math.random()*tc2);
    ay2=Math.floor(Math.random()*tc2);
}
ctx.fillStyle="red";
ctx.fillRect(ax2*gs2,ay2*gs2,gs2-2,gs2-2);
}
function endCoop(){
ctx.fillStyle="white";
ctx.fillRect(0,0,canv.width,canv.height);
}
function pauseCoop(){
    ctx.fillStyle="grey";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    img = document.getElementById("imh")
    ctx.drawImage(img,270,180,400,400)
    // debugger;
    canv.addEventListener('click', function(evt) {
        var mousePos = getMousePosition(canv, evt);
    // debugger;
    if (isIn(mousePos,unpauseBut)) {
        play;
        playCoop;
        
    }else{
        //code to be done later
    }	
    }, false);
    
    }

function moveCoop(ear) {
switch(ear.keyCode) {
    case 81:
    if(xv2==1){
        return
    } else xv2=-1;yv2=0;
        
        break;
    case 90:
    if(yv2==1){
        return
    }else xv2=0;yv2=-1;
        break;
    case 68:
    if(xv2==-1){
        return
    }else xv2=1;yv2=0;
        break;
    case 83:
    if(yv2==-1){
        return
    }else xv2=0;yv2=1;
        break;
    case 27:
    clearInterval(playCoop)
    playCoop=null
    document.getElementById("sc").style.display="none"
    pause()

}
}
function getMousePosition(canv, event) {
    var rect = canv.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
    }
    function isIn(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
    }


