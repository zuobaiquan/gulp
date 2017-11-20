

//参见：http://www.runoob.com/nodejs/node-js-get-post.html
//http://blog.csdn.net/dai_jing/article/details/47294159

//运行这个实例请node运行http.js，开启服务器

var http = require("http");
var querystring = require('querystring');

var postData = querystring.stringify({
	'msg': "这是请求体内容了了了了了了了了"
})

options = {
	hostname: '127.0.0.1',
	port: 8888,
	path: '/',
	method: 'POST',
	headers: {
	    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',//提交内容的编码格式
		'content-Length': Buffer.byteLength(postData)//字符串或buffer实际占用内存位数，详见http://nodejs.cn/api/buffer.html
	}
}
var reqHttp = http.request(options, function (res) {  
	console.log('状态码:'+res.statusCode);
	console.log('响应头:'+JSON.stringify(res.headers));
    res.on('data', function (chunk) {  
		 console.log('响应主体:'+chunk);
    });  
    res.on("end", function () {  
		console.dir("请求完成")
    });  
})
reqHttp.on("error", function (err) {  
	console.dir(err.message)
}); 
reqHttp.write(postData);//提交给服务器
reqHttp.end();