var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


function copySassCss(done) {
	gulp.src('./src/sass/**/*.sass')
	 .pipe(sourcemaps.init()) //запускает процесс отслеживания файлов со стилями
	 .pipe(sass({ //меняет сасс на сцц
	 	errorLogToConsole: true, //выводит ошибки в консоль
	 	outputStyle: 'compressed' //минимизирует файл со стилями
	 }))
	 .on('error', console.error.bind(console)) //выводит ошибки в консоль
	 .pipe(autoprefixer({
	 	 overrideBrowserslist: ['last 2 versions'],
    cascade: false
	 }))
  .pipe(rename({suffix: '.min'})) //добавляет префикс мин к файлу
  .pipe(sourcemaps.write('./')) //записывает карту стилей до момента минимизации, для удобного редактирования
		.pipe(gulp.dest('./src/css/'))
		.pipe(browserSync.stream()); //переносит файл со стилями в нужную деррикторию

	done();
}


function watchAll() {
	gulp.watch('./src/sass/**/*', copySassCss);
	gulp.watch('./src/*.html', browserReload);
	gulp.watch('./src/js/*.js', browserReload);
}


function sync(done) {
	browserSync.init({
		server: {
			baseDir: "./src/"
		},
		port: 3000
	});

	done();
}

function browserReload(done) {
	browserSync.reload();

	done();
}


gulp.task('default', gulp.parallel(sync,watchAll));
