
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
	document.documentElement.onmousemove = function(e){
		if(mouse_state == 1)setXY(obj,e);//写在一行可以免去花括号
	}
	obj.onmouseup = function(e){
		mouse_state = 0;
		obj.style.cursor = 'pointer';
		setXY(obj,e);
	}
}
