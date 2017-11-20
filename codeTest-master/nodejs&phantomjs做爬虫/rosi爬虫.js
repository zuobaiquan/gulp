
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var path = require('path');
var rp = require('request-promise');
var querystring = require('querystring');

//配置下载选项
var _size = 9;//不写：全部尺寸；9：特大尺寸；3：大尺寸；2：中尺寸；1：小尺寸
var _Word = encodeURIComponent('娜美');//查询关键词,一定转成ASCII编码不然会报The header content contains invalid characters
var _time = new Date().getTime()+'';//每次查询添加时间挫
var _pn = 90;
var _rn = 30;

//下载连接（采用函数方式便于每次调用采用不同时间挫）
var searchUrl = 'http://www.rosmm.com';

//请求GO
var linkDB = [],k=0,deepLevel=3;//deepLevel表示链接层级深度
(function getLink(url){
	//console.log(url)
	if(url.split("level=")[1]){
		k = url.split("level=")[1]*1+1;
	}
	if(url.split("level=")[1]*1>=deepLevel){
		//console.log(linkDB)
		fs.writeFile('./img/img.txt',JSON.stringify(linkDB),function(err){
			if(err){
				console.log("———下载失败！")
			}else{
				console.log("———下载成功！")
			}
		});
		return;
	}
	var options = {
		agent: false,
		uri: encodeURI(url),
		encoding: null,
		headers: {
			"Referer": searchUrl
		}
	};
	//var encodeUrl = encodeURI(url);
	request(options,function(error,response,body){
		//console.log(response.statusCode);
		if(!error&&response.statusCode===200){
			var htmlStr = body;
			var $ = cheerio.load(htmlStr);
			var $a = $("a");
			var $img = $('img');
			var _link = (function(){//存储页面的链接，包括a标签链接和图片链接
				var obj = {aTag:[],imgTag:[]};
				for(var i=0;i<arguments.length;i++){
					arguments[i].each(function(){
						if(/rosimm/.test($(this).attr('href'))||/rosimm/.test($(this).attr('src'))){
							//console.log($(this).attr('href')||$(this).attr('src'));
							if(/http/.test($(this).attr('href'))||/http/.test($(this).attr('src'))){
								if((typeof $(this).attr('href'))!=='undefined'){
									obj['aTag'].push($(this).attr('href')+"?level="+k);
								}else{
									obj['imgTag'].push($(this).attr('src'));
									//loadImg($(this).attr('src'));
								}
							}else{
								if((typeof $(this).attr('href'))!=='undefined'){
									obj['aTag'].push(searchUrl+$(this).attr('href')+"?level="+k);
								}else{
									obj['imgTag'].push(encodeUrl+$(this).attr('src'));
									//loadImg(searchUrl+$(this).attr('src'));
								}
							}
						}
					})
				}
				return obj;
			})($a,$img);//所有需要分析的图片和超链接对象
			
			if(_link.aTag.length>0||_link.imgTag.length>0){
				linkDB.push(_link);
			}
			
			//console.log(_link.aTag);
			for(var j=0;j<_link.aTag.length;j++){
				(function(j){
					setTimeout(function(){
						getLink(_link.aTag[j]);
					},100*j)
				})(j)
			}
			
		}else if(error){
			console.log("错误："+error.message);
		}
		
	})
	
})(searchUrl)

function loadImg(url){
	var options = {
		uri: url,
		encoding: null,
		headers: {
			"Referer": searchUrl
		}
	};
	rp(options).then(function(data){
		fs.writeFile('./img/'+path.basename(options.uri)+'.jpg',data,function(err){
			if(err){
				console.log(path.basename(options.uri)+"———下载失败！")
			}else{
				console.log(path.basename(options.uri)+"———下载成功！")
			}
		});
	})
}
