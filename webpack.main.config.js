const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/html'), // 绝对路径：项目中的源目录
          to: path.resolve(__dirname, '.webpack/main/html') // 绝对路径：打包后的目标目录
        },
        {
          from: path.resolve(__dirname, 'src/assets/icons'), 
          to: path.resolve(__dirname, '.webpack/main/icons')
        },
      ]
    })
  ]
};
