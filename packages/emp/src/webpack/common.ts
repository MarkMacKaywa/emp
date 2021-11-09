import path from 'path'
import store from 'src/helper/store'
import wpChain from 'src/helper/wpChain'
import {Configuration} from 'webpack'
export const wpCommon = () => {
  const isDev = store.wpo.mode === 'development'
  const isESM = ['es3', 'es5'].indexOf(store.config.build.target) === -1
  const config: Configuration = {
    resolve: store.wpo.resolve,
    entry: store.wpo.entry,
    // externalsType: 'script',
    externals: store.wpo.external,
    experiments: {
      outputModule: isESM,
      topLevelAwait: true,
      // buildHttp: {allowedUris: []},//影响热更
      backCompat: true,
    },
    // externalsType: 'module',
    // target: store.config.build.target,
    output: {
      // module: true,
      // iife: false,
      // scriptType: 'module',
      // module: true,
      // libraryTarget: 'module',
      // library: {
      //   // name: 'index',
      //   // type: 'module',
      //   // type: 'umd',
      // },
      clean: store.config.build.emptyOutDir && !isDev, //替代 clean-webpack-plugin
      ...store.wpo.output,
    },
    stats: store.wpo.stats,
  }
  if (isESM) {
    config.externalsType = 'module'
    // config.externalsType = 'import'
  }
  wpChain.merge(config)
}
