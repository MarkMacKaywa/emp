const path = require('path')
module.exports = fn => ec => {
  const {config} = ec
  // config.module.delete('scripts')
  // vue3
  config.module
    .rule('vue_v3')
    .test(/\.vue$/)
    .use('vue-loader')
    .loader(require.resolve('vue-loader'))
  // ts
  config.module
    .rule('scripts')
    .test(/\.ts$/)
    .use('ts-loader')
    .loader('ts-loader')
    .options({appendTsSuffixTo: [/\.vue$/]})
  //
  config.resolve.alias.set('vue', '@vue/runtime-dom')
  config.plugin('vue_v3').use(require('vue-loader').VueLoaderPlugin, [])
  // config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js').clear()
  return fn(ec)
}
