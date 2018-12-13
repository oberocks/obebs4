const gulp = require('gulp');
const data = require('gulp-data');
const fs = require('fs');
const sass = require('gulp-sass');
const nunjucksRender = require('gulp-nunjucks-render');
const jsonToSass = require('gulp-json-to-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');



function get_obebs4_settings(filepath) {
    let theData = JSON.parse(fs.readFileSync(filepath));
    return {
      obe_settings: theData
    };
}

function get_global_strings_json(filepath) {
    
    // get the data
    let theData = JSON.parse(fs.readFileSync(filepath));
    
    /*
    // loop through each top level object
    for (var page in theData) {
        // extract the top level object
        var x = theData[page];
        // extract the nav links from that object
        var x_navlinks = x.navlinks;
        // break off initial item so it won't be sorted
        var x_page = x_navlinks.shift();
        // sort the remaining items
        x_navlinks.sort(function(a, b) {
            return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
        });
        // add that initial item back to the beginning
        x_navlinks.unshift(x_page);
        // replace the original data with the newly sorted version
        theData[page].navlinks = x_navlinks;
    }
    */

    return {
      global_strings: theData
    };

}





gulp.task('compile-sass', function(){
    return gulp.src(
        [
            //'node_modules/bootstrap/scss/bootstrap.scss',
            'obebs4/scss/obebs4-bootstrap.scss'
        ]
    )
    .pipe(sass({outputStyle: 'compressed'}))
    //.pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer('last 2 version', 'Chrome >= 45', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 9', 'Safari >= 9', 'Android >= 4.4', 'Opera >= 30') ]))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('library/css'))
});




gulp.task('concat-js', function(){
    return gulp.src(
        [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'obebs4/core/js/obebs4-popovers.js',
            'obebs4/core/js/obebs4-tooltips.js',
            'obebs4/core/js/obebs4-dropdown-selects.js',
            'obebs4/core/js/obebs4-fa5-animated-checkboxes.js',
            'obebs4/prismjs/js/prism.min.js',
            'node_modules/tinycolor2/dist/tinycolor-min.js',
            'node_modules/datatables.net/js/jquery.dataTables.min.js',
            'node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            'obebs4/core/js/obebs4-library.js',
            'obebs4/core/js/obebs4-dataTables.js',
            'obebs4/core/js/obebs4-calendar-datepicker-plugin.js',
            'obebs4/core/js/obe-text-toggle-vanilla-mini-plugin.js'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('obebs4.library.bundle.js'))
    .pipe(terser({
        output: {
            comments: true // Options: some, all, true, or regex
        },
        keep_fnames: true,
        keep_classnames: true,
        mangle: false
      }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('library/js'))
});




gulp.task('concat-css', function(){
    return gulp.src(
        [
            'library/css/obebs4-bootstrap.css',
            'obebs4/prismjs/css/prism.css',
            'node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            'obebs4/core/css/obebs4-library.css'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('obebs4.library.bundle.css'))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('library/css'))
});




gulp.task('clean-up', function () {
    return del([
        'library/css/obebs4-bootstrap.css'
    ]);
});




gulp.task('move-images', function(){
    return gulp.src(
        [
            'obebs4/core/images/obe-devices.png',
            'obebs4/core/images/64x64.jpg',
            'obebs4/core/images/128x128.jpg',
            'obebs4/core/images/256x256.jpg',
            'obebs4/core/images/512x512.jpg',
            'obebs4/core/images/600x338.jpg',
            'obebs4/core/images/1024x1024.jpg',
            'obebs4/core/images/1400x875.jpg',
            'obebs4/core/images/1600x900.jpg',
            'obebs4/core/images/1920x1080.jpg',
            'obebs4/core/images/1920x1165.jpg',
            'obebs4/core/images/2650x1600.jpg',
            'obebs4/core/images/OBE-facebook-share-image.jpg',
            'obebs4/core/images/OBE-twitter-share-image.jpg'
        ]
    )
    .pipe(gulp.dest('library/images'))
});



gulp.task('move-favicon-files', function(){
    return gulp.src(
        [
            'obebs4/core/images/favicons/android-icon-36x36.png',
            'obebs4/core/images/favicons/android-icon-48x48.png',
            'obebs4/core/images/favicons/android-icon-72x72.png',
            'obebs4/core/images/favicons/android-icon-96x96.png',
            'obebs4/core/images/favicons/android-icon-144x144.png',
            'obebs4/core/images/favicons/android-icon-192x192.png',
            'obebs4/core/images/favicons/apple-icon-57x57.png',
            'obebs4/core/images/favicons/apple-icon-60x60.png',
            'obebs4/core/images/favicons/apple-icon-72x72.png',
            'obebs4/core/images/favicons/apple-icon-76x76.png',
            'obebs4/core/images/favicons/apple-icon-114x114.png',
            'obebs4/core/images/favicons/apple-icon-120x120.png',
            'obebs4/core/images/favicons/apple-icon-144x144.png',
            'obebs4/core/images/favicons/apple-icon-152x152.png',
            'obebs4/core/images/favicons/apple-icon-180x180.png',
            'obebs4/core/images/favicons/apple-icon-precomposed.png',
            'obebs4/core/images/favicons/apple-icon.png',
            'obebs4/core/images/favicons/favicon-16x16.png',
            'obebs4/core/images/favicons/favicon-32x32.png',
            'obebs4/core/images/favicons/favicon-96x96.png',
            'obebs4/core/images/favicons/favicon.ico',
            'obebs4/core/images/favicons/ms-icon-70x70.png',
            'obebs4/core/images/favicons/ms-icon-144x144.png',
            'obebs4/core/images/favicons/ms-icon-150x150.png',
            'obebs4/core/images/favicons/ms-icon-310x310.png',
            'obebs4/core/images/favicons/browserconfig.xml',
            'obebs4/core/images/favicons/manifest.json'
        ]
    )
    .pipe(gulp.dest('library/images/favicons'))
});



gulp.task('compile-nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('nunjucks/pages/**/*.+(html|nunjucks|njk)')
    // Get OBE settings json data
    .pipe(data(get_obebs4_settings('./obebs4/data/obebs4_settings.json')))
    // Get global strings json data (for DRY nunjucks vars)
    .pipe(data(get_global_strings_json('./nunjucks/data/global_strings.json')))
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['nunjucks/templates']
    }))
    // output files in app folder
    .pipe(gulp.dest('src'))
});



gulp.task('ingest-obebs4-settings', function () {
    return gulp.src('obebs4/data/obebs4_settings.json')
    // pipe through jsonToSass
    .pipe(jsonToSass({
            jsonPath: 'obebs4/data/obebs4_settings.json',
            scssPath: 'obebs4/scss/settings/_obebs4_settings.scss'
        })
    );
});










gulp.task('obebs4', function() {
    runSequence(
        'ingest-obebs4-settings',
        'compile-sass',
        'move-images',
        'move-favicon-files',
        'compile-nunjucks',
        'concat-js',
        'concat-css',
        'clean-up'
    );
});