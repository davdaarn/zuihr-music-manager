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
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        files: [
          "**/*"
        ],
        extraFiles: [{
          "from": "src/main/*",
          "to": "src/main/*",
          "filter": ["**/*"]
        }]
      }
    }
  }
}
