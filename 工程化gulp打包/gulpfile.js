var fs = require('fs');
var path = require('path');
var functions = require('./functions');
var gulp = require('gulp');
var del = require('del');
var cache = require('gulp-cache');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir:'./'+gulp.env.n,
      index:'html/index.html'
    },
    port:8080
  })
})

//创建项目
gulp.task('create', function () {
    var projectName = gulp.env.n;
    if (projectName === true || projectName === undefined) {
        console.log('请指定项目名称！');
    } else {
        var dirs = functions.getDir(__dirname);
        if (dirs.indexOf(projectName) > 0) {
            console.log('已存在该项目或者目录！');
        } else {
            console.log('开始创建项目目录和文件...');
            fs.mkdir(path.join("./", projectName), function (err) {
                if (err) {
                    console.log('创建项目失败！');
                } else {
                    functions.copy(path.join("./", 'demo', '/'), path.join("./", projectName));
                    console.log(projectName + ' 项目创建成功！');
                }
            });
        }
    }
});


gulp.task('sass', function() {
  return gulp.src(gulp.env.n+'/source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(gulp.env.n+'/resource/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('styles', function() {
    return gulp.src(gulp.env.n+'/resource/css/**/*')
      .pipe(cssnano())
      .pipe(gulp.dest(gulp.env.n+'/resource/css'));
});
gulp.task('autofixer', function () {
    gulp.src(gulp.env.n+'/resource/css/**/*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true,
            remove:true
        }))
        .pipe(gulp.dest(gulp.env.n+'/resource/css'));
});

gulp.task('watch', function() {
  gulp.watch(gulp.env.n+'/source/sass/**/*.scss', ['sass']);
  gulp.watch(gulp.env.n+'/html/*.html', browserSync.reload);
  gulp.watch(gulp.env.n+'/source/js/**/*.js', browserSync.reload);
})

gulp.task('default', function(callback) {
  runSequence('sass','browserSync','watch',callback)
})

gulp.task('clean', function() {
  return del.sync(gulp.env.n);
})

gulp.task('build', function(callback) {
  runSequence(
    'styles',
    'autofixer',
    callback
  )
})
