module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    target: 'electron-renderer',
    devtool: 'source-map',
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackRendererProcess: (config) => {
        // config.resolve.alias.set('@', path.resolve(__dirname + '/src/renderer'));
        // Pug Loader
        config.module
          .rule('pug')
          .test(/\.pug$/)
          .use('pug-plain-loader')
          .loader('pug-plain-loader')
          .end();
      },
      mainProcessFile: 'src/main/index.js',
      rendererProcessFile: 'src/renderer/main.js',
      mainProcessWatch: ['src/main/app/*', 'src/main/shared/*', 'src/main/utils/*', 'src/main/app/handlers/*'],
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        files: [
          '**/*',
        ],
        // extraFiles: [{
        //   "from": "src/*",
        //   "to": "src",
        //   "filter": ["**/*"]
        // }]
      }
    }
  }
}
