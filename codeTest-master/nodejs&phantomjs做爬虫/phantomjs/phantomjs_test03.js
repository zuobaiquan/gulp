var page = require('webpage').create();
var fs = require('fs');
var system = require('system');

phantom.outputEncoding="gb2312";//不加终端输出会乱码

page.open('http://www.jianshu.com/',function(){
	var el = page.evaluate(function(){
		var $img = document.getElementsByTagName('img'),srcArr = [];
		for(var i=0;i<$img.length;i++){
			srcArr.push($img[i].src);
		}
		return srcArr;
	})
	//for(var i=0;i<el.length;i++){
	getImg(el)
	//}
	phantom.exit();
})

function getImg(imgUrlArr){
	var imgStr = ''
	for(var i=0;i<imgUrlArr.length;i++){
		var $img = "<img src='"+imgUrlArr[i]+"'>";
		imgStr = imgStr+$img;
	}
	
	fs.write("down.html", imgStr, 'w');//只能一次写入，每次写入都会覆盖上次内容
	console.log("写入成功");
	
}