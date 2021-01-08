const path = require('path')

function resolve (dir) {
	return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 基本路径-引用文件的路径
    outputDir: 'dist',
    lintOnSave: false, // 是否使用eslint
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
        config.resolve
			      .alias
			      .merge({
				      '@views' : resolve('views'),
				      '@component' : resolve('components')
                  }).end()
                  
        // 修复HMR
        config.resolve.symlinks(true)
        config.entry('main').add('babel-polyfill') // main是入口js文件
    },
    configureWebpack: {
        performance: {
            hints: false
        },
        plugins : []
    },
    devServer: {
        port: 8080,
        // https: false,
        // host: '0.0.0.0',
        open: true,
        proxy: {
            '/api': {
                target: 'http://api.meb.im',
                ws: true,           // 如果要代理 websockets，配置这个参数
                secure: false,      // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }, 
    }
}