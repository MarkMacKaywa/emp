import {webpack} from 'webpack'
import {getConfig} from 'src/helper/wpChain'
import store from 'src/helper/store'
class Build {
  constructor() {}
  async setup() {
    const config = getConfig()
    webpack(config, (err: any, stats: any) => {
      if (err) {
        console.error(err.stack || err)
        if (err.details) {
          console.error(err.details)
        }
        return
      }

      const info = stats.toJson()

      if (stats.hasErrors()) {
        console.error(info.errors)
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings)
      }

      console.log(stats.toString(store.wpo.stats))
    })
  }
}
export default new Build()
