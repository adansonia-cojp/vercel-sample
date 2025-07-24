const { src, dest } = require("gulp");
const webpack = require('webpack-stream');
const webpackConfig = require('../webpack.config.js');
const { Path } = require('./_path.js');

module.exports = (env) => {
    const isProd = env === 'production';
    const destDir = isProd ? Path.public + 'assets/js/' : Path.dest + 'assets/js/';
    const bundleJsWithWebpack = () => {
        return src(Path.src + 'scripts/index.js') // エントリーポイント
          .pipe(webpack(webpackConfig(env)))      // webpack.config.js を使ってバンドル
          .pipe(dest(destDir));  // 出力先
    }
    return {
        bundleJsWithWebpack
    };
}
