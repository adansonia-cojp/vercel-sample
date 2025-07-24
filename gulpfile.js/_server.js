const browserSync = require('browser-sync').create();
const connectSSI  = require('connect-ssi');
const { Path } = require('./_path.js');

function localServer(done){
    browserSync.init({
        server: {
            baseDir: Path.dest,
            middleware: [
                connectSSI({
                baseDir: Path.dest,
                ext: '.html'
                })
            ]
        }
    });
    done();
}

// browserSync リロード
function browserReload(done) {
    browserSync.reload()
    done()
}

module.exports = {
    localServer,
    browserReload
}
