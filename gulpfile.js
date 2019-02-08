// PostCSS by @nabaroa
var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssimport = require('postcss-import'),
    customproperties = require('postcss-custom-properties'),
    apply = require('postcss-apply'),
    mixins = require('postcss-mixins'),
    nested = require('postcss-nested'),
    customMedia = require("postcss-custom-media"),
    colorFunction = require('postcss-color-function');

nano = require('gulp-cssnano'),
    notify = require('gulp-notify');

gulp.task('css', function() {
    var processors = [
        cssimport,
        autoprefixer,
        customproperties,
        colorFunction,
        apply,
        mixins,
        nested,
        customMedia
    ];
    var configNano = {
        autoprefixer: { browsers: 'last 2 versions' },
        discardComments: { removeAll: true },
        safe: true
    };
    return gulp.src('./assets/css/*.css')
        .pipe(postcss(processors))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./assets/built/'))
        .pipe(notify({ message: 'Your CSS is ready ♡' }));
});
// Watch
gulp.task('watch', function() {
    // Watch .css files
    gulp.watch('assets/css/**/*.css', gulp.parallel(['css']));

});

// Default
gulp.task('default', gulp.series(['css', 'watch',]));
