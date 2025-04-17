const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const header = require('gulp-header');
const fs = require('fs');

// Read package info
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Banner template
const banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

// Path configurations
const paths = {
    scss: {
        src: 'src/assets/scss/**/*.scss',
        dest: 'src/assets/css/',
        distDest: 'dist/css/'
    },
    js: {
        src: 'src/assets/js/**/*.js',
        dest: 'src/assets/js/',
        distDest: 'dist/js/'
    }
};

// Ensure dist directory exists
function ensureDistDirs(cb) {
    const dirs = [
        paths.scss.distDest,
        paths.js.distDest
    ];

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    cb();
}

// Compile SCSS to CSS with sourcemaps
function compileStyles() {
    return src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(header(banner, { pkg }))
        .pipe(dest(paths.scss.dest)) // Output unminified to src folder
        .pipe(dest(paths.scss.distDest)) // Output unminified to dist folder
        .pipe(postcss([cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner, { pkg }))
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
        .pipe(header(banner, { pkg }))
        .pipe(dest(paths.js.distDest)) // Output unminified version to dist
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner, { pkg }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.js.distDest)); // Output minified version to dist
}

// Copy TypeScript declaration file
function copyTypeDeclarations() {
    return src('./index.d.ts')
        .pipe(dest('./dist'));
}

// Watch for changes
function watchTask() {
    watch([paths.scss.src], series(compileStyles));
    watch([paths.js.src], series(processScripts));
}

// Default task
exports.default = series(
    ensureDistDirs,
    parallel(compileStyles, processScripts, copyTypeDeclarations),
    watchTask
);

// Build task
exports.build = series(
    ensureDistDirs,
    parallel(compileStyles, processScripts, copyTypeDeclarations)
);