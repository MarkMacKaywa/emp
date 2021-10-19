const {shareByVersion} = require('./unit')
module.exports = {
  name: 'demo1',
  filename: 'emp.js',
  remotes: {
    '@emp/demo2': 'demo2@http://localhost:8002/emp.js',
  },
  exposes: {
    './configs/index': './src/configs/index',
    './components/Demo': './src/components/Demo',
    './components/Hello': './src/components/Hello',
  },
  shared: {
    react: {requiredVersion: '^17.0.1'},
    'react-dom': {requiredVersion: '^17.0.1'},
  },
  // shared: Object.assign({}, shareByVersion('react'), shareByVersion('react-dom')),
}
