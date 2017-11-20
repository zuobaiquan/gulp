

var http = require("http");
var querystring = require('querystring');
var util = require('util');

http.createServer(function(request,response){
	
	//response.writeHead(200,{'Content-Type':'text/plain'});
	//response.end("link success\n");
	
	//实际需要区分Method方式，参见：http://blog.csdn.net/dai_jing/article/details/47294159
	var post = '';
	//console.log(request)
	request.on('data',function(chunk){
		post+=chunk;//chunk二进制数据
		console.log(Buffer.isBuffer(chunk));//true，获取到的是一个buffer类型数据
		console.log(post)//输出传过来的:msg=%E8%BF%99%E6%98%AF%E8%AF%B7%E6%B1%82%E4%BD%93%E5%86%85%E5%AE%B9%E4%BA%86%E4%BA%86%E4%BA%86%E4%BA%86%E4%BA%86%E4%BA%86%E4%BA%86%E4%BA%86
	})
	request.on('end',function(){
		post = querystring.parse(post);//把上诉那串ascii编码的转成对象格式
		console.log(post);
		// 设置响应头部信息及编码（也可以不指定响应类型和编码格式，会默认使用客户端请求时的content-type）
		response.writeHead(200, 
			{
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		);//内容会返回给客户端
		response.write(JSON.stringify(post));//内容会返回给客户端
		response.end("返回成功！");//内容会返回给客户端
	})
	
}).listen(8888);
console.log("link success!");