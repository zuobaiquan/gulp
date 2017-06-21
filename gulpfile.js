// 引入gulp
var gulp = require('gulp');
// 引入组件
var jshint = require('gulp-jshint');//检查js
var minifyCss = require("gulp-minify-css");
var sass   = require('gulp-sass');  //编译Sass
var less   = require('gulp-less');  //编译less
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩JS
var rename = require('gulp-rename');//重命名

var htmlmin = require('gulp-htmlmin');

// 检查js脚本的任务
// jshint是用来检测javascript的语法错误的，在grunt和gulp都有这个插件
gulp.task('lint', function() {
    gulp.src('./src/js/*.js') //检查文件：js目录下所有的js文件 //可配置检查脚本的具体名字
        .pipe(jshint()) // 进行检查
        .pipe(jshint.reporter('default')); // 对代码进行报错提示
});

gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});

//压缩css文件
gulp.task('minify-css', function () {
    gulp.src('./src/css/*.css') 
    	.pipe(concat('all.css'))
        .pipe(rename('all.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/')); 
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css/'));
});

//编译多个less
gulp.task('testLess', function () {
    gulp.src(['src/less/index.less','src/less/detail.less']) //多个文件以数组形式传入
        .pipe(less())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('dist/css/')); //将会在src/css下生成index.css以及detail.css
});


// 合并，压缩js文件
// 找到js/目录下的所有js文件，合并、重命名、压缩，最后将处理完成的js存放在dist/js/目录下
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
        console.log('gulp task is done');//自定义提醒信息
});
//....  其他任务类似
// 定义默认任务,执行gulp会自动执行的任务
gulp.task('default',function(){
    gulp.run('minify-css','lint', 'sass', 'scripts','testHtmlmin','testLess');
    // 监听js文件变化，当文件发生变化后会自动执行任务
    gulp.watch('./js/*.js', function(){
        gulp.run('lint','scripts');
    });
});