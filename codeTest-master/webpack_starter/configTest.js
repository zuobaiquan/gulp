var path = require('path');
var webpack = require('webpack');
var glob = require('glob');//获取匹配文件路径
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	entry: {
		index: './app/index/index.js',
		about: './app/about/about.js'
	},
	output: {
		path: path.resolve(__dirname,'./dist/'),
		publicPath: '/assets/',
		filename: 'js/[name].bundle.js'//若无路劲则表示文件名，如果有则是表示路径和文件名
	},
	module: { 
		rules: [
			{
				test: /\.css$/,
				use: extractTextPlugin.extract({//注意这里使用了style和css加载器，那么index.js中就不要使用了（查看index.js），重复会失效，困扰良久原来是这个问题
					fallback: 'style-loader',
					use: 'css-loader'
				})
			}
		]
	},
	plugins:[ 
		 //new CleanWebpackPlugin(['dist']),
		 new webpack.HotModuleReplacementPlugin(),
		 new extractTextPlugin('css/[name].css')//若无路劲则表示文件名，如果有则是表示路径和文件名
	],
	devtool: 'eval-source-map',
	devServer: {
		contentBase: "./app/index/",
		historyApiFallback:true,
		inline: true,
		//hot: true,
		port:8080 
	}
}