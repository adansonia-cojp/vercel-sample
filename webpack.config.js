const path = require('path');

module.exports = (env = 'development') => {
  const isProd = env === 'production';
  console.log(`Webpack Building for ${isProd ? 'production' : 'development'}...`);
  
  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/scripts/index.js',
    output: {
      filename: 'bundle.js',
      // path: path.resolve(__dirname, 'dist/assets/js'), // 出力先はgulpfile>js-bundleで指定
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // babel-loader を使用
            options: {
              presets: ['@babel/preset-env'], // Babel のプリセットを指定
            },
          },
        },
      ],
    },
    devtool: isProd ? false : 'source-map',
  }
};
