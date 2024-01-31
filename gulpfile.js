const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imageMin = require('gulp-imagemin');

function comprimeImg() {
    return gulp.src('./source/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./build/images'))
}

function comprimeJS() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/style/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/style'))
}


exports.default = function() {
    gulp.watch('./source/style/main.scss', {ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJS))
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImg))
}
