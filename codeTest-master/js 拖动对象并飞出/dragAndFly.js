
var obj,x_instance,y_instance;//objW,objH,

function getXY(obj,e){//获取每次对拖动对象点击下去时的鼠标点与对象左边和上面的间距（作用是让鼠标摁下点即是拖拽点而不会突然拖赚点调到左上角）
	var mouse_x =  e.pageX;
	var mouse_y =  e.pageY;
	var obj_x = obj.offsetLeft;
	var obj_y = obj.offsetTop;
	x_instance = parseFloat(mouse_x-obj_x);
	y_instance = parseFloat(mouse_y-obj_y);
	//console.log(x_instance+','+y_instance)
}

function keepMove(obj,e){
	var nowX = e.pageX - x_instance;
	var nowY = e.pageY - y_instance;
	var moveX = lastFiveX[lastFiveX.length-1] - lastFiveX[0];
	var moveY = lastFiveY[lastFiveY.length-1] - lastFiveY[0];
	
	var TimeAll = 0;
	for(key in lastFiveTime){
		TimeAll = TimeAll +  lastFiveTime[key];
	}

	//var speed = Math.abs(Math.sqrt(Math.pow(moveX,2)+Math.pow(moveY,2))/TimeAll);
	var keep = setInterval(function(){
		if(TimeAll < 200){
			nowX = nowX + moveX/Math.abs(moveX);
			nowY = nowY + moveY/Math.abs(moveX);
			obj.style.left = nowX + 'px';
			obj.style.top = nowY + 'px';
			console.log(moveX+","+moveY+","+TimeAll);
		}else{
			clearInterval(keep);
		}
		TimeAll++;
	},TimeAll)
}

var recordgo;
var lastFiveX = new Array();
var lastFiveY = new Array();
var lastFiveTime = new Array();
function recordXY(e){
	var eachpxTime = 0;
	lastFiveX.push(e.pageX);//记录鼠标x轴坐标
	lastFiveY.push(e.pageY);//记录鼠标y轴坐标
	if(lastFiveX.length > 5)lastFiveX = lastFiveX.slice(-5,-1);
	if(lastFiveY.length > 5)lastFiveY = lastFiveY.slice(-5,-1);
	if(recordgo){
		clearInterval(recordgo);//按下拖动第二个像素开始，要先关闭上次的循环，否则会紊乱
	}
	recordgo = setInterval(function(){
		eachpxTime = eachpxTime+1;//eachpxTime的值*10就是移动一个像素使用的时间
		lastFiveTime.push(eachpxTime);
		if(lastFiveTime.length > 5)lastFiveTime = lastFiveTime.slice(-5,-1);
	},10)
	//console.log(lastFiveX.slice(-5,-1)+';'+lastFiveY.slice(-5,-1)+';'+lastFiveTime.slice(-5,-1));//slice(start,end)返回一个指定短数据的新数组，最后一个是-1
	//eachpxTime.push(e.pageX)
	//return record;
}

function setXY(obj,e){
	//obj.style.cssText = "position:absolute;"
	obj.style.left = e.pageX - x_instance +'px';
	obj.style.top = e.pageY - y_instance +'px';
	//console.log(e.pageX+','+e.pageY)
	
}

function makeobj(obj){
	obj = document.getElementById(obj);
//	objW = obj.offsetWidth;
//	objH = obj.offsetHeight;
	var mouse_state = 0;//用来表示鼠标默认未按下
	obj.onmousedown = function(e){
		obj.style.cursor = 'move';	
		getXY(obj,e);
		mouse_state = 1;
	}
	document.documentElement.onmousemove = function(e){//onmousemove指每移动一个像素就触发下述操作
		if(mouse_state == 1){
			setXY(obj,e);
			recordXY(e)
		};//若写在一行可以免去花括号
	}
	obj.onmouseup = function(e){
		clearInterval(recordgo);
		mouse_state = 0;
		obj.style.cursor = 'pointer';
		setXY(obj,e);
		keepMove(obj,e);
		//console.log(recordXY(e))
	}
}
