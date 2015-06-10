/**
* Dependencies.
*/
var gulp = require("gulp");
var $ = require('gulp-load-plugins')();

// assets is where you define your application assets and you can pass them into gulp.
var assets = require('./server/config/assets');


gulp.task('cwd_public', function(){

  // change the working directory to the public folder, where your assets are located.
  var gulpFileCwd = __dirname +'/public';

  process.chdir(gulpFileCwd);

  // print the working directory
  $.util.log('Working directory changed to', $.util.colors.magenta(gulpFileCwd));

});

// the default task that is run with the command 'gulp'
gulp.task('default', ['cwd_public'], function(){

  // concat and minify your css
  gulp.src(assets.development.css)
    .pipe(concat("styles.min.css"))
    .pipe($.minifycss())
    .pipe(gulp.dest('./css/'));

  // concat and minify your js
  gulp.src(assets.development.js)
    .pipe(concat("scripts.min.js"))
    .pipe($.uglify())
    .pipe(gulp.dest('./js/'));

  // optimize your images
  gulp.src('./images/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('./images/'));
});


gulp.task('serve', function(){

  // Get server
  var Starter = require('./server.js');

  //Start it
  Starter.start();

});
