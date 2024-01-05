const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    'vuex-axios-sync': './src/index.js',
    'vuex-axios-sync.min': './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'syncAxiosVuex',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin({
      test: /\.min\.js$/
    })]
  }
}