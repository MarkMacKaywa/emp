import store from 'src/helper/store'
import wpChain from 'src/helper/wpChain'

export const wpModule = () => {
  //
  const config = {
    module: {
      // mini-css-extract-plugin 编译不过！
      /* generator: {
        asset: {
          publicPath: store.config.base,
        },
      }, */
      rule: {
        // 解决 mjs 加载失败问题
        mjs: {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        //
        scripts: {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /(node_modules|bower_components)/, //不能加 exclude 否则会专程 arrow
          use: {
            ...store.wpo.modules.swcLoader(),
          },
        },
      },
    },
  }
  wpChain.merge(config)
}
