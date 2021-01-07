module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    target: 'electron-renderer'
  },
  pluginOptions: {
    electronBuilder: {
      // chainWebpackRendererProcess: (config) => {
      //   config.resolve.alias.set('@', path.resolve(__dirname + '/src/renderer'));
      // },
      mainProcessFile: 'src/main/index.js',
      rendererProcessFile: 'src/renderer/main.js',
    }
  }
}
