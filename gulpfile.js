// ////////////////////////////////////////////////
// Required Tasks
// ////////////////////////////////////////////////

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	csso = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del');


// ////////////////////////////////////////////////
// Log Errors
// ////////////////////////////////////////////////

function errorlog(err){
	console.log(err.message);
	this.emit('end');
}


// ////////////////////////////////////////////////
// Scripts Task
// ////////////////////////////////////////////////

gulp.task('minify', function() {
	gulp.src('dist/eventfeed.js')
	.pipe(uglify())
	.on('error', errorlog)
	.pipe(rename('eventfeed.min.js'))
	.pipe(gulp.dest('dist/'))
	.pipe(reload({stream:true}));
});

gulp.task('sign', function() {
	gulp.src(['dist/signature.js', 'dist/eventfeed.min.js'])
	.pipe(concat('temp.js'))
	.on('error', errorlog)
	.pipe(rename('eventfeed.min.js'))
	.pipe(gulp.dest('dist/'))
	.pipe(reload({stream:true}));
});


// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////////////////

gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task ('watch', function(){
	gulp.watch('dist/eventfeed.js', ['scripts']);
});


// ////////////////////////////////////////////////
// Main Tasks
// ////////////////////////////////////////////////

gulp.task('compile', ['minify', 'sign']);

gulp.task('default', ['minify', 'sign', 'serve', 'watch']);
