const { src, dest, series, task, watch } = require("gulp");
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const { Path } = require('./_path.js');

module.exports = (env) => {
    const isProd = env === 'production';
    const destDir = isProd ? Path.public + 'assets/images/' : Path.dest + 'assets/images/';
    function imageMinify() {
        return src(Path.src + 'images/**/*.{jpg,jpeg,png,gif,svg}')
            .pipe(changed(Path.dest + 'assets/images/'))
            .pipe(imagemin(
                [
                    pngquant({
                        quality: [.8, .9],
                        speed: 1
                    }),
                    mozjpeg({ quality: 90 }),
                    imagemin.svgo(),
                    imagemin.gifsicle()
                ]
            ))
            .pipe(imagemin())
            .pipe(dest(destDir));
    }

    return {
        imageMinify
    };
    
}
