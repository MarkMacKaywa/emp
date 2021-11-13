const {defineConfig} = require('@efox/emp')

module.exports = defineConfig({
  server: {
    port: 8001,
  },
  moduleFederation: {
    name: 'microHost',
    // esm 共享需要设置 window
    // library: {name: 'microHost', type: 'window'},
    exposes: {
      './App': './src/App',
    },
    /* shared: {
      react: {requiredVersion: '^17.0.1'},
      'react-dom': {requiredVersion: '^17.0.1'},
    }, */
  },
  webpackChain(chain, globalConfig) {
    chain.plugin('html').tap(args => {
      args[0] = {
        ...args[0],
        ...{
          title: 'Micro-Host',
        },
      }
      return args
    })
  },
})
