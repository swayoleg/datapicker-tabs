const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// Path configurations
const paths = {
    scss: {
        src: 'src/assets/scss/**/*.scss',
        dest: 'src/assets/css/',
        distDest: 'dist/css/'
    },
    js: {
        src: 'src/assets/js/**/*.js',
        dest: 'dist/js/'
    }
};

// Compile SCSS to CSS with sourcemaps
function compileStyles() {
    return src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest(paths.scss.dest)) // Output unminified to src folder
        .pipe(dest(paths.scss.distDest)) // Output unminified to dist folder
        .pipe(postcss([cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.scss.dest)) // Output minified to src folder
        .pipe(dest(paths.scss.distDest)); // Output minified to dist folder
}

// Process JavaScript files
function processScripts() {
    return src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(dest(paths.js.dest)) // Output unminified version
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.js.dest)); // Output minified version
}

// Watch for changes
function watchTask() {
    watch([paths.scss.src], series(compileStyles));
    watch([paths.js.src], series(processScripts));
}

// Default task
exports.default = series(
    parallel(compileStyles, processScripts),
    watchTask
);

// Build task
exports.build = parallel(compileStyles, processScripts);