'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('gulp-run-sequence');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('images', function () {
    return gulp.src('./assets/src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./assets/dist/img'));
});

gulp.task('templates', function () {
  return gulp.src('./templates/**/*.tpl.html')
    .pipe(templateCache())
    .pipe(gulp.dest('./assets/src/js'));
});

gulp.task('templates:watch', function() {
  gulp.watch('./templates/**/*.tpl.html');
});

gulp.task('sass', function() {
  gulp
    .src('./assets/src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/dist/css'))
  ;
});

gulp.task('sass:watch', function() {
  gulp.watch('./assets/src/sass/**/*.scss', ['sass']);
});

gulp.task('scripts', function() {
  return gulp.src([
      // Libraries
      './assets/src/js/vendor/xhook.min.js',
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/jquery.fitvids/jquery.fitvids.js',
      './bower_components/lodash/lodash.min.js',
      './bower_components/moment/min/moment.min.js',
      './bower_components/gsap/src/minified/TweenMax.min.js',

      // Angular Libraries
      './bower_components/angular/angular.min.js',
      './bower_components/angular-aria/angular-aria.min.js',
      './bower_components/angular-animate/angular-animate.min.js',
      './bower_components/ngFx/dist/ngFx.min.js',
      './bower_components/angular-bootstrap/ui-bootstrap.min.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      './bower_components/angular-ui-event/dist/event.min.js',
      './bower_components/angular-ui-map/ui-map.min.js',
      './bower_components/angular-ui-router/release/angular-ui-router.min.js',
      './bower_components/angular-ui-router-anim-in-out/anim-in-out.js',
      //'./bower_components/slick-carousel/slick/slick.min.js',
      './assets/src/js/vendor/slick.custom.js',
      './bower_components/angular-slick/dist/slick.min.js',
      './bower_components/angular-socialshare/dist/angular-socialshare.min.js',

      // App
      './assets/src/js/main.js',
      './assets/src/js/templates.js',
      './assets/src/js/app/**/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat({path: 'main.js', stat: { mode: '0666' }}))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./assets/dist/js'));
});

gulp.task('scripts:watch', function() {
  gulp.watch('./assets/src/js/**/*.js', ['scripts']);
});

gulp.task('default', function() {
  runSequence('templates', ['sass:watch', 'scripts:watch', 'templates:watch']);
});
