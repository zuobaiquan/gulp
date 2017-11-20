
//页面导出成图片

var page = require("webpage").create();
page.open("http://www.baidu.com",function(){
	console.log("status:"+status);
	//if(status==="success"){
		page.render("baidu.png");
	//}
	phantom.exit();
})
