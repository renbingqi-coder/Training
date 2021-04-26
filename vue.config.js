module.exports = {
    // build: {
    //     // env: require('./prod.env'),
    //     index: path.resolve(__dirname,'../dist/index.html'),
    //     assetsRoot: path.resolve(__dirname,'../dist'),
    //     assetsSubDirectory: 'static',
    //     assetsPublicPath: './',
    //     productionSourceMap: true,
    //     devtool: '#source-map'
    // },
    devServer: {
        //服务器代理
        proxy: {  
          "/myweb": {
            target: "http://localhost:8081",
            changeOrigin: true  //更改请求头中的host和origin
          },
        },
      },
}