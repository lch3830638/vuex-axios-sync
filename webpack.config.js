const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = [
  {
    mode: 'none',
    entry: {
      'index': './src/index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].mjs',
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserWebpackPlugin({
        test: /\.min\.js$/
      })]
    }
  },
  {
    mode: 'none',
    entry: {
      'index': './src/index.js',
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].cjs',
      library: {
        type: 'commonjs',
      },
    },
    experiments: {
      outputModule: true,
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserWebpackPlugin({
        test: /\.min\.js$/
      })]
    }
  }
]