let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        // .pipe(sass({outputStyle: 'expanded'}))//{outputStyle: 'compressed'} - минификатор
        .pipe(sass({outputStyle: 'compressed'}))//{outputStyle: 'compressed'} - минификатор
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('php', function () {
    return gulp.src('app/*.php')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
})

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
    gulp.watch('app/*.php', gulp.parallel('php'))
});

gulp.task('default', gulp.parallel('scss', 'js','browser-sync', 'watch'))