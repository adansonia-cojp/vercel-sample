const { src, dest, series, task, watch } = require("gulp");
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const sassGlob = require('gulp-sass-glob-use-forward');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const { Path } = require('./_path.js');

sass.compiler = require('sass');

module.exports = (env) => {
    const isProd = env === 'production';
    const destDir = isProd ? Path.public + 'assets/css/' : Path.dest + 'assets/css/';
    function SassCompile() {
        const plugin = [
            autoprefixer()
        ];
        return src(Path.src + 'scss/**/*.scss')
            .pipe(sassGlob())
            .pipe(plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            }))
            .pipe(isProd ? plumber() : sourcemaps.init()) // 開発環境のみ sourcemaps を初期化
            .pipe(
                sass({
                    outputStyle: 'compressed' // Only the "expanded" and "compressed" values of outputStyle are supported.
                }).on('error', sass.logError)
            )
            .pipe(postcss(plugin))
            .pipe(isProd ? plumber() : sourcemaps.write('./')) // 開発環境のみ sourcemaps を書き出し
            .pipe(dest(destDir));
    }

    // Watch タスク
    function watchTask() {
        watch(Path.src + 'scss/**/*.scss', SassCompile);
    }

    return {
        sass: SassCompile,
        watch: watchTask
    };
}
