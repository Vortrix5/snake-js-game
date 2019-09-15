canvas=document.getElementById("gc");
ctxs=canvas.getContext("2d");
document.addEventListener("keydown",move);
menu()



function menu(){
ctxs.fillStyle="grey";
ctxs.fillRect(0,0,canvas.width,canvas.height);
start()
options()


}
function pause(){
ctxs.fillStyle="grey";
ctxs.fillRect(0,0,canvas.width,canvas.height);
img = document.getElementById("imh")
ctxs.drawImage(img,270,180,400,400)
ctxs.fillStyle="red";
ctxs.fillRect(180,650,500,150);
ctxs.font = "70px Luckiest Guy";
ctxs.fillStyle="black";
ctxs.fillText("MAIN MENU",250,750)
// debugger;

canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
// debugger;
if (isInside(mousePos,unpauseBut)) {
	if(coop==false){
		play;

	}else{
		play;
		setInterval(gameCoop,1000/speed)
	}
	
}else{
	//code to be done later
}	
}, false);
canvas.addEventListener('click', function(evt) {
var mousePos = getMousePos(canvas, evt);
// debugger;
if (isInside(mousePos,backBut)) {
	document.getElementById("coop").style.display="block"
	document.getElementById("scs1").style.display="none"
	document.getElementById("scs2").style.display="none"
	endCoop()
	menu()
	px2 = py2 = 15;
	yv2 = xv2 = 0;
	tail2 = 5;
	px = py = 15;
	yv = xv = 0;
	tail = 5;
}else{
	//code to be done later
}	
}, false);

}

function start(){
ctxs.fillStyle="red";
ctxs.fillRect(170,220,500,150);
ctxs.font = "80px Luckiest Guy";
ctxs.fillStyle="black";
ctxs.fillText("Start",320,330)
canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
// debugger;
if (isInside(mousePos,startBut)) {
	if(!play){
		document.getElementById("coop").style.display="none"
		document.getElementById("sc").style.display="block"
		coop=false
		play = setInterval(game,1000/speed);
	}else {
		clearInterval(play)
		play = setInterval(game,1000/speed);			
	}

}else{
	//code to be done later
}	
}, false);
}
function options(){
ctxs.fillStyle="red";
ctxs.fillRect(170,450,500,150);
ctxs.font = "80px Luckiest Guy";
ctxs.fillStyle="black";
ctxs.fillText("Options",270,560)
canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
// debugger;
if (isInside(mousePos,optionsBut)) {
	document.getElementById("coop").style.display="none"
	optionsMenu()
}else{
	//code to be done later
}	
}, false);
}
function optionsMenu(){
ctxs.fillStyle="grey";
ctxs.fillRect(0,0,canvas.width,canvas.height);
document.getElementById("diff").style.display="block"
}
var startBut = {
x:170,
y:280,
width:500,
heigth:150
};
var optionsBut = {
x:170,
y:500,
width:500,
heigth:150
};
var unpauseBut = {
x:270,
y:180,
width:400,
heigth:400
};
var backBut= {
x:180,
y:650,
width:500,
heigth:150
};
px=py=10; //player position
gs=tc=30; //grid size, tile count
ax=ay=15; //apple starting position
xv=yv=0;
trail=[];
tail = 5;
bs=[0] //best score
started = false;
scToReach=10 //score to reach
coop=false
var collision= JSON.parse(window.sessionStorage.getItem("collision"))==null ? false : JSON.parse(window.sessionStorage.getItem("collision"));
var music=JSON.parse(window.sessionStorage.getItem("music"))==null ? true : JSON.parse(window.sessionStorage.getItem("music"));
var speed=JSON.parse(window.sessionStorage.getItem("difficulty"))==null ? 10: JSON.parse(window.sessionStorage.getItem("difficulty"));
var play;
var playCoop;
function game() {
document.getElementById("bscore").innerHTML= JSON.parse(sessionStorage.getItem("bestScore"))
bs.push(JSON.parse(sessionStorage.getItem("bestScore")))
px+=xv;
py+=yv;
if(collision==false){
if(px<0) {
	px= tc-1;
}
if(px>tc-1) {
	px= 0;
}
if(py<0) {
	py= tc-1;
}
if(py>tc-1) {
	py= 0;
}
}
ctxs.fillStyle="black";
ctxs.fillRect(0,0,canvas.width,canvas.height);
// ctxs.fillStyle="black";
// ctxs.fillRect(0,0,canvas.width-100,canvas.height-100);
ctxs.fillStyle="lime";
for(var i=0;i<trail.length;i++) {
	if(coop==false){
	document.getElementById("score").innerHTML= tail-5
	bs.push(document.getElementById("score").innerHTML)
	}else {
		document.getElementById("scores1").innerHTML= tail-5
	}
	ctxs.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
	if(yv != 0 || xv != 0){
		if(collision==false){
	if(trail[i].x==px && trail[i].y==py) {
		window.sessionStorage.setItem('bestScore', JSON.stringify(Math.max.apply(null,bs)));
		console.log(JSON.parse(sessionStorage.getItem("bestScore")))
		px = py = 15;
		yv = xv = 0;
		tail = 5;
	}
}else{
	if(trail[i].x==px && trail[i].y==py || px<0 || px > tc-1 || py <0 || py > tc-1) {
		window.sessionStorage.setItem('bestScore', JSON.stringify(Math.max.apply(null,bs)));
		console.log(JSON.parse(sessionStorage.getItem("bestScore")))
		px = py = 15;
		yv = xv = 0;
		tail = 5;
	}
}

}
}
trail.push({x:px,y:py});
while(trail.length>tail) {
trail.shift();
}
if(ax==px && ay==py) {
	tail++;
	ax=Math.floor(Math.random()*tc);
	ay=Math.floor(Math.random()*tc);
}
ctxs.fillStyle="red";
ctxs.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}

function move(ear) {
switch(ear.keyCode) {
	case 37:
	if(xv==1){
		return
	} else xv=-1;yv=0;
		
		break;
	case 38:
	if(yv==1){
		return
	}else xv=0;yv=-1;
		break;
	case 39:
	if(xv==-1){
		return
	}else xv=1;yv=0;
		break;
	case 40:
	if(yv==-1){
		return
	}else xv=0;yv=1;
		break;
	case 27:
	clearInterval(play)
	play=null
	document.getElementById("sc").style.display="none"
	document.getElementById("scs1").style.display="none"
	document.getElementById("scs2").style.display="none"
	document.getElementById("coop").style.display="none"
	pause()
	

}
}
function getMousePos(canvas, event) {
var rect = canvas.getBoundingClientRect();
return {
	x: event.clientX - rect.left,
	y: event.clientY - rect.top
};
}
function isInside(pos, rect){
return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.heigth && pos.y > rect.y
}
$("#collision").change(()=>{
console.log(document.getElementById("collision").value)
if(document.getElementById("collision").value=="on"){
	collision = window.sessionStorage.setItem("collision",JSON.stringify(true));
	
}else {collision = window.sessionStorage.setItem("collision",JSON.stringify(false));
}

console.log(collision)
}
)
$("#music").change(()=>{
console.log(document.getElementById("music").value)
if(document.getElementById("music").value=="on"){
	music= window.sessionStorage.setItem("music",JSON.stringify(true))
	
}else {music =  window.sessionStorage.setItem("music",JSON.stringify(false))}

console.log(music)
}
)
$("#difficulty").change(()=>{
console.log(document.getElementById("difficulty").value)
console.log(document.getElementById("difficulty").value=="Hard")
if(document.getElementById("difficulty").value=="Easy"){
	clearInterval(play)
	speed = window.sessionStorage.setItem("difficulty",JSON.stringify(10));
	location.reload(false)
}else if(document.getElementById("difficulty").value=="Hard"){
	clearInterval(play)
	speed = window.sessionStorage.setItem("difficulty",JSON.stringify(20));
	location.reload(false)
	
}else if(document.getElementById("difficulty").value=="Normal"){
	clearInterval(play)
	speed = window.sessionStorage.setItem("difficulty",JSON.stringify(15));
	location.reload(false)
}
console.log(speed)
}
)
$("#back").click(()=>{
document.getElementById("diff").style.display="none"
document.getElementById("coop").style.display="block"
menu()
})
$("#coop").click(()=>{
	if(!play){
		play = setInterval(game,1000/speed);
		playCoop = setInterval(gameCoop,1000/speed);	
	}
	coop=true
	document.getElementById("scs1").style.display="block";
	document.getElementById("scs2").style.display="block";
	document.getElementById("coop").style.display="none"
})