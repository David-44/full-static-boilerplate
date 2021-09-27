
const {src, dest, watch, parallel, series} = require("gulp");
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('node-sass'));

const prodPath = 'dist/public';






/************************** SENDING FOR PRODUCTION ****************************/

/* All functions used to modify and copy files from dev to production environment */



// Cleaning the public production folder, needs to be done before copying anything
function cleanPublic(cb){
  del.sync(prodPath);
  cb();
}



// Copying media assets
function copyAssets(cb) {
  src('assets/**/*')
    .pipe(dest(prodPath + '/assets'));
  cb();
}



// Minifying HTML and copying files to the /html folder
function minifyHTML(cb) {
  src('html/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest(prodPath + '/html'));
  cb();
}



// Minifying CSS
function minifyCSS(cb){
  src('./*.css')
    .pipe(cleanCSS())
    .pipe(dest(prodPath));
  cb();
}



// Minifying JS
function minifyJS(cb){
  src('./scripts.js', {allowEmpty: true})
    .pipe(uglify({}))
    .pipe(dest(prodPath));
  cb();
}





/*************************** COMPILING DEV FILES ******************************/

/* Functions used to compile from templates static files in the dv environment */

// Building HTML files from EJS
function generateHTML(cb) {
  src('templates/*.ejs')
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('public/'));
  cb();
}



// Building EJS templates
// Optional, only if the website is not static
function generateTemplate(cb) {
  src('templates/*.ejs')
    .pipe(ejs({}, {rmWhitespace: true}))
    .pipe(dest('views/'));
  cb();
}



// Building EJS templates for a specific file
// Optional again
function generateSingle(cb) {
  src('templates/NAME-FILE.ejs')
    .pipe(ejs({}, {rmWhitespace: true}))
    .pipe(dest('views/'));
  cb();
}



// Building CSS from sass
function generateCSS(cb) {
  src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('public/'));
  cb();
}





/********************** WATCH FOR CHANGE ON DEV FILES *************************/

// Basic function for static site made out of a template
// Watch for both scss and html
function watchDev(cb) {
  watch('templates/**/*', generateHTML);
  watch('scss/**/*', generateCSS);
}



// Watches for change on a specific file
function watchFile(cb) {
  watch('templates/NAME-FILE.ejs', generateSingle);
}



// Watches for change on Sass files only
function watchSass(cb) {
  watch('scss/**/*', generateCSS);
}





/******************************************************************/




// Watching for change
function watchFiles(cb) {
  watch('assets/**/*', copyAssets);
  watch('./**.html', minifyHTML);
  watch('./**.css', minifyCSS);
  watch('./scripts.js', minifyJS);
}



// Watch for change on any public file and exports all to dist
exports.watch = watchFiles;

// Replacing the production files
exports.deploy = series(cleanPublic, copyAssets, minifyHTML, minifyCSS, minifyJS);

// Cleaning the production folder
exports.clean = cleanPublic;
