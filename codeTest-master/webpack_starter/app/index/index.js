
require("./index.css");//require("!style-loader!css-loader!./index.css")这样会和rules中的配置重复导致无法提取css文件，切记不可

alert("这是index.js")

var index2 = require("./index2.js");

index2();