const {defineConfig} = require('@efox/emp')
const cdn = require('./cdn')
module.exports = defineConfig(({mode}) => {
  return {
    server: {
      port: 8002,
    },
    empShare: {
      name: 'microApp',
      remotes: {
        '@microHost': 'microHost@http://localhost:8001/emp.js',
      },
      exposes: {
        './App': './src/App',
      },
      shareLib: cdn(mode),
      /* shared: {
      react: {requiredVersion: '^17.0.1'},
      'react-dom': {requiredVersion: '^17.0.1'},
    }, */
    },
    html: {title: 'Micro-App'},
  }
})
