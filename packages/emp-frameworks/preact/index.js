const path = require('path')

module.exports = fn => ec => {
  const { config } = ec
  const srcPath = path.resolve('./src')
  config.entry('index').clear().add(path.join(srcPath, 'index.js'))
  config.module
    .rule('scripts')
    .use('babel')
    .tap(args => {
      args = {
        ...args,
        plugins: [
          [
            require('@babel/plugin-transform-react-jsx').default,
            {
              pragma: "h",
              pragmaFrag: "Fragment"
            }
          ],
          [
            require.resolve('babel-plugin-jsx-pragmatic'),
            {
              module: "preact",
              import: "h",
              export: "h"
            }
          ]
        ]
      }
      console.log(args)
      return args
    })
  return fn(ec)
}
