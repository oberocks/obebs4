// Import Modules
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
const htmlbeautify = require('gulp-html-beautify');
const packagejson = JSON.parse(fs.readFileSync('./node_modules/obebs4/package.json', 'utf8'));
const obebs4version = packagejson.version;
const fontawesomeversion = packagejson.faversion;



// Utility Data Function
function get_obebs4_settings(filepath) {
    // parse the data
    let theData = JSON.parse(fs.readFileSync(filepath));
    // array of all obebs4_settings.json keys that have color & modifier UI in _settings_generator.njk
    let keys = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'body-bg', 'body-color', 'link-color', 'mark-bg', 'input-bg', 'input-color', 'input-placeholder-color', 'input-disabled-bg', 'input-group-addon-bg', 'input-group-addon-color', 'component-active-bg', 'component-active-color', 'dropdown-header-color', 'dropdown-link-color', 'dropdown-link-hover-bg', 'dropdown-link-disabled-color', 'yiq-text-dark', 'yiq-text-light', 'border-color', 'headings-color', 'text-muted', 'blockquote-small-color', 'table-head-bg', 'table-head-color', 'table-dark-color', 'table-dark-bg'];
    // loop through the keys array
    for ( var i = 0; i < keys.length; i++) {
        // replace the sass var $
        let val = theData[keys[i]].replace('$', '');
        // check for strings 
        if (val.indexOf('900') > -1) {
            theData[keys[i] + '-C'] = val.replace('-900', '');
            theData[keys[i] + '-M'] = '900';
        } else if (val.indexOf('800') > -1) {
            theData[keys[i] + '-C'] = val.replace('-800', '');
            theData[keys[i] + '-M'] = '800';
        } else if (val.indexOf('700') > -1) {
            theData[keys[i] + '-C'] = val.replace('-700', '');
            theData[keys[i] + '-M'] = '700';
        } else if (val.indexOf('600') > -1) {
            theData[keys[i] + '-C'] = val.replace('-600', '');
            theData[keys[i] + '-M'] = '600';
        } else if (val.indexOf('500') > -1) {
            theData[keys[i] + '-C'] = val.replace('-500', '');
            theData[keys[i] + '-M'] = '500';
        } else if (val.indexOf('400') > -1) {
            theData[keys[i] + '-C'] = val.replace('-400', '');
            theData[keys[i] + '-M'] = '400';
        } else if (val.indexOf('300') > -1) {
            theData[keys[i] + '-C'] = val.replace('-300', '');
            theData[keys[i] + '-M'] = '300';
        } else if (val.indexOf('200') > -1) {
            theData[keys[i] + '-C'] = val.replace('-200', '');
            theData[keys[i] + '-M'] = '200';
        } else if (val.indexOf('100') > -1) {
            theData[keys[i] + '-C'] = val.replace('-100', '');
            theData[keys[i] + '-M'] = '100';
        } else if (val.indexOf('50') > -1) {
            theData[keys[i] + '-C'] = val.replace('-50', '');
            theData[keys[i] + '-M'] = '50';
        } else if (val.indexOf('null') > -1) {
            theData[keys[i] + '-C'] = 'none';
            theData[keys[i] + '-M'] = 'none';
        } else {
            theData[keys[i] + '-C'] = val;
            theData[keys[i] + '-M'] = 'none';
        }
    }
    // loop through the data object and init a property var
    for (const property in theData) {
        
        // create a key with a suffix (for use in nunjucks settings page files)
        const key = property + '-checkbox';
        
        // if the data property value is true
        if (theData[property] === 'true')
        {
            // create a new key and string value to mark a HTML checkbox as checked
            theData[key] = ' checked';
        }
        // else if the data property value is false
        else if (theData[property] === 'false')
        {
            // create a new key and string value to mark a HTML checkbox as unchecked
            theData[key] = '';
        }
    }
    // return the data object accessible via the property in nunjucks
    return { obe_settings: theData };
}

// Utility Data Function
function get_global_strings_json(filepath) {
    // parse the data
    let theData = JSON.parse(fs.readFileSync(filepath));
    // set the current OBE:BS4 Version number for use in nunjucks files
    theData['version'] = obebs4version;
    // set the current FontAwesome 5 version number for use in nunjucks files
    theData['faversion'] = fontawesomeversion;
    // return data
    return { global_strings: theData };
}

// Utility Function to prepend string to array of file paths
function pathArrPrepend(array, string) {
    let arr = [];
    let str = '';
    if (string != undefined) { str = string }
    for (let i = 0; i < array.length; i++) { arr.push(str + array[i]) }
    return arr;
}



// Set the settings file path to the default settings file
let settingsFilePath = './node_modules/obebs4/obebs4/data/obebs4_settings.json';

// Check for a settings file in the root directory
// If found, then use that settings file instead of the default
if (fs.existsSync('./obebs4_settings.json')) {
    settingsFilePath = './obebs4_settings.json';
}



// Images Array
const libraryImages = [
    'obe-devices.png',
    '64x64.jpg',
    '128x128.jpg',
    '256x256.jpg',
    '512x512.jpg',
    '600x338.jpg',
    '1024x1024.jpg',
    '1400x875.jpg',
    '1600x900.jpg',
    '1920x1080.jpg',
    '1920x1165.jpg',
    '2650x1600.jpg',
    'OBE-facebook-share-image.jpg',
    'OBE-twitter-share-image.jpg',
    'obebs4-build-big-picture.jpg'
];

// Favicon Images Array
const libraryFavicons = [
    'android-icon-36x36.png',
    'android-icon-48x48.png',
    'android-icon-72x72.png',
    'android-icon-96x96.png',
    'android-icon-144x144.png',
    'android-icon-192x192.png',
    'apple-icon-57x57.png',
    'apple-icon-60x60.png',
    'apple-icon-72x72.png',
    'apple-icon-76x76.png',
    'apple-icon-114x114.png',
    'apple-icon-120x120.png',
    'apple-icon-144x144.png',
    'apple-icon-152x152.png',
    'apple-icon-180x180.png',
    'apple-icon-precomposed.png',
    'apple-icon.png',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-96x96.png',
    'favicon.ico',
    'ms-icon-70x70.png',
    'ms-icon-144x144.png',
    'ms-icon-150x150.png',
    'ms-icon-310x310.png',
    'browserconfig.xml',
    'manifest.json'
];



gulp.task('ingest-obebs4-settings', function () {
    return gulp.src(settingsFilePath)
    // pipe through jsonToSass
    .pipe(jsonToSass({
            jsonPath: settingsFilePath,
            scssPath: './node_modules/obebs4/obebs4/scss/settings/_obebs4_settings.scss'
        })
    );
});



gulp.task('compile-sass', function(){
    return gulp.src(
        [
            //'./node_modules/bootstrap/scss/bootstrap.scss',
            './node_modules/obebs4/obebs4/scss/obebs4-bootstrap.scss'
        ]
    )
    .pipe(sass({outputStyle: 'compressed'}))
    //.pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer('last 2 version', 'Chrome >= 45', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 9', 'Safari >= 9', 'Android >= 4.4', 'Opera >= 30') ]))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/css'))
});



gulp.task('move-images', function(){
    return gulp.src(pathArrPrepend(libraryImages, './node_modules/obebs4/obebs4/core/images/'))
    .pipe(gulp.dest('./library/images'))
});



gulp.task('move-favicon-files', function(){
    return gulp.src(pathArrPrepend(libraryFavicons, './node_modules/obebs4/obebs4/core/images/favicons/'))
    .pipe(gulp.dest('./library/images/favicons'))
});



gulp.task('compile-nunjucks', function() {
    let htmlBeautifyOptions = {
        "indent_with_tabs": false,
        "max_preserve_newlines": 1,
        "jslint_happy": false,
        "break_chained_methods": false
    };
    // Gets .html and .nunjucks files in pages
    return gulp.src('./node_modules/obebs4/nunjucks/pages/**/*.+(html|nunjucks|njk)')
    // Get OBE settings json data
    .pipe(data(get_obebs4_settings(settingsFilePath)))
    // Get global strings json data (for DRY nunjucks vars)
    .pipe(data(get_global_strings_json('./node_modules/obebs4/nunjucks/data/global_strings.json')))
    // Renders template with nunjucks
    .pipe(nunjucksRender({
        path: ['./node_modules/obebs4/nunjucks/templates']
    }))
    // beautify the rendered file
    .pipe(htmlbeautify(htmlBeautifyOptions))
    // output files in app folder
    .pipe(gulp.dest('./library'))
});



gulp.task('concat-js', function(){
    return gulp.src(
        [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-popovers.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-toasts.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-tooltips.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-fa5-animated-checkboxes.js',
            './node_modules/obebs4/obebs4/prismjs/js/prism.min.js',
            './node_modules/tinycolor2/dist/tinycolor-min.js',
            './node_modules/datatables.net/js/jquery.dataTables.min.js',
            './node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-library.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-dataTables.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-calendar-datepicker-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obe-text-toggle-vanilla-mini-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-dropdown-select-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obe-input-grp-btn-toggle-plugins.js'
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
    .pipe(gulp.dest('./library/js'))
});




gulp.task('concat-production-js', function(){
    return gulp.src(
        [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-popovers.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-toasts.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-tooltips.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-fa5-animated-checkboxes.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-calendar-datepicker-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obe-text-toggle-vanilla-mini-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-dropdown-select-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obe-input-grp-btn-toggle-plugins.js'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('./obebs4.production.bundle.js'))
    .pipe(terser({
        output: {
            comments: true // Options: some, all, true, or regex
        },
        keep_fnames: true,
        keep_classnames: true,
        mangle: false
      }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/js'))
});



gulp.task('concat-wds-js', function(){
    return gulp.src(
        [
            './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-popovers.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-toasts.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-tooltips.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-fa5-animated-checkboxes.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-calendar-datepicker-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obe-text-toggle-vanilla-mini-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-dropdown-select-plugin.js',
            './node_modules/obebs4/obebs4/core/js/obe-input-grp-btn-toggle-plugins.js'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('./obebs4.wds.bundle.js'))
    .pipe(terser({
        output: {
            comments: true // Options: some, all, true, or regex
        },
        keep_fnames: true,
        keep_classnames: true,
        mangle: false
      }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/js'))
});




gulp.task('concat-plugins-js', function(){
    return gulp.src(
        [
            './node_modules/obebs4/obebs4/prismjs/js/prism.min.js',
            './node_modules/tinycolor2/dist/tinycolor-min.js',
            './node_modules/datatables.net/js/jquery.dataTables.min.js',
            './node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            './node_modules/obebs4/obebs4/core/js/obebs4-dataTables.js'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('obebs4.plugins.bundle.js'))
    .pipe(terser({
        output: {
            comments: true // Options: some, all, true, or regex
        },
        keep_fnames: true,
        keep_classnames: true,
        mangle: false
      }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/js'))
});



gulp.task('copy-prism-js', function () {
    return gulp.src('./node_modules/obebs4/obebs4/prismjs/js/prism.min.js')
    .pipe(gulp.dest('./library/js'));
});



gulp.task('copy-datatables-js', function(){
    return gulp.src(
        [
            './node_modules/datatables.net/js/jquery.dataTables.min.js',
            './node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('bootstrap4.datatables.min.js'))
    .pipe(terser({
        output: {
            comments: true // Options: some, all, true, or regex
        },
        keep_fnames: true,
        keep_classnames: true,
        mangle: false
      }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/js'))
});



gulp.task('copy-tinycolor-js', function () {
    return gulp.src('./node_modules/tinycolor2/dist/tinycolor-min.js')
    .pipe(gulp.dest('./library/js'));
});



gulp.task('concat-css', function(){
    return gulp.src(
        [
            './library/css/obebs4-bootstrap.css',
            './node_modules/obebs4/obebs4/prismjs/css/prism.css',
            './node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            './node_modules/obebs4/obebs4/core/css/obebs4-library.css'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('obebs4.library.bundle.css'))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/css'))
});




gulp.task('concat-production-css', function(){
    return gulp.src(
        [
            './library/css/obebs4-bootstrap.css'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('obebs4.production.bundle.css'))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/css'))
});




gulp.task('concat-wds-css', function(){
    return gulp.src(
        [
            './library/css/obebs4-bootstrap.css'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('obebs4.wds.bundle.css'))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/css'))
});



gulp.task('concat-plugins-css', function(){
    return gulp.src(
        [
            './node_modules/obebs4/obebs4/prismjs/css/prism.css',
            './node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            './node_modules/obebs4/obebs4/core/css/obebs4-library.css'
        ]
    )
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('obebs4.plugins.bundle.css'))
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./library/css'))
});


gulp.task('copy-prism-css', function () {
    return gulp.src('./node_modules/obebs4/obebs4/prismjs/css/prism.css')
    .pipe(gulp.dest('./library/css'));
});


gulp.task('copy-datatables-css', function () {
    return gulp.src('./node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css')
    .pipe(gulp.dest('./library/css'));
});



gulp.task('clean-up', function () {
    return del([
        './library/css/obebs4-bootstrap.css'
    ]);
});



gulp.task('obebs4', function() {
    runSequence(
        'ingest-obebs4-settings',
        'compile-sass',
        'move-images',
        'move-favicon-files',
        'compile-nunjucks',
        'concat-js',
        'concat-plugins-js',
        'concat-production-js',
        'concat-wds-js',
        'copy-prism-js',
        'copy-datatables-js',
        'copy-tinycolor-js',
        'concat-css',
        'concat-production-css',
        'concat-plugins-css',
        'concat-wds-css',
        'copy-prism-css',
        'copy-datatables-css',
        'clean-up'
    );
});