var gulp = require('gulp');
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
      baseDir:'./app',
      index:'html/index.html'
    },
    port:8080
  })
})

gulp.task('sass', function() {
  return gulp.src('app/source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/resource/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('styles', function() {
    return gulp.src('app/resource/css/**/*')
      .pipe(cssnano())
      .pipe(gulp.dest('app/resource/css'));
});
gulp.task('autofixer', function () {
    gulp.src('app/resource/css/**/*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove:true
        }))
        .pipe(gulp.dest('app/resource/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/source/sass/**/*.scss', ['sass']);
  gulp.watch('app/html/*.html', browserSync.reload);
  gulp.watch('app/source/js/**/*.js', browserSync.reload);
})

gulp.task('default', function(callback) {
  runSequence('sass','browserSync','watch',callback)
})

gulp.task('build', function(callback) {
  runSequence(
    'styles',
    'autofixer',
    callback
  )
})
