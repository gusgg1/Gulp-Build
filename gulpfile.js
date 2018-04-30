'use strict';

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
       del = require('del'),
       iff = require('gulp-if'),
      csso = require('gulp-csso'),
  imagemin = require('gulp-imagemin'),
browsrSync = require('browser-sync').create(),
    concat = require('gulp-concat');

const options = {
  src: 'src',
  dist: 'dist'
}

// ************************************************************** /
// ************************* gulp scripts *********************** /
// concatenates, minifiesm JS files into all.mim.js
// and is copied to the 'dist/scripts' folder.
// Generates source map.

gulp.task('scripts', () => {
  return gulp.src(options.src + '/js/**')
    .pipe(maps.init())
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(options.dist + '/scripts'));
});

// ************************************************************** /
// ************************* gulp styles ************************ /
// compiles SCSS files into CSS then concatenates and
// minifies into all.min.css file put in 'dist/styles' folder
// Generates source map.

gulp.task('styles', () => {
  return gulp.src(options.src + '/sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(concat('all.min.css'))
    .pipe(csso())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(options.dist + '/styles'));
});

// ************************************************************** /
// ************************* gulp images ************************ /
// Optimizes size of project's JPEG and PNG files and
// copies those to the 'dist/content' folder.

gulp.task('images', () => {
	return gulp.src(options.src + '/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest(options.dist + '/content'))
});

// ************************************************************** /
// ************************** gulp clean ************************ /
// Deletes all files and folders in the 'dist' folder.

gulp.task('clean', () => {
  return del([options.dist]);
});

// ************************************************************** /
// ************************* gulp build ************************* /
// Runs clean, scripts, styles and images tasks.
// The clean task completes first before the other commands.

gulp.task('build', ['clean'], () => {
  gulp.start('html')
});

gulp.task('html', ['scripts', 'styles', 'images'], () => {
  return gulp.src(options.src + '/index.html')
    .pipe(gulp.dest(options.dist));
});

// ************************************************************** /
// **************************** gulp **************************** /
// Runs build task and serves the project using local web server
// It watches for changes to any .scss file. When there is a change
// the gulp styles command is run and the files are compiled,
// concatenated and minified to the 'dist/styles' folder.
// Project then reloads in the browser displaying new changes.

gulp.task("default", ['build'], () => {
  gulp.start('serve');
});

// Static Server + watching sass files
gulp.task('serve', function() {

  setTimeout(function() {
    browsrSync.init({
      server: "./dist"
    });
  }, 1000);

  gulp.watch("src/sass/**", ['styles']);
  gulp.watch("src/sass/**").on('change', browsrSync.reload);
});


