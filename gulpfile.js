var gulp = require('gulp');
var concat = require('gulp-concat');
var minHtml = require('gulp-minify-html');
var minCss = require('gulp-minify-css');
var minifyejs = require('gulp-minify-ejs');
var minJs = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task("css", function () {
    gulp.src('public/css/**')
        .pipe(minCss())
        .pipe(gulp.dest('evernote/css/'));
});

gulp.task("js", function () {

    gulp.src(['public/*.js', 'public/evernote/**/*.js'])
        .pipe(concat('evernote.min.js'))
        .pipe(minJs())
        .pipe(gulp.dest('evernote/js/'));

    gulp.src(['public/lib/angular-resource/*.min.js', 'public/lib/angular-route/*.min.js'])
        .pipe(minJs())
        .pipe(concat('ngmodules.min.js'))
        .pipe(gulp.dest('evernote/js/'));
});

gulp.task("html", function () {
    gulp.src('public/evernote/views/*.html')
        .pipe(minHtml())
        .pipe(gulp.dest('evernote/views'));
    gulp.src('public/evernote/views/*.html')
        .pipe(minHtml())
        .pipe(gulp.dest('evernote/views'));
});
//gulp.task("ejs",function(){
//    gulp.src('app/views/*.ejs')
//        .pipe(minifyejs())
//        .pipe(rename("home.ejs"))
//        .pipe(gulp.dest('app/views/'));
//});


gulp.task('default', ["js", "html", "css"]);