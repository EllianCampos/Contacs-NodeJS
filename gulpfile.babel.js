import gulp from 'gulp'
import pug from 'gulp-pug'

gulp.task('views', () => {
    return gulp.src('./src/views/pages/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public'))
})

gulp.task('default', () => {
    gulp.watch('./src/views/**/*.pug', gulp.series('views'))
})
