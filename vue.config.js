module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://118.89.65.154:8765',
          pathRewrite: {"^/api" : ""}
        }
      }
    }
  },
  lintOnSave: false
}
