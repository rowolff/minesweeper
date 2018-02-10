// npm install --save-dev gulp-babel babel-core babel-preset-env

var gulp  = require('gulp'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel');

gulp.task('watch', function() {
	return watch('src/*.js')
		.pipe(babel( { presets: ['env']} ))
		.pipe(gulp.dest('lib'))
});
