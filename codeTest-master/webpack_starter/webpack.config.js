var path = require('path');
var webpack = require('webpack');
var glob = require('glob');//获取匹配文件路径
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new extractTextPlugin( 'css/[name].css');
var cssLoader = extractCSS.extract({fallback: 'style-loader',use: 'css-loader',publicPath: 'css/'});

function getEntry(globPath, pathDir) {//获取入口文件
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i].replace('.html', '.js');
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        //console.log(2, pathname, entry);
        entries[basename] = './' + entry;
    }
    return entries;
}


function html_plugins(){
	var htmls = getEntry('app/**/*.html','app\\');
	var HtmlPlugin = [
		new webpack.HotModuleReplacementPlugin()
	];
	for (var key in htmls) {
		htmls[key] = htmls[key].replace('.js', '.html');
		HtmlPlugin.push(new htmlWebpackPlugin({
			filename:  __dirname+'/dist/'+key + '.html', 
			template: htmls[key],
			inject: true,
			chunks: [key]
		}));
	};
	HtmlPlugin.push(extractCSS);
	return HtmlPlugin;
}

module.exports = {
	entry: getEntry('app/**/*.html','app\\'),//根据html文件获取每个页面的主js文件

	output: {//设置出口文件
		path: path.resolve(__dirname,'./dist/'),
		publicPath: '',//只是为下面的输出的js文件路径或提取的css文件路径在html中的引用地址前面添加公共部分，而不是设置输出到磁盘的公共地址。如此处设置/assets/，而path为'./dist/',filename为
		//'js/[name].bundle.js'，那么js文件会存在./dist/js/[name].bundle.js，但页面中的地址却是src="/assets/js/[name].bundle.js"，因为html文件输出到了dist根目录，所以这样的
		//地址，项目在build或dev环境下（dev下会在内存中创建项目拷贝，结构和build后的一致）都是无法引用到的，所以这里针对此目录结构留空即可。
		//http://www.cnblogs.com/yueliangcl/p/6679427.html  http://www.css88.com/doc/webpack2/guides/public-path/
		filename: 'js/[name].bundle.js'
	},
	module: { //配置loader，注意使用3.0使用rules而不是loaders
		rules: [
			//{ test: /\.css$/, use: "style-loader!css-loader" },
			{test: /\.css$/, use: cssLoader},//css文件提取并打包到单独文件
			{
		　　　　　　test: /\.(png|jpg|gif)$/,
		　　　　　　loader: 'url-loader?limit=8192'
		　　　}
			
		]
	},
	plugins: html_plugins(),
//	[ //注意是数组
//		 new webpack.HotModuleReplacementPlugin(),
//		 //html_plugins(),
//		 //new htmlWebpackPlugin(),
//		 new extractTextPlugin('stylesheets/[name].css')
//	],
	devtool: 'eval-source-map',
	devServer: {//我们在这里对webpack-dev-server进行配置
		contentBase: "./",
		historyApiFallback:true,
		inline: true,
		//hot: true,
		port:8080 
	}
}