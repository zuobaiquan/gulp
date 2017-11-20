
window.onload = function(){
	console.log("onload was done!")
}

var num = 0;
var xl = setInterval(function(){
	if(num<10){
		console.log(num);
	}
	num++;
	
},1000)
