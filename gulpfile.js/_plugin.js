const { src, dest, series, task, watch } = require("gulp");

module.exports = (PathSrc, PathDist) => {

    function copyPlugins() {
        return src(PathSrc)
            .pipe(dest(PathDist));
    };
    
    return {
        copyPlugins
    };
    
}
