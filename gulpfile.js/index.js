const gulp = require("gulp");
const minimist = require('minimist');
const options = minimist(process.argv.slice(2));
const env = options.env || 'development';

const { Path } = require('./_path.js');
const { ejsCompile } = require('./_ejs.js')(env);
const Sass = require('./_sass.js')(env);
const { imageMinify } = require('./_imagemin.js')(env);
const { bundleJsWithWebpack } = require('./_js-bundle.js')(env);
const { localServer, browserReload } = require('./_server');
const clean = require('./_clean');

gulp.task('ejs', ejsCompile);
gulp.task('sass', Sass.sass);
gulp.task('sass-watch', Sass.watch);
gulp.task('imagemin', imageMinify);
gulp.task('js', bundleJsWithWebpack);
gulp.task('server', localServer);
gulp.task('browser-reload', browserReload);
gulp.task('clean', clean(Path.dest + '**', '!.htaccess'));
gulp.task('clean-prod', clean(Path.public + '**', '!.htaccess'));

// ファイル更新を監視
gulp.task('watch', function(done) {
    gulp.watch( Path.src + 'images/**/*.{jpg,jpeg,png,gif,svg}', gulp.series('imagemin') );
    gulp.watch( Path.src + 'scripts/**/*.js', gulp.series('js') );
    gulp.watch( Path.src + 'scss/**/*.scss', gulp.series('sass') );
    gulp.watch( Path.src + 'ejs/**/*.ejs', gulp.series('ejs', 'browser-reload'));
    done();
});

// 作業開始
gulp.task('dev', gulp.series(
    'server', 
    'watch', 
    function(done){
        console.log('##################');
        console.log('dev start !');
        console.log('##################');
        done();
    }
));

// ビルド
gulp.task('build', gulp.series(
    'ejs',
    'js',
    'sass',
    'imagemin',
    function(done){
console.log(`#######################
${env} build done !
#######################`);
        done();
    }
));

// default
gulp.task('default', gulp.series(
    'build',
    'dev', 
    function(done){
        console.log('####################');
        console.log('build & dev start !!');
        console.log('####################');
        done();
    }
));