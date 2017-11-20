//参考Cheerio介绍文章：
//http://cnodejs.org/topic/5203a71844e76d216a727d2e
//http://www.cnblogs.com/CraryPrimitiveMan/p/3674421.html

//cheerio模块是一个分析html标记的字符串，转换成可用jquery操作的dom
//类似的还有JSDOM
//用phantomjs（无UI浏览器）可以分析页面，但对于爬取文件（比方说图片）只能将文件地址写在一个文件中比方说html，打开
//html会自动显示图片，再用node去分析下载，也就是说不能直接下载流文件写入本地文件系统。这样就需要两部操作，因为phantom
//不是node模块，需要先用phantomjs执行一个js文件将地址写入一个文件，再打开node分析这个文件中地址，去请求下载流文件写入本地文件系统（参见phantomjs文件夹）
//而使用cheerio就不用了，因为我们可以直接用node拉取页面内容，再用cheerio分析就可以了

var cheerio = require('cheerio');

var htmlStr = "<div class='box'><span>hello world</span></div>";
var $ = cheerio.load(htmlStr);//将html标记字符串转换成dom树

console.log($('div span').html())//node命令后控制台输出：hello world
