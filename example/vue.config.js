module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.22:9003',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
