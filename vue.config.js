module.exports = {
  publicPath: '/yujian',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz',
        changeOrigin: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}
