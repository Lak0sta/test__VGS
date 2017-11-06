'use strict';

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename        = require('gulp-rename'),
    sourcemaps    = require('gulp-sourcemaps'),
    rigger        = require('gulp-rigger'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglifyjs'),
    cssnano       = require('gulp-cssnano'),
    rename        = require('gulp-rename'),
    del           = require('del'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant'),
    cache         = require('gulp-cache');


// ... variables
var autoprefixerOptions = {
browsers: ['last 2 versions', '> 5%', 'Firefox ESR', 'ie >= 10']
};


gulp.task('html', function () {
return gulp.src('./dev/index.html')
  .pipe(rigger())
  .pipe(gulp.dest('dev'))
  .pipe(browserSync.reload({stream:true}));
});


gulp.task('css', function () {
return gulp.src('dev/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest('dev/css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dev/css'))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
browserSync({
  server: {
    baseDir: 'dev'
  },
  notify: false
});
});
gulp.task('scripts', function(){
  return gulp.src([
    'dev/js/jquery/**/*.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dev/js'));
});

// gulp.task('css-libs',['css'], function(){
//   return gulp.src('dev/acss/libs.css')
//   .pipe(cssnano())
//   .pipe(rename({suffix: '.min'}))
//   .pipe(gulp.dest('dev/assets/css'));
// });

gulp.task('bs-reload', function () {
browserSync.reload();
});

gulp.task('clean',function(){
  return del.sync('release');
});

gulp.task('clear',function(){
  return cache.clearAll();
});

gulp.task('img', function(){
  return gulp.src('dev/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()] //une
  })))
  .pipe(gulp.dest('release/img'));

});

gulp.task('default', ['html', 'css', 'browser-sync', 'scripts'], function () { 
gulp.watch(newFunction(), ['css']);
gulp.watch("dev/*.html", ['html']);
gulp.watch("dev/js/**/*.js",['scripts']);
gulp.watch("dev/js/*.js", ['bs-reload']);
});

gulp.task('release', function () {
return gulp.src('dev/scss/**/*.scss')
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest('release/css'));
});
function newFunction() {
    return "dev/scss/**/*.scss";
}
