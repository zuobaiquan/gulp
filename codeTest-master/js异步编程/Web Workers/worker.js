
if(Worker){
	
	onmessage = function(e){
		console.log("信息获取成功！");
		let get1 = e.data[0];
		let get2 = e.data[1];
		let get3 = e.data[2];
		if(!get1||!get2){
			alert("请输入需要计算的值再点击‘计算’按钮")
		}else if(isNaN(get1)||isNaN(get2)){
			alert("请输入数字而不是字符串！")
		}else{
			postMessage(eval(get1+get3+get2));
			console.log("信息返回成功！")
		}
		
	}
	
}else{
	alert("您的浏览器暂不支持Web Workers，请使用Chrome等高级浏览器！")
}
