var path = require('path')
var webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: resolve('dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: 'system.min.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
