function getData(url,rqType,para,callback){
	
	$.ajax({
		type:rqType,
		url:url,
		async:true,
		dataType:'json',
		data:para,
		success:function(data){
			callback(data);
		},
		error:function(){
			alert("数据请求失败！请稍后重试！");
		}
	});
	
}
