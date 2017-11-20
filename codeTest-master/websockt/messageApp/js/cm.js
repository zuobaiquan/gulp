
//消息调度盒子
var obj = {
	//_info = ''
}
Object.defineProperty(obj,'info',{
	get: function(){
		return this._info;
	},
	set: function(value){//value是包含发送者和信息体的对象
		//this._info = value;
		setMessage(value.info,value.sender);//添加信息到显示窗口
	}
})
//信息发送到窗口
function setMessage(val,sender){
	var $infoBox = document.getElementById('infoBox');
	var oldInfo = $infoBox.innerHTML;
	var newInfo = document.createElement('span');
	if(sender==='self'){
		newInfo.setAttribute('class','selInfo');
	}else{
		newInfo.setAttribute('class','othInfo');
	}
	newInfo.innerHTML = val;
	$infoBox.innerHTML = newInfo.outerHTML+oldInfo;
	//$infoBox.appendChild(oldInfo);
}


//websocket发送消息给服务器
var ws;
(function websocket() {
	if(WebSocket){
		ws = new WebSocket("ws://localhost:8888/echo");
		ws.onopen = function() {
			// Web Socket 已连接上，使用 send() 方法发送数据
			alert('服务连接成功');
		};
		ws.onmessage = function(event){
			obj.info = {
				sender: 'other',
				info: event.data
			}
		};
		ws.onclose = function() {
			// 关闭 websocket
			alert("连接已关闭...");
		};
	}else{
		alert('浏览器不支持websocket通信，请使用高级浏览器！')
	}
})()
