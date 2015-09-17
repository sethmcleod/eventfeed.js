// ////////////////////////////////////////////////
// Required Tasks
// ////////////////////////////////////////////////

var gulp = require('gulp'),
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

gulp.task('scripts', function() {
	gulp.src('dist/eventfeed.js')
	.pipe(uglify())
	.on('error', errorlog)
	.pipe(rename('eventfeed.min.js'))
	.pipe(gulp.dest('dist/'))
	.pipe(reload({stream:true}));
});


// ////////////////////////////////////////////////
// Styles Task
// ///////////////////////////////////////////////

gulp.task('styles', function() {
	gulp.src('example/example.css')
	.pipe(autoprefixer({
		browsers: ['last 3 versions']
	}))
	.pipe(csso())
	.on('error', errorlog)
	.pipe(rename('example.min.css'))
	.pipe(gulp.dest('example/'))
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
	gulp.watch('example/example.css', ['styles']);
	gulp.watch('dist/eventfeed.js', ['scripts']);
});


// ////////////////////////////////////////////////
// Main Tasks
// ////////////////////////////////////////////////

gulp.task('compile', ['scripts', 'styles']);

gulp.task('default', ['scripts', 'styles', 'serve', 'watch']);
