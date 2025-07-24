const { src, dest, series, task, watch } = require("gulp");
const ejs = require('gulp-ejs');
const plumber = require('gulp-plumber'); 
const rename = require('gulp-rename');
const { Path } = require('./_path.js');

module.exports = (env) => {
    const isProd = env === 'production';
    const destDir = isProd ? Path.public : Path.dest;

    function ejsCompile() {
        return src(
            [
                Path.src+'ejs/**/*.ejs',
                '!'+Path.src+'ejs/**/_*.ejs'
            ]
        )
        .pipe(plumber())
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe(dest(destDir));
    };
    
    return {
        ejsCompile
    };
    
}
