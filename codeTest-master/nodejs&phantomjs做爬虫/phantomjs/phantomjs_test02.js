var page = require('webpage').create();//phantom模块
var fs = require('fs');//node 文件系统模块
//var path = require('path');//node 路径模块

phantom.outputEncoding="gb2312";//不加终端输出会乱码

//捕获浏览器控制台输出
page.onConsoleMessage = function(msg){
	console.log('浏览器控制台输出：'+msg);
}

//打开页面并在浏览器控制台输出
page.open("http://www.jianshu.com",function(){
	page.evaluate(function(){//对于页面的分析都要放在evaluate()函数中
		console.log(document.title)
	})
	phantom.exit();
})
