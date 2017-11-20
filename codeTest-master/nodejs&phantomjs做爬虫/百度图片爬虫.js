
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var path = require('path');
var rp = require('request-promise');

//配置下载选项
var _size = 9;//不写：全部尺寸；9：特大尺寸；3：大尺寸；2：中尺寸；1：小尺寸
var _Word = encodeURIComponent('娜美');//查询关键词,一定转成ASCII编码不然会报The header content contains invalid characters
var _time = new Date().getTime()+'';//每次查询添加时间挫
var _pn = 90;
var _rn = 30;

//下载连接（采用函数方式便于每次调用采用不同时间挫）
function searchUrl(){
	return 'http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord='+_Word+'&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z='+_size+'&ic=&word='+_Word+'&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=1&fr=&pn='+_pn+'&rn='+_rn+'&gsm='+(Math.ceil(Math.random())*200).toString(16)+'&'+_time+'=';
}

//请求GO
request(searchUrl(),function(error,response,body){
	console.log(response.statusCode)
	if(!error&&response.statusCode===200){
		var data = JSON.parse(body).data,urlArr=[];
		for(var i=0;i<data.length;i++){
			if(data[i]['hoverURL']){//可能会有空字符串，舍弃
				urlArr.push(data[i]['hoverURL'])
			}
		}
		//console.dir(urlArr)
		;(function downImg(j){
			if(j===urlArr.length)return;
			var options = {
				uri: urlArr[j],
				encoding: null,
				headers: {
					"Referer": "http://www.baidu.com"//爬取百度图片需要传入referer（访问来源地址）,不然会找不到资源
				}
			};
			rp(options).then(function(data){
				fs.writeFile('./img/'+path.basename(options.uri),data,function(err){
					if(err){
						console.log(path.basename(options.uri)+"———下载失败！")
					}else{
						console.log(path.basename(options.uri)+"———下载成功！")
					}
				});
				j++;
				downImg(j);
			})	
		})(0)
		
	}else if(error){
		console.log("错误："+error.message);
	}
	
})

