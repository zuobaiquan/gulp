var WebSocket  = require("ws")
var http = require('http');
//var fs = require('fs');
//var url = require('url');

//创建服务器
var server = http.createServer(function(request,response){
	response.writeHead(200,{'content-type': 'text/plain'})
	response.end("hello world\n");
	
}).listen(8888)

var websocketServer = WebSocket.Server;
var wss = new websocketServer({
	server: server
	
});

wss.on('connection',function(ws){
	console.log('客户端连接成功');
	ws.on('message',function(message){
		console.log("客户端发送："+message);
		wss.clients.forEach(function each(client) {
	      if (client !== ws && client.readyState === WebSocket.OPEN) {
	        client.send(message);
	      }
	    });
		//ws.send("服务器发送："+message);
	})
})
