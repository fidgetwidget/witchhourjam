var gulp = require('gulp');
var gutil = require('gulp-util');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');

var paths = {
  game: ['game/**/*.js'],
  assets: ['assets/**/*.js']
};


gulp.task('bundle', function (cb) {

  return gulp.src('./assets/app.js')
    .pipe(webpackStream({ 
      output: {
        filename: './public/js/app.js' 
      } 
    }, webpack))
    .pipe(gulp.dest(''));

});




gulp.task('watch', function () {

  gulp.watch([paths.assets, paths.game], ['bundle']);

});

gulp.task('default', ['bundle']);
