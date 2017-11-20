//参考文章：
//https://segmentfault.com/a/1190000000385867
//http://blog.csdn.net/dreamer2020/article/details/52074516
//https://github.com/request/request

var rq = require('request');

rq('http://www.baidu.com',function(error,response,body){
	
	if(!error&&response.statusCode===200){
		console.log(body);//输出百度首页源码
	}
	
})
