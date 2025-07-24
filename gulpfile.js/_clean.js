const del = require('del');

module.exports = (dir) => {
    function cleanDist() {
        return del([dir])
    }
    return cleanDist
}