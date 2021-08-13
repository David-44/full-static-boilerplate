
const {src, dest, watch, parallel, series} = require("gulp");
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');

const prodPath = 'dist/public';



// Copying images
function copyAssets(cb) {
  src('assets/**/*')
    .pipe(dest(prodPath + '/assets'));
  cb();
}



// Cleaning the public production folder
function cleanPublic(cb){
  del.sync(prodPath);
  cb();
}



// Minifying HTML
function minifyHTML(cb) {
  src('./*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest(prodPath));
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



// Watching for change
function watchFiles(cb) {
  watch('assets/**/*', copyAssets);
  watch('./**.html', minifyHTML);
  watch('./**.css', minifyCSS);
  watch('./scripts.js', minifyJS);
}



// Watch for change
exports.watch = watchFiles;

// Replacing the production files
exports.deploy = series(cleanPublic, copyAssets, minifyHTML, minifyCSS, minifyJS);

// Cleaning the production folder
exports.clean = cleanPublic;
