var gulp = require('gulp'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

// 默认监听
gulp.task('default', function () {
    gulp.watch('css/*.less', ['less']);
});

// 编译Less
gulp.task('less', function () {
    return gulp.src('css/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});

// 图片压缩
gulp.task('image', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'));
});

// 整体打包
gulp.task('dist', ['less', 'image'], function () {
    gulp.src(['*.mp4', '*.mp3'])
        .pipe(gulp.dest('dist'));

    return gulp.src('*.html')
        .pipe(usemin({
            inlinecss: [csso()],
            js: [uglify()],
            zeptojs: [uglify()]
        }))
        .pipe(gulp.dest('dist'));
});