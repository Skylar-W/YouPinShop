module.exports={
  productionSourceMap:false,
  //关闭eslint代码校验
  lintOnSave: false,
  //配置代理,解决跨域问题
  devServer: {
    proxy: {
      "/api": {
        target: 'http://39.98.123.211'
      }
    },
    port: 9200
  }
}