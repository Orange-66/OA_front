const path = require('path')
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/',
  chainWebpack: config => {
		config.resolve.alias
			.set('~', path.join(__dirname,'./node_modules')) 
	}
}
