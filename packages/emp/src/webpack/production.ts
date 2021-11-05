import TerserPlugin from 'terser-webpack-plugin'
import gls from 'src/helper/globalVars'
import wpChain from 'src/helper/wpChain'
import {Configuration} from 'webpack'
export const wpProduction = () => {
  const config: Configuration = {
    // devtool: 'source-map',
    devtool: false,
    // devServer,
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  }
  wpChain.merge(config)
  //
  if (gls.config.build.minify === true) {
    wpChain.optimization.minimizer('TerserPlugin').use(TerserPlugin, [
      {
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          compress: false,
        },
      },
    ] as any)
  }
}
