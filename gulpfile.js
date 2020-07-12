/**
 *  OBE:WDS 
 */


// base script directories
const dir = new function() {
    this.root = './';
    this.node = this.root + 'node_modules/';
    this.jucks = this.root + 'nunjucks/';
    this.lib = this.root + 'library/';
    this.obe = this.root + 'obebs4/';
    this.core = this.obe + 'core/';
    this.data = this.obe + 'data/';
    this.scss = this.obe + 'scss/';
};




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
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const htmlbeautify = require('gulp-html-beautify');
const packagejson = JSON.parse(fs.readFileSync(dir.root + 'package.json', 'utf8'));
const obebs4version = packagejson.version;
const fontawesomeversion = packagejson.faversion;




// Utility Data Function
function get_obebs4_settings(filepath) {
    // parse the data
    let theData = JSON.parse(fs.readFileSync(filepath));
    // array of all obebs4_settings.json keys that have color & modifier UI in _settings_generator.njk
    let keys = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'body-bg', 'body-color', 'link-color', 'mark-bg', 'input-bg', 'input-color', 'input-placeholder-color', 'input-disabled-bg', 'input-group-addon-bg', 'input-group-addon-color', 'component-active-bg', 'component-active-color', 'dropdown-header-color', 'dropdown-link-color', 'dropdown-link-hover-bg', 'dropdown-link-disabled-color', 'yiq-text-dark', 'yiq-text-light', 'border-color', 'headings-color', 'text-muted', 'blockquote-small-color', 'table-head-bg', 'table-head-color', 'table-dark-color', 'table-dark-bg', 'btn-link-disabled-color', 'input-border-color', 'custom-control-indicator-border-color', 'custom-control-label-disabled-color', 'custom-select-disabled-color', 'custom-range-track-bg', 'custom-range-thumb-disabled-bg'];
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
let settingsFilePath = dir.data + 'obebs4_settings.json';

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
    '2560x1600.jpg',
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




function ingest_obebs4_settings() {

    return gulp.src(
        settingsFilePath
    ).pipe(
        jsonToSass(
            {
                jsonPath: settingsFilePath,
                scssPath: dir.scss + 'settings/_obebs4_settings.scss'
            }
        )
    );

}
exports.ingest_obebs4_settings = ingest_obebs4_settings;




function compile_sass() {

    return gulp.src(
        [
            dir.scss + 'obebs4-bootstrap-dev.scss'
        ]
    ).pipe(
        sass({
            outputStyle: 'compressed'
        })
    )
    //.pipe(sourcemaps.init())
    .pipe(
        postcss([ autoprefixer('last 2 version', 'Chrome >= 45', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 10', 'iOS >= 9', 'Safari >= 9', 'Android >= 4.4', 'Opera >= 30') ])
    )
    //.pipe(sourcemaps.write('.'))
    .pipe(
        gulp.dest(dir.lib + 'css')
    );

}
exports.compile_sass = compile_sass;




function move_images() {

    return gulp.src(
        pathArrPrepend(libraryImages, dir.core + 'images/')
    ).pipe(
        gulp.dest(dir.lib + 'images')
    );

}
exports.move_images = move_images;




function move_favicons() {

    return gulp.src(
        pathArrPrepend(libraryFavicons, dir.core + 'images/favicons/')
    ).pipe(
        gulp.dest(dir.lib + 'images/favicons')
    );

}
exports.move_favicons = move_favicons;




function compile_nunjucks() {

    let htmlBeautifyOptions = {
        "indent_with_tabs": false,
        "max_preserve_newlines": 1,
        "jslint_happy": false,
        "break_chained_methods": false
    };

    // Gets .html and .nunjucks files in pages
    return gulp.src(dir.jucks + 'pages/**/*.+(html|nunjucks|njk)')
    // Get OBE settings json data
    .pipe(
        data( get_obebs4_settings(settingsFilePath) )
    )
    // Get global strings json data (for DRY nunjucks vars)
    .pipe(
        data( get_global_strings_json(dir.jucks + 'data/global_strings.json') )
    )
    // Renders template with nunjucks
    .pipe(
        nunjucksRender(
            {
                path: [dir.jucks + 'templates']
            }
        )
    )
    // beautify the rendered file
    .pipe(
        htmlbeautify(htmlBeautifyOptions)
    )
    // output files in app folder
    .pipe(
        gulp.dest(dir.lib)
    );

};
exports.compile_nunjucks = compile_nunjucks;




function concat_library_js() {

    return gulp.src(
        [
            dir.node + 'jquery/dist/jquery.min.js',
            dir.node + 'bootstrap/dist/js/bootstrap.bundle.min.js',
            dir.core + 'js/obebs4-popovers.js',
            dir.core + 'js/obebs4-toasts.js',
            dir.core + 'js/obebs4-tooltips.js',
            dir.core + 'js/obebs4-fa5-animated-checkboxes.js',
            dir.obe + 'prismjs/js/prism.min.js',
            dir.node + 'tinycolor2/dist/tinycolor-min.js',
            dir.node + 'datatables.net/js/jquery.dataTables.min.js',
            dir.node + 'datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            dir.core + 'js/obebs4-library.js',
            dir.core + 'js/obebs4-dataTables.js',
            dir.core + 'js/obebs4-calendar-datepicker-plugin.js',
            dir.core + 'js/obe-text-toggle-vanilla-mini-plugin.js',
            dir.core + 'js/obebs4-dropdown-select-plugin.js',
            dir.core + 'js/obe-input-grp-btn-toggle-plugins.js',
            dir.core + 'js/obe-increment-counter-plugin.js'
        ]
    )
    .pipe(
        sourcemaps.init({
            loadMaps: true
        })
    )
    .pipe(
        concat('obebs4.library.bundle.js')
    )
    .pipe(
        terser(
            {
                output: {
                    comments: true // Options: some, all, true, or regex
                },
                keep_fnames: true,
                keep_classnames: true,
                mangle: false
            }
        )
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'js')
    );

};
exports.concat_library_js = concat_library_js;




function concat_production_js() {

    return gulp.src(
        [
            dir.node + 'jquery/dist/jquery.min.js',
            dir.node + 'bootstrap/dist/js/bootstrap.bundle.min.js',
            dir.core + 'js/obebs4-popovers.js',
            dir.core + 'js/obebs4-toasts.js',
            dir.core + 'js/obebs4-tooltips.js',
            dir.core + 'js/obebs4-fa5-animated-checkboxes.js',
            dir.core + 'js/obebs4-calendar-datepicker-plugin.js',
            dir.core + 'js/obe-text-toggle-vanilla-mini-plugin.js',
            dir.core + 'js/obebs4-dropdown-select-plugin.js',
            dir.core + 'js/obe-input-grp-btn-toggle-plugins.js',
            dir.core + 'js/obe-increment-counter-plugin.js'
        ]
    )
    .pipe(
        sourcemaps.init({loadMaps: true})
    )
    .pipe(
        concat('./obebs4.production.bundle.js')
    )
    .pipe(
        terser({
            output: {
                comments: true // Options: some, all, true, or regex
            },
            keep_fnames: true,
            keep_classnames: true,
            mangle: false
        })
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'js')
    );

}
exports.concat_production_js = concat_production_js;




function concat_wds_js() {

    return gulp.src(
        [
            dir.node + 'bootstrap/dist/js/bootstrap.bundle.min.js',
            dir.core + 'js/obebs4-popovers.js',
            dir.core + 'js/obebs4-toasts.js',
            dir.core + 'js/obebs4-tooltips.js',
            dir.core + 'js/obebs4-fa5-animated-checkboxes.js',
            dir.core + 'js/obebs4-calendar-datepicker-plugin.js',
            dir.core + 'js/obe-text-toggle-vanilla-mini-plugin.js',
            dir.core + 'js/obebs4-dropdown-select-plugin.js',
            dir.core + 'js/obe-input-grp-btn-toggle-plugins.js',
            dir.core + 'js/obe-increment-counter-plugin.js'
        ]
    )
    .pipe(
        sourcemaps.init({loadMaps: true})
    )
    .pipe(
        concat('./obebs4.wds.bundle.js')
    )
    .pipe(
        terser({
            output: {
                comments: true // Options: some, all, true, or regex
            },
            keep_fnames: true,
            keep_classnames: true,
            mangle: false
        })
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'js')
    );

}
exports.concat_wds_js = concat_wds_js;




function concat_plugins_js() {

    return gulp.src(
        [
            dir.obe + 'prismjs/js/prism.min.js',
            dir.node + 'tinycolor2/dist/tinycolor-min.js',
            dir.node + 'datatables.net/js/jquery.dataTables.min.js',
            dir.node + 'datatables.net-bs4/js/dataTables.bootstrap4.min.js',
            dir.core + 'js/obebs4-dataTables.js'
        ]
    )
    .pipe(
        sourcemaps.init({loadMaps: true})
    )
    .pipe(
        concat('obebs4.plugins.bundle.js')
    )
    .pipe(
        terser({
            output: {
                comments: true // Options: some, all, true, or regex
            },
            keep_fnames: true,
            keep_classnames: true,
            mangle: false
        })
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'js')
    );

}
exports.concat_plugins_js = concat_plugins_js;




function copy_prism_js() {

    return gulp.src(
        dir.obe + 'prismjs/js/prism.min.js'
    )
    .pipe(
        gulp.dest(dir.lib + 'js')
    );

}
exports.copy_prism_js = copy_prism_js;




function copy_datatables_js() {

    return gulp.src(
        [
            dir.node + 'datatables.net/js/jquery.dataTables.min.js',
            dir.node + 'datatables.net-bs4/js/dataTables.bootstrap4.min.js'
        ]
    )
    .pipe(
        sourcemaps.init({loadMaps: true})
    )
    .pipe(
        concat('bootstrap4.datatables.min.js')
    )
    .pipe(
        terser({
            output: {
                comments: true // Options: some, all, true, or regex
            },
            keep_fnames: true,
            keep_classnames: true,
            mangle: false
        })
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'js')
    );

}
exports.copy_datatables_js = copy_datatables_js;




function copy_tinycolor_js() {

    return gulp.src(
        dir.node + 'tinycolor2/dist/tinycolor-min.js'
    )
    .pipe(
        gulp.dest(dir.lib + 'js')
    );

}
exports.copy_tinycolor_js = copy_tinycolor_js;




function concat_css() {

    return gulp.src(
        [
            dir.lib + 'css/obebs4-bootstrap-dev.css',
            dir.obe + 'prismjs/css/prism.css',
            dir.node + 'datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            dir.core + 'css/obebs4-library.css'
        ]
    )
    .pipe(
        sourcemaps.init({loadMaps: true})
    )
    .pipe(
        concat('obebs4.library.bundle.css')
    )
    .pipe(
        cleanCSS({compatibility: '*'})
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'css')
    );

}
exports.concat_css = concat_css;




function concat_production_css() {

    return gulp.src(
        [
            dir.lib + 'css/obebs4-bootstrap-dev.css'
        ]
    )
    .pipe(
        sourcemaps.init({loadMaps: true})
    )
    .pipe(
        concat('obebs4.production.bundle.css')
    )
    .pipe(
        cleanCSS({compatibility: '*'})
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'css')
    );

}
exports.concat_production_css = concat_production_css;




function concat_wds_css() {

    return gulp.src(
        [
            dir.lib + 'css/obebs4-bootstrap-dev.css'
        ]
    )
    .pipe(
        sourcemaps.init({loadMaps: true})
    )
    .pipe(
        concat('obebs4.wds.bundle.css')
    )
    .pipe(
        cleanCSS({compatibility: '*'})
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'css')
    );

}
exports.concat_wds_css = concat_wds_css;




function concat_plugins_css() {

    return gulp.src(
        [
            dir.obe + 'prismjs/css/prism.css',
            dir.node + 'datatables.net-bs4/css/dataTables.bootstrap4.min.css',
            dir.core + 'css/obebs4-library.css'
        ]
    )
    .pipe(
        sourcemaps.init({loadMaps: true})
    )
    .pipe(
        concat('obebs4.plugins.bundle.css')
    )
    .pipe(
        cleanCSS({compatibility: '*'})
    )
    .pipe(
        sourcemaps.write('.')
    )
    .pipe(
        gulp.dest(dir.lib + 'css')
    );

}
exports.concat_plugins_css = concat_plugins_css;




function copy_prism_css() {

    return gulp.src(
        dir.obe + 'prismjs/css/prism.css'
    )
    .pipe(
        gulp.dest(dir.lib + 'css')
    );

}
exports.copy_prism_css = copy_prism_css;




function copy_datatables_css() {

    return gulp.src(
        dir.node + 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
    )
    .pipe(
        gulp.dest(dir.lib + 'css')
    );

}
exports.copy_datatables_css = copy_datatables_css;




function clean_up() {

    return del([
        dir.lib + 'css/obebs4-bootstrap-dev.css'
    ]);

}
exports.clean_up = clean_up;




exports.obebs4 = gulp.series(
    exports.ingest_obebs4_settings,
    exports.compile_sass,
    exports.move_images,
    exports.move_favicons,
    exports.compile_nunjucks,
    exports.concat_library_js,
    exports.concat_production_js,
    exports.concat_wds_js,
    exports.concat_plugins_js,
    exports.copy_prism_js,
    exports.copy_datatables_js,
    exports.copy_tinycolor_js,
    exports.concat_css,
    exports.concat_production_css,
    exports.concat_wds_css,
    exports.concat_plugins_css,
    exports.copy_prism_css,
    exports.copy_datatables_css,
    exports.clean_up
);