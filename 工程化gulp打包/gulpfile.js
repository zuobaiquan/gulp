// 引入gulp
var gulp = require('gulp');
// 引入组件
var jshint = require('gulp-jshint');//检查js
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');//// 设定同步异步执行任务
 const md5 = require('gulp-md5-assets');         // 添加 md5
// 检查js脚本的任务
// jshint是用来检测javascript的语法错误的，在grunt和gulp都有这个插件
gulp.task('lint', function() {
    gulp.src('./src/js/*.js') //检查文件：js目录下所有的js文件 //可配置检查脚本的具体名字
        .pipe(jshint()) // 进行检查
        .pipe(jshint.reporter('default')); // 对代码进行报错提示
});

// 设置任务---使用代理
// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    port:8080
  })
})
//
gulp.task('htmls', function () {
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
    gulp.src('app/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'))
        .pipe(md5(10));
});


// 编译Sass
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') //获取所有app/scss文件夹及子文件夹的后缀为.scss 文件
    .pipe(sass().on('error', sass.logError)) //接受错误消息，并且把错误消息显示在控制台
    .pipe(gulp.dest('app/css')) //预编译后的文件放到css文件夹下
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'));
    console.log('gulp images is done');//自定义提醒信息
});
// 拷贝字体font到dist文件夹
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
    console.log('gulp fonts is done');//自定义提醒信息
})
//压缩css文件
gulp.task('styles', function() {
    return gulp.src('app/css/**/*')
      .pipe(cssnano())
      .pipe(gulp.dest('dist/css'))
      .pipe(md5(10, './dist/**/*.html'));
      console.log('gulp styles is done');//自定义提醒信息
});

gulp.task('scripts', function() {
    return gulp.src('app/js/**/*')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(md5(10, './dist/**/*.html'));
      console.log('gulp scripts is done');//自定义提醒信息
});

//编译多个less
// gulp.task('testLess', function () {
//     gulp.src(['src/less/index.less','src/less/detail.less']) //多个文件以数组形式传入
//         .pipe(less())
//         .pipe(concat('all.min.css'))
//         .pipe(gulp.dest('dist/css/')); //将会在src/css下生成index.css以及detail.css
// });


//监听scss、html、js文件变化，页面自动刷新
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);//监听scss文件的变化
  gulp.watch('app/*.html', browserSync.reload);//监听html文件的变化
  gulp.watch('app/js/**/*.js', browserSync.reload);//监听js文件的变化
})

//....  其他任务类似
// 定义默认任务,执行gulp会自动执行的任务
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync','lint'], 'watch',
    callback
  )
})

// Cleaning
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})
gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

//文件打包
gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['images', 'fonts','htmls','styles','scripts'],
    callback
  )
})
