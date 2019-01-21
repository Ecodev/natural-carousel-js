const {watch, parallel, series, src, dest} = require('gulp');

const handleErrors = require('./gulp/handleErrors');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

/**
 * Config
 */
const paths = {
    scripts: 'src/**/*.js',
    styles: 'src/css/*.scss',
    themes: 'src/css/*/*.css',
    images: ['src/**/*.gif', 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.png'],
    dest: 'dist',
    sourcemaps: 'maps',
    filename: 'natural-carousel',
};

/**
 * Javascript
 */
function scripts() {
    return src(paths.scripts)
        .pipe(uglify().on('error', handleErrors))
        .pipe(concat(paths.filename + '.min.js'))
        .pipe(dest(paths.dest));
}

/**
 * Stylesheets
 */
function styles() {

    src(paths.themes)
        .pipe(dest(paths.dest));

    return src(paths.styles)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]).on('error', handleErrors))
        .pipe(rename(paths.filename + '.min.css'))
        .pipe(dest(paths.dest));
}

/**
 * Browsersync
 */
function bs(cb) {
    browserSync({
        server: true,
        startPath: '/demo',
    });
    cb();
}

/**
 * Refresh
 */
function refresh(cb) {
    console.info('******************** REFRESH ***************************');
    cb();
}

function reload(cb) {
    browserSync.reload();
    cb();
}

function watchFiles() {
    // Source files
    watch(paths.styles, series(refresh, styles, reload));
    watch(paths.themes, series(refresh, styles, reload));
    watch(paths.scripts, series(refresh, scripts, reload));

    // Demo files
    watch('demo/*.html', series(refresh, reload));
    watch('demo/*.css', series(refresh, reload));
}

const build = parallel(scripts, styles);

/**
 * Main tasks
 */
exports.default = build;
exports.build = build;
exports.live = series(build, bs, watchFiles);
exports.watch = series(build, watchFiles);
