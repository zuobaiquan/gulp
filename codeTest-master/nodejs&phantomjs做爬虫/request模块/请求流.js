

var rq = require('request');
var fs = require('fs');

//将请求过来的流写入文件
rq('http://nodejs.cn/static/images/logo.svg').pipe(fs.createWriteStream('./logo.svg'))
