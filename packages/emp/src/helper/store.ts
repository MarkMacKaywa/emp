import fs from 'fs-extra'
import path from 'path'
import {cliOptionsType, modeType, wpPathsType} from 'src/types'
import {EMPConfigExport, EMPConfig, initConfig, ResovleConfig} from 'src/config'
import logger from './logger'
import WpOptions from 'src/webpack/options'
import ConfigPlugins from 'src/config/plugins'
class GlobalStore {
  /**
   * EMP Version
   * @default package version
   */
  public pkgVersion = '0.0.0'
  /**
   * 项目根目录绝对路径
   * @default process.cwd()
   */
  public root = process.cwd()
  /**
   * emp 内部根路径
   * @default path.resolve(__dirname, '../../')
   */
  public empRoot = path.resolve(__dirname, '../../')
  /**
   * 项目配置
   */
  public config: ResovleConfig = initConfig()
  /**
   * 获取项目 根目录绝对路径
   * @param relativePath
   * @returns
   */
  public resolve = (relativePath: string) => path.resolve(this.root, relativePath)
  /**
   * 获取项目 emp内部根目录绝对路径
   * @param relativePath
   * @returns
   */
  public empResolve = (relativePath: string) => path.resolve(this.empRoot, relativePath)

  /**
   * 源码地址
   */
  public appSrc = ''
  /**
   * 源码生成目录
   */
  public outDir = ''
  /**
   * 静态文件目录
   */
  public publicDir = ''
  /**
   * 命令行变量
   */
  public cliOptions: cliOptionsType = {}
  /**
   * webpack options 全局变量 所有webpack配置收归到这里
   */
  public wpo = new WpOptions()
  public configPlugins = new ConfigPlugins()

  constructor() {}
  /**
   * setConfig 设置全局配置
   * @param mode webpack mode
   * @param cliOptions command options
   * @param pkg package.json data
   */
  async setConfig(mode: modeType, cliOptions: cliOptionsType, pkg: any) {
    this.pkgVersion = pkg.version
    const fp = this.resolve('emp-config.js')
    if (fs.existsSync(fp)) {
      const configExport: EMPConfigExport = require(fp)
      if (typeof configExport === 'function') {
        const conf = await configExport({mode})
        this.config = initConfig(conf, mode)
      } else if (typeof configExport === 'object') {
        const conf: any = configExport
        this.config = initConfig(conf, mode)
      }
    }
    this.appSrc = this.resolve(this.config.appSrc)
    this.outDir = this.resolve(this.config.build.outDir)
    this.publicDir = this.resolve(this.config.publicDir)
    // command option 处理 优先级优于 emp-config,把 config覆盖
    this.cliOptions = cliOptions
    if (this.cliOptions.wplogger) logger.info('=== emp config ===', this.config)
    if (this.cliOptions.open) this.config.server.open = true
    if (this.cliOptions.hot) this.config.server.hot = true
    // 初始化所有 webpack options
    await this.wpo.setup(mode)
    // 初始化配置里的 Plugins
    await this.configPlugins.setup()
  }
}
export default new GlobalStore()
